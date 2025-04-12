#!/usr/bin/env python3
import os
import json
import time
import argparse
from playwright.sync_api import sync_playwright

def load_json(file_path):
    """Load JSON data from file path."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {file_path}")
        return None

def save_json(data, file_path):
    """Save JSON data to file path."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(file_path)), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"Data saved to {file_path}")
        return True
    except Exception as e:
        print(f"Error saving data: {e}")
        return False

def extract_coordinates_from_map():
    """Extract vendor coordinates from hedgeveg.je map."""
    vendors_with_coordinates = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            print("Navigating to hedgeveg.je...")
            page.goto("https://hedgeveg.je/")
            page.wait_for_load_state("networkidle")
            
            # Accept cookies if needed
            try:
                if page.locator('button:has-text("Accept")').is_visible(timeout=3000):
                    page.locator('button:has-text("Accept")').click()
                    print("Accepted cookies")
            except:
                print("No cookie prompt found or already accepted")
            
            # Click on "Open List View" to activate the map
            try:
                page.locator('button:has-text("Open List View")').click()
                print("Clicked Open List View button")
                page.wait_for_load_state("networkidle")
                time.sleep(2)  # Wait a bit for map to fully load
            except Exception as e:
                print(f"Error clicking Open List View: {e}")
            
            # Wait for markers to appear on the map
            page.wait_for_selector(".leaflet-marker-icon", timeout=10000)
            
            # Capture network requests to find map data
            markers_data = []
            def handle_response(response):
                if "api" in response.url and "vendors" in response.url:
                    try:
                        data = response.json()
                        if isinstance(data, list) and len(data) > 0 and "latitude" in data[0]:
                            nonlocal markers_data
                            markers_data = data
                            print(f"Captured data for {len(data)} vendors from API")
                    except:
                        pass
            
            page.on("response", handle_response)
            
            # If we haven't captured API data, try extracting from the DOM
            if not markers_data:
                print("Trying to extract marker data from the map...")
                
                # Click on each marker and extract data from popup
                markers = page.locator(".leaflet-marker-icon")
                count = markers.count()
                print(f"Found {count} markers on the map")
                
                for i in range(count):
                    try:
                        # Click the marker
                        markers.nth(i).click()
                        page.wait_for_timeout(300)  # Wait for popup
                        
                        # Check if popup is visible
                        if page.locator(".leaflet-popup-content").is_visible():
                            # Extract data from popup
                            name = page.locator(".leaflet-popup-content h2").text_content().strip()
                            
                            # Extract coordinates from page
                            coords = page.evaluate('''() => {
                                const markers = window._leaflet_map._layers;
                                for (const key in markers) {
                                    const marker = markers[key];
                                    if (marker._popup && marker._popup._isOpen) {
                                        return {
                                            lat: marker._latlng.lat,
                                            lng: marker._latlng.lng
                                        };
                                    }
                                }
                                return null;
                            }''')
                            
                            if coords:
                                parish = None
                                parish_elem = page.locator(".leaflet-popup-content div:has-text('Parish:')").first
                                if parish_elem.is_visible():
                                    parish_text = parish_elem.text_content().strip()
                                    parish = parish_text.replace("Parish:", "").strip()
                                
                                vendor_data = {
                                    "name": name,
                                    "parish": parish,
                                    "latitude": coords["lat"],
                                    "longitude": coords["lng"],
                                    "location_accuracy": "high"
                                }
                                vendors_with_coordinates.append(vendor_data)
                                print(f"Extracted data for vendor: {name}")
                            
                            # Close popup before clicking next marker
                            page.locator(".leaflet-popup-close-button").click()
                            page.wait_for_timeout(200)
                    except Exception as e:
                        print(f"Error processing marker {i}: {e}")
            else:
                # Use the data captured from API
                for vendor in markers_data:
                    if "latitude" in vendor and "longitude" in vendor and vendor["latitude"] and vendor["longitude"]:
                        vendor_data = {
                            "name": vendor.get("name", "Unknown"),
                            "parish": vendor.get("parish", None),
                            "latitude": vendor["latitude"],
                            "longitude": vendor["longitude"],
                            "location_accuracy": "high"
                        }
                        vendors_with_coordinates.append(vendor_data)
            
            print(f"Successfully extracted coordinates for {len(vendors_with_coordinates)} vendors")
            
        except Exception as e:
            print(f"Error during extraction: {e}")
        finally:
            browser.close()
    
    return vendors_with_coordinates

def update_vendor_coordinates(input_file, output_file, map_data):
    """Update vendor coordinates with data from map."""
    print(f"Loading vendor data from {input_file}...")
    data = load_json(input_file)
    if not data:
        return False
    
    vendors = data.get("vendors", [])
    if not vendors:
        print("No vendors found in input file")
        return False
    
    print(f"Found {len(vendors)} vendors in input file")
    print(f"Found {len(map_data)} vendors with precise coordinates from map")
    
    # Create lookup by name for map data
    map_lookup = {v["name"].lower(): v for v in map_data}
    
    # Update coordinates
    high_accuracy_count = 0
    for vendor in vendors:
        vendor_name = vendor.get("name", "").lower()
        
        if vendor_name in map_lookup:
            # Update with precise coordinates
            map_vendor = map_lookup[vendor_name]
            vendor["latitude"] = map_vendor["latitude"]
            vendor["longitude"] = map_vendor["longitude"]
            vendor["location_accuracy"] = "high"
            high_accuracy_count += 1
        elif vendor.get("latitude") is not None and vendor.get("longitude") is not None:
            # Keep existing coordinates but mark as parish-level
            vendor["location_accuracy"] = "parish"
    
    # Calculate statistics
    accuracy_percentage = (high_accuracy_count / len(vendors)) * 100 if vendors else 0
    print(f"Updated {high_accuracy_count} vendors with high-accuracy coordinates ({accuracy_percentage:.2f}%)")
    
    # Add metadata
    data["_metadata"] = data.get("_metadata", {})
    data["_metadata"].update({
        "coordinates_timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
        "high_accuracy_count": high_accuracy_count,
        "high_accuracy_percentage": accuracy_percentage,
        "total_vendors": len(vendors)
    })
    
    # Save updated data
    print(f"Saving updated data to {output_file}...")
    success = save_json(data, output_file)
    
    return success, high_accuracy_count, accuracy_percentage

def main():
    parser = argparse.ArgumentParser(description='Extract and update vendor coordinates from hedgeveg.je map')
    parser.add_argument('--input', type=str, default='geocoded_data.json',
                      help='Input JSON file with vendor data')
    parser.add_argument('--output', type=str, default='precise_geocoded_data.json',
                      help='Output JSON file for updated vendor data')
    parser.add_argument('--map-data', type=str,
                      help='Optional JSON file with pre-extracted map data')
    
    args = parser.parse_args()
    
    # Ensure absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    input_path = args.input
    if not os.path.isabs(input_path):
        input_path = os.path.join(script_dir, input_path)
    
    output_path = args.output
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    # Extract map data
    if args.map_data and os.path.exists(args.map_data):
        print(f"Loading pre-extracted map data from {args.map_data}...")
        map_data = load_json(args.map_data)
    else:
        print("Extracting vendor coordinates from hedgeveg.je map...")
        map_data = extract_coordinates_from_map()
        
        # Save map data for future use
        map_data_path = os.path.join(script_dir, "map_coordinates_data.json")
        save_json(map_data, map_data_path)
        print(f"Saved map data to {map_data_path} for future use")
    
    # Update vendor coordinates
    success, high_accuracy_count, accuracy_percentage = update_vendor_coordinates(input_path, output_path, map_data)
    
    if success:
        print(f"\nData processing completed successfully!")
        print(f"- Input file: {input_path}")
        print(f"- Output file: {output_path}")
        print(f"- Total vendors processed: {len(map_data)}")
        print(f"- High-accuracy coordinates: {high_accuracy_count}")
        print(f"- Accuracy percentage: {accuracy_percentage:.2f}%")
        
        if accuracy_percentage < 50:
            print("\nWARNING: Less than 50% of vendors have high-accuracy coordinates.")
            print("Consider running the script again or using a better map source.")
        else:
            print("\nSUCCESS: More than 50% of vendors have high-accuracy coordinates!")
    else:
        print("\nData processing failed. Please check the logs for errors.")

if __name__ == '__main__':
    main() 