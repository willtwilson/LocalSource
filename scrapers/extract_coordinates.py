#!/usr/bin/env python3

import asyncio
import json
import os
import re
import sys
from playwright.async_api import async_playwright

async def extract_coordinates():
    """Extract vendor coordinates from hedgeveg.je map view."""
    print("Starting coordinate extraction from hedgeveg.je map...")
    
    # Create screenshots directory if it doesn't exist
    screenshots_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Navigate to hedgeveg.je
        print("Navigating to hedgeveg.je...")
        await page.goto("https://hedgeveg.je/")
        await page.screenshot(path=os.path.join(screenshots_dir, "01-initial-page.png"))
        
        # Accept cookies if prompted
        try:
            await page.click("text=Accept", timeout=5000)
            print("Accepted cookies.")
        except Exception as e:
            print(f"No cookie prompt or couldn't accept: {e}")
        
        # Wait for the map to load
        print("Waiting for map to load...")
        try:
            # Wait for map markers to appear
            await page.wait_for_selector(".leaflet-marker-icon", timeout=10000)
            await page.screenshot(path=os.path.join(screenshots_dir, "02-map-loaded.png"))
            print("Map loaded successfully.")
        except Exception as e:
            print(f"Error waiting for map: {e}")
            await browser.close()
            return []
        
        # Extract marker coordinates from the page
        print("Extracting marker coordinates...")
        markers_data = await page.evaluate("""
        () => {
            const markers = [];
            document.querySelectorAll('.leaflet-marker-icon').forEach((marker, index) => {
                // Get the transform style which contains the coordinates
                const style = marker.style.transform;
                // Parse the translate3d(Xpx, Ypx, 0px) format
                const match = style.match(/translate3d\\(([^,]+)px, ([^,]+)px/);
                if (match) {
                    const x = parseFloat(match[1]);
                    const y = parseFloat(match[2]);
                    
                    // Try to get vendor name from marker title or alt attribute
                    let name = marker.getAttribute('title') || marker.getAttribute('alt') || `Vendor ${index + 1}`;
                    
                    markers.push({
                        x,
                        y,
                        name,
                        element_id: marker.id || `marker-${index}`
                    });
                }
            });
            return markers;
        }
        """)
        
        # Now extract the actual map coordinates
        print(f"Found {len(markers_data)} markers on the map.")
        vendor_coordinates = []
        
        # For each marker, click on it and extract data
        for idx, marker in enumerate(markers_data):
            try:
                print(f"Processing marker {idx+1}/{len(markers_data)}...")
                
                # Click on the marker by its coordinates
                await page.evaluate(f"""
                () => {{
                    const markers = document.querySelectorAll('.leaflet-marker-icon');
                    markers.forEach((m) => {{
                        const style = m.style.transform;
                        const match = style.match(/translate3d\\(([^,]+)px, ([^,]+)px/);
                        if (match) {{
                            const x = parseFloat(match[1]);
                            const y = parseFloat(match[2]);
                            if (Math.abs(x - {marker['x']}) < 5 && Math.abs(y - {marker['y']}) < 5) {{
                                m.click();
                            }}
                        }}
                    }});
                }}
                """)
                
                # Wait for popup to appear
                await page.wait_for_selector(".leaflet-popup-content", timeout=5000)
                await page.screenshot(path=os.path.join(screenshots_dir, f"03-marker-{idx+1}-popup.png"))
                
                # Extract vendor info from popup
                popup_content = await page.evaluate("""
                () => {
                    const popup = document.querySelector('.leaflet-popup-content');
                    return popup ? popup.innerText : '';
                }
                """)
                
                # Extract coordinates from map
                map_coords = await page.evaluate("""
                () => {
                    // Try to find coordinates in the map's data structures
                    if (window.map && window.map._targets) {
                        // This is a guess at how Leaflet might store its data
                        // Adjust based on actual structure
                        const targets = Object.values(window.map._targets).filter(t => t._latlng);
                        if (targets.length > 0 && targets[targets.length-1]._latlng) {
                            return targets[targets.length-1]._latlng;
                        }
                    }
                    
                    // Fallback method - read URL params from popup if exists
                    const links = document.querySelectorAll('.leaflet-popup-content a[href*="google.com/maps"]');
                    if (links && links.length > 0) {
                        const href = links[0].href;
                        const match = href.match(/@([0-9.-]+),([0-9.-]+)/);
                        if (match) {
                            return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
                        }
                    }
                    
                    return null;
                }
                """)
                
                vendor_name = popup_content.split('\n')[0] if popup_content else f"Unknown Vendor {idx+1}"
                
                vendor_info = {
                    "name": vendor_name,
                    "popup_content": popup_content,
                }
                
                if map_coords:
                    vendor_info["latitude"] = map_coords.get("lat")
                    vendor_info["longitude"] = map_coords.get("lng")
                    print(f"Found coordinates for {vendor_name}: {map_coords.get('lat')}, {map_coords.get('lng')}")
                else:
                    print(f"No coordinates found for {vendor_name}")
                
                vendor_coordinates.append(vendor_info)
                
                # Close popup to prepare for next marker
                try:
                    await page.click(".leaflet-popup-close-button")
                except:
                    print("Could not close popup, continuing...")
                
                # Small delay between processing markers
                await asyncio.sleep(0.5)
                
            except Exception as e:
                print(f"Error processing marker {idx+1}: {e}")
                await page.screenshot(path=os.path.join(screenshots_dir, f"error-marker-{idx+1}.png"))
        
        # Switch to List View to extract additional information
        print("Switching to List View...")
        try:
            await page.click("text=Open List View")
            await page.wait_for_selector(".vendor-card", timeout=10000)
            await page.screenshot(path=os.path.join(screenshots_dir, "04-list-view.png"))
            
            # Extract vendor cards information to match with our coordinate data
            vendor_cards = await page.evaluate("""
            () => {
                const cards = [];
                document.querySelectorAll('.vendor-card').forEach(card => {
                    const name = card.querySelector('h3')?.innerText || '';
                    const parish = card.querySelector('.parish')?.innerText || '';
                    const produceTypes = Array.from(card.querySelectorAll('.produce-type')).map(el => el.innerText);
                    const description = card.querySelector('p:not(.parish):not(.produce-type)')?.innerText || '';
                    
                    cards.push({
                        name,
                        parish,
                        produceTypes,
                        description
                    });
                });
                return cards;
            }
            """)
            
            print(f"Found {len(vendor_cards)} vendor cards in list view.")
            
            # Match coordinates with vendor cards based on name
            for coord_vendor in vendor_coordinates:
                for card in vendor_cards:
                    # Simple string matching, could be improved
                    if coord_vendor["name"] in card["name"] or card["name"] in coord_vendor["name"]:
                        coord_vendor.update({
                            "parish": card.get("parish", ""),
                            "produceTypes": card.get("produceTypes", []),
                            "description": card.get("description", "")
                        })
                        break
            
        except Exception as e:
            print(f"Error switching to list view: {e}")
            await page.screenshot(path=os.path.join(screenshots_dir, "error-list-view.png"))
        
        await browser.close()
        
        print(f"Extraction complete. Found {len(vendor_coordinates)} vendors with information.")
        return vendor_coordinates

def save_to_json(data, filename="extracted_coordinates.json"):
    """Save extracted data to JSON file."""
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved data to {output_path}")

async def main():
    # Extract coordinates data
    coordinates_data = await extract_coordinates()
    
    # Save to JSON file
    save_to_json(coordinates_data)
    
    # Print summary
    vendors_with_coords = sum(1 for v in coordinates_data if "latitude" in v and "longitude" in v)
    print(f"\nExtraction Summary:")
    print(f"Total vendors found: {len(coordinates_data)}")
    print(f"Vendors with coordinates: {vendors_with_coords}")
    print(f"Vendors missing coordinates: {len(coordinates_data) - vendors_with_coords}")

if __name__ == "__main__":
    asyncio.run(main()) 