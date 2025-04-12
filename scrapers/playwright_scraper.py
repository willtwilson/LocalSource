import asyncio
import json
import os
import re
from datetime import datetime
from playwright.async_api import async_playwright

async def scrape_hedgeveg():
    # Define valid Jersey parishes - without periods for consistent matching
    valid_parishes = [
        'St Helier', 'St Saviour', 'St Clement', 'Grouville', 'St Martin',
        'Trinity', 'St John', 'St Mary', 'St Ouen', 'St Peter', 'St Brelade', 'St Lawrence'
    ]
    
    # Normalize parishes for better matching (with and without periods)
    normalized_parishes = {}
    for parish in valid_parishes:
        # Original format
        normalized_parishes[parish.lower()] = parish
        # Without dots
        normalized_parishes[parish.lower().replace('.', '')] = parish
        # With dots between St and name
        if parish.startswith('St '):
            dot_version = parish.replace('St ', 'St. ')
            normalized_parishes[dot_version.lower()] = parish
            normalized_parishes[dot_version.lower().replace('.', '')] = parish

    # Define valid produce types for filtering
    valid_produce_types = [
        'Vegetables', 'Fruit', 'Eggs', 'Honey', 'Flowers', 'Plants', 'Meat', 'Dairy', 'Herbs', 'Jams',
        'Preserves', 'Cider', 'Oils', 'Bread', 'Cakes', 'Seafood', 'Baked Goods', 'Royals', 'Jerseys', 'International Kidneys'
    ]
    
    # Create a mapping of lowercase produce types for case-insensitive matching
    produce_types_lower = {p_type.lower(): p_type for p_type in valid_produce_types}
    
    vendors = []
    produce_types = set()
    parishes = set()
    
    # Create screenshots directory if it doesn't exist
    if not os.path.exists('screenshots'):
        os.makedirs('screenshots')
    
    print("Starting Playwright scraper...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()
        
        try:
            # Navigate to website
            await page.goto('https://hedgeveg.je/', wait_until='networkidle')
            print("Page loaded")
            
            # Take a screenshot
            await page.screenshot(path="screenshots/initial_page.png")
            print("Saved initial page screenshot")
            
            # Accept any cookie consent
            try:
                continue_button = page.locator('button:has-text("Continue"), .cc-btn.cc-allow')
                if await continue_button.count() > 0:
                    await continue_button.click()
                    print("Clicked continue button")
                    # Wait for animations
                    await page.wait_for_timeout(1000)
            except Exception as e:
                print(f"No continue button found or error: {e}")

            # Get the page content for later analysis
            page_content = await page.content()
            page_text = await page.evaluate('() => document.body.textContent')
            page_text_lower = page_text.lower() if page_text else ""
            
            # Extract H5 elements that might be vendor titles
            h5_elements = await page.query_selector_all('h5')
            print(f"Found {len(h5_elements)} H5 elements")
            
            for h5 in h5_elements:
                try:
                    name = await h5.text_content()
                    name = name.strip() if name else "Unknown"
                    
                    # Initialize vendor data with defaults
                    vendor_data = {
                        "name": name,
                        "parish": "Unknown",
                        "organic": "No",  # Default based on examples
                        "cashless_payment": "Yes",  # Default based on examples
                        "description": "",
                        "produce_types": [],
                        "last_updated": "Unknown"
                    }
                    
                    # Check for produce types in name (case insensitive)
                    name_lower = name.lower()
                    for produce_key, produce_value in produce_types_lower.items():
                        if produce_key in name_lower:
                            if produce_value not in vendor_data["produce_types"]:
                                vendor_data["produce_types"].append(produce_value)
                                produce_types.add(produce_value)
                    
                    # Add some heuristics for produce types based on name
                    if "cake" in name_lower or "bake" in name_lower or "bread" in name_lower:
                        if "Baked Goods" not in vendor_data["produce_types"]:
                            vendor_data["produce_types"].append("Baked Goods")
                            produce_types.add("Baked Goods")
                    if "egg" in name_lower and "Eggs" not in vendor_data["produce_types"]:
                        vendor_data["produce_types"].append("Eggs")
                        produce_types.add("Eggs")
                    if "royal" in name_lower and "Royals" not in vendor_data["produce_types"]:
                        vendor_data["produce_types"].append("Royals")
                        produce_types.add("Royals")
                    
                    # Check for parish in name (normalized)
                    name_for_parish = name.lower()
                    for parish_key, parish_value in normalized_parishes.items():
                        if parish_key in name_for_parish:
                            vendor_data["parish"] = parish_value
                            parishes.add(parish_value)
                            break
                    
                    # Try to get parent element for more context
                    try:
                        parent = await h5.evaluate('el => { let p = el.parentElement; return p ? p.textContent : null; }')
                        if parent:
                            parent_lower = parent.lower()
                            # Check for parish in parent text
                            for parish_key, parish_value in normalized_parishes.items():
                                if parish_key in parent_lower and vendor_data["parish"] == "Unknown":
                                    vendor_data["parish"] = parish_value
                                    parishes.add(parish_value)
                                    break
                    except Exception as e:
                        print(f"Error getting parent for {name}: {e}")
                    
                    # Add to vendors list
                    vendors.append(vendor_data)
                
                except Exception as e:
                    print(f"Error processing H5 element: {e}")
            
            # Identify produce types from page content
            for produce_key, produce_value in produce_types_lower.items():
                if produce_key in page_text_lower:
                    produce_types.add(produce_value)
            
            # Identify parishes from page content
            for parish_key, parish_value in normalized_parishes.items():
                if parish_key in page_text_lower:
                    parishes.add(parish_value)
            
            print(f"Extracted {len(vendors)} vendor records")
            
            # Take a screenshot of final state
            await page.screenshot(path="screenshots/final_state.png")
            print("Saved final state screenshot.")
            
        except Exception as e:
            print(f"Scraping error: {e}")
        finally:
            await browser.close()
    
    result = {
        "vendors": vendors,
        "produce_types": list(produce_types),
        "parishes": list(parishes),
        "_metadata": {
            "scraped_at": datetime.now().isoformat(),
            "vendor_count": len(vendors),
            "produce_type_count": len(produce_types),
            "parish_count": len(parishes)
        }
    }
    
    # Determine output path based on script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'playwright_data.json')
    
    # Save to file
    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)
    
    print(f"Scraped {len(vendors)} vendors")
    print(f"Data saved to {output_path}")
    return result

if __name__ == "__main__":
    asyncio.run(scrape_hedgeveg()) 