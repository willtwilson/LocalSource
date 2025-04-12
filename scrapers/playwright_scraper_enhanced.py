import asyncio
import json
import os
import re
from datetime import datetime
from playwright.async_api import async_playwright

async def scrape_hedgeveg():
    # Official produce types from the website
    official_produce_types = [
        'Vegetables', 'Jersey Royals', 'Plants', 'Eggs', 'Wood', 
        'Flowers', 'Fruit', 'Milk', 'Meat', 'Baked Goods', 
        'Fish', 'Shellfish', 'Honey'
    ]
    
    # Map our potential categories to official ones
    produce_type_mapping = {
        'vegetables': 'Vegetables',
        'veg': 'Vegetables',
        'vegetable': 'Vegetables',
        'royals': 'Jersey Royals',
        'jersey royal': 'Jersey Royals',
        'jersey royals': 'Jersey Royals',
        'plants': 'Plants',
        'plant': 'Plants',
        'eggs': 'Eggs',
        'egg': 'Eggs',
        'wood': 'Wood',
        'flowers': 'Flowers',
        'flower': 'Flowers',
        'fruit': 'Fruit',
        'fruits': 'Fruit',
        'milk': 'Milk',
        'dairy': 'Milk',
        'meat': 'Meat',
        'baked goods': 'Baked Goods',
        'baked good': 'Baked Goods',
        'bake': 'Baked Goods',
        'cake': 'Baked Goods',
        'cakes': 'Baked Goods',
        'bread': 'Baked Goods',
        'bakery': 'Baked Goods',
        'fish': 'Fish',
        'seafood': 'Fish',  # Default to Fish, can be refined
        'shellfish': 'Shellfish',
        'crab': 'Shellfish',
        'lobster': 'Shellfish',
        'honey': 'Honey'
    }
    
    # Define valid Jersey parishes with and without periods
    parishes = [
        'St Helier', 'St Saviour', 'St Clement', 'Grouville', 'St Martin',
        'Trinity', 'St John', 'St Mary', 'St Ouen', 'St Peter', 'St Brelade', 'St Lawrence'
    ]
    
    # Create a comprehensive parish mapping with variations
    parish_mapping = {}
    for parish in parishes:
        # Original format
        parish_mapping[parish.lower()] = parish
        
        # Without dots
        parish_mapping[parish.lower().replace('.', '')] = parish
        
        # With dots between St and name
        if parish.startswith('St '):
            # St. Name
            dot_version = parish.replace('St ', 'St. ')
            parish_mapping[dot_version.lower()] = parish
            parish_mapping[dot_version.lower().replace('.', '')] = parish
            
            # St.Name (no space)
            no_space_version = parish.replace('St ', 'St.')
            parish_mapping[no_space_version.lower()] = parish
            parish_mapping[no_space_version.lower().replace('.', '')] = parish
            
            # Just parish name
            parish_name = parish.replace('St ', '')
            parish_mapping[parish_name.lower()] = parish
    
    vendors = []
    produce_types_found = set()
    parishes_found = set()
    
    # Create screenshots directory if it doesn't exist
    if not os.path.exists('screenshots'):
        os.makedirs('screenshots')
    
    print("Starting Enhanced Playwright scraper...")
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

            # First, try to get the list of official vendors from the dropdown
            official_vendors = []
            try:
                # Try another selector for the seller dropdown that avoids timeout
                dropdown_selectors = [
                    'select[name="Seller"]', 
                    'select#seller-select',
                    'select[aria-label="Seller"]',
                    'select'
                ]
                
                for selector in dropdown_selectors:
                    select_elem = await page.query_selector(selector)
                    if select_elem:
                        options = await select_elem.query_selector_all('option')
                        for option in options:
                            vendor_name = await option.text_content()
                            vendor_name = vendor_name.strip()
                            if vendor_name and vendor_name != "All Sellers":
                                official_vendors.append(vendor_name)
                        
                        if official_vendors:
                            print(f"Found {len(official_vendors)} official vendors in dropdown")
                            break
            except Exception as e:
                print(f"Error getting official vendors from dropdown: {e}")
            
            # Try to click "Open List View" button
            try:
                # Target the exact text as seen in the Puppeteer output
                open_list_selectors = [
                    'button:has-text("Open List View")',
                    'button:has-text("List View")',
                    'a:has-text("Open List View")',
                    'a:has-text("List View")'
                ]
                
                for selector in open_list_selectors:
                    open_list_button = page.locator(selector)
                    if await open_list_button.count() > 0:
                        await open_list_button.click()
                        print(f"Clicked button using selector: {selector}")
                        # Wait for content to load
                        await page.wait_for_load_state('networkidle')
                        await page.wait_for_timeout(1500)  # Extra wait to ensure content is loaded
                        break
                
                # Take screenshot after clicking to see what happened
                await page.screenshot(path="screenshots/after_list_view_click.png")
                print("Saved screenshot after clicking List View")
            except Exception as e:
                print(f"Error clicking Open List View button: {e}")
            
            # Get the page content for analysis
            page_content = await page.content()
            
            # Save HTML content for debugging
            with open("screenshots/page_content.html", "w", encoding="utf-8") as f:
                f.write(page_content)
            print("Saved page HTML for debugging")
            
            page_text = await page.evaluate('() => document.body.textContent')
            page_text_lower = page_text.lower() if page_text else ""
            
            # Look for elements that might contain "Parish: " text
            parish_elements = await page.query_selector_all('*:has-text("Parish:")')
            if parish_elements:
                print(f"Found {len(parish_elements)} elements with 'Parish:' text")
                
                # Extract parish data from these elements
                for elem in parish_elements:
                    try:
                        elem_text = await elem.text_content()
                        print(f"Parish element text: {elem_text}")
                        
                        # Look for parish name after "Parish:"
                        match = re.search(r"Parish:\s*([^,\n]+)", elem_text)
                        if match:
                            parish_name = match.group(1).strip()
                            print(f"Found parish: {parish_name}")
                            
                            # Try to find associated vendor name
                            parent_elem = await elem.evaluate('(el) => { let p = el; while(p && !p.querySelector("h1, h2, h3, h4, h5")) { p = p.parentElement; } return p; }')
                            if parent_elem:
                                title_elem = await parent_elem.querySelector('h1, h2, h3, h4, h5')
                                if title_elem:
                                    vendor_name = await title_elem.text_content()
                                    print(f"Associated vendor: {vendor_name}")
                    except Exception as e:
                        print(f"Error processing parish element: {e}")
            else:
                print("No elements with 'Parish:' text found")
            
            # Try to find vendor cards in list view
            card_selectors = [
                '.vendor-card', 
                'article', 
                '.card', 
                'div[class*="vendor"]',
                'div[class*="card"]',
                'div.item'
            ]
            
            vendor_cards = []
            for selector in card_selectors:
                elements = await page.query_selector_all(selector)
                if elements and len(elements) > 0:
                    print(f"Found {len(elements)} elements with selector '{selector}'")
                    vendor_cards = elements
                    break
            
            if not vendor_cards:
                # Extract using H5 elements since that's what worked in Puppeteer
                h5_elements = await page.query_selector_all('h5')
                print(f"Falling back to H5 elements, found {len(h5_elements)}")
                
                # Process H5 elements
                for h5 in h5_elements:
                    try:
                        name = await h5.text_content()
                        name = name.strip() if name else "Unknown"
                        
                        # Skip if not a valid vendor name
                        if len(name) < 3 or name == "Unknown":
                            continue
                        
                        # Get parent element text for additional context
                        parent_text = ""
                        try:
                            parent = await h5.evaluate('el => { let p = el.parentElement; return p ? p.textContent : null; }')
                            if parent:
                                parent_text = parent.strip()
                        except Exception:
                            pass
                        
                        # Initialize vendor data
                        vendor_data = {
                            "name": name,
                            "parish": "Unknown",
                            "organic": "No",
                            "cashless_payment": "Unknown",
                            "is_farm_shop": "No",
                            "description": parent_text,
                            "produce_types": [],
                            "confidence": "Medium"
                        }
                        
                        # Look for parish in the name directly
                        name_lower = name.lower()
                        for p_key, p_value in parish_mapping.items():
                            if p_key in name_lower:
                                vendor_data["parish"] = p_value
                                parishes_found.add(p_value)
                                break
                        
                        # Try to find parish info in the parent text
                        combined_text = (parent_text + " " + name).lower()
                        
                        # Check for "Parish: " pattern first
                        parish_pattern = r"parish:\s*([^,\n]+)"
                        parish_match = re.search(parish_pattern, combined_text)
                        if parish_match:
                            parish_text = parish_match.group(1).strip().lower()
                            for p_key, p_value in parish_mapping.items():
                                if p_key in parish_text or parish_text in p_key:
                                    vendor_data["parish"] = p_value
                                    parishes_found.add(p_value)
                                    break
                        
                        # If still unknown, try alternative patterns
                        if vendor_data["parish"] == "Unknown":
                            # Check for explicit mentions like "in St Helier"
                            parish_patterns = [
                                r"in\s+(st\.?\s*\w+)", 
                                r"at\s+(st\.?\s*\w+)",
                                r"(st\.?\s*\w+)\s+parish",
                                r"located in\s+(st\.?\s*\w+)"
                            ]
                            
                            for pattern in parish_patterns:
                                match = re.search(pattern, combined_text)
                                if match:
                                    potential_parish = match.group(1).lower()
                                    for p_key, p_value in parish_mapping.items():
                                        if p_key in potential_parish or potential_parish in p_key:
                                            vendor_data["parish"] = p_value
                                            parishes_found.add(p_value)
                                            break
                                    if vendor_data["parish"] != "Unknown":
                                        break
                        
                        # If still unknown, check for parish names directly
                        if vendor_data["parish"] == "Unknown":
                            for p_key, p_value in parish_mapping.items():
                                if p_key in combined_text:
                                    vendor_data["parish"] = p_value
                                    parishes_found.add(p_value)
                                    break
                        
                        # Extract specific names that have parish in their name
                        special_parish_mappings = {
                            "master farms st brelade": "St Brelade",
                            "master farms trinity": "Trinity",
                            "warren farm noirmont": "St Brelade",  # Noirmont is in St Brelade
                            "la rue à georges": "St Ouen"  # This is in St Ouen
                        }
                        
                        if vendor_data["parish"] == "Unknown":
                            for special_name, parish_value in special_parish_mappings.items():
                                if special_name in name_lower:
                                    vendor_data["parish"] = parish_value
                                    parishes_found.add(parish_value)
                                    break
                        
                        # Look for produce types in name and parent text
                        for produce_key, produce_value in produce_type_mapping.items():
                            if produce_key in combined_text:
                                if produce_value not in vendor_data["produce_types"]:
                                    vendor_data["produce_types"].append(produce_value)
                                    produce_types_found.add(produce_value)
                        
                        # Special cases based on name
                        if "egg" in name_lower and "Eggs" not in vendor_data["produce_types"]:
                            vendor_data["produce_types"].append("Eggs")
                            produce_types_found.add("Eggs")
                        
                        if "royal" in name_lower and "Jersey Royals" not in vendor_data["produce_types"]:
                            vendor_data["produce_types"].append("Jersey Royals")
                            produce_types_found.add("Jersey Royals")
                        
                        # Add confidence score based on data completeness
                        if vendor_data["parish"] != "Unknown" and vendor_data["produce_types"]:
                            vendor_data["confidence"] = "High"
                        elif vendor_data["parish"] == "Unknown" and not vendor_data["produce_types"]:
                            vendor_data["confidence"] = "Low"
                        
                        # Add to vendors list
                        vendors.append(vendor_data)
                        print(f"Added vendor: {name} (Parish: {vendor_data['parish']})")
                    
                    except Exception as e:
                        print(f"Error processing H5 element: {e}")
            else:
                # Process vendor cards if found
                print(f"Processing {len(vendor_cards)} vendor cards")
                for card in vendor_cards:
                    try:
                        # Extract card text for analysis
                        card_text = await card.text_content()
                        card_text_lower = card_text.lower() if card_text else ""
                        
                        # Try to get the vendor name
                        name_elem = await card.query_selector('h2, h3, h4, h5, .title, [class*="title"]')
                        if not name_elem:
                            # Try other selectors
                            name_elem = await card.evaluate('el => { return el.querySelector("*[class*=title]") || el.querySelector("h2, h3, h4, h5"); }')
                        
                        name = ""
                        if name_elem:
                            name = await name_elem.text_content()
                            name = name.strip() if name else "Unknown"
                        else:
                            # If no name element found, use the first line of card text
                            name = card_text.split('\n')[0].strip() if '\n' in card_text else card_text.strip()
                            if len(name) > 50:  # Likely not a name
                                name = "Unknown Vendor"
                        
                        # Initialize vendor data
                        vendor_data = {
                            "name": name,
                            "parish": "Unknown",
                            "organic": "No",
                            "cashless_payment": "Unknown",
                            "is_farm_shop": "No",
                            "description": card_text,
                            "produce_types": [],
                            "confidence": "Medium"
                        }
                        
                        # Look specifically for "Parish:" text in the card
                        parish_match = re.search(r"parish:\s*([^,\n]+)", card_text_lower)
                        if parish_match:
                            parish_text = parish_match.group(1).strip().lower()
                            for p_key, p_value in parish_mapping.items():
                                if p_key in parish_text or parish_text in p_key:
                                    vendor_data["parish"] = p_value
                                    parishes_found.add(p_value)
                                    break
                        
                        # If parish still unknown, try other methods
                        if vendor_data["parish"] == "Unknown":
                            # Check for parish in vendor name
                            name_lower = name.lower()
                            for p_key, p_value in parish_mapping.items():
                                if p_key in name_lower:
                                    vendor_data["parish"] = p_value
                                    parishes_found.add(p_value)
                                    break
                            
                            # Check for explicit mentions in card text
                            if vendor_data["parish"] == "Unknown":
                                parish_patterns = [
                                    r"in\s+(st\.?\s*\w+)", 
                                    r"at\s+(st\.?\s*\w+)",
                                    r"(st\.?\s*\w+)\s+parish",
                                    r"located in\s+(st\.?\s*\w+)"
                                ]
                                
                                for pattern in parish_patterns:
                                    match = re.search(pattern, card_text_lower)
                                    if match:
                                        potential_parish = match.group(1).lower()
                                        for p_key, p_value in parish_mapping.items():
                                            if p_key in potential_parish or potential_parish in p_key:
                                                vendor_data["parish"] = p_value
                                                parishes_found.add(p_value)
                                                break
                                        if vendor_data["parish"] != "Unknown":
                                            break
                            
                            # If still unknown, check for parish names directly
                            if vendor_data["parish"] == "Unknown":
                                for p_key, p_value in parish_mapping.items():
                                    if p_key in card_text_lower:
                                        vendor_data["parish"] = p_value
                                        parishes_found.add(p_value)
                                        break
                        
                        # Look for produce types in card text
                        for produce_key, produce_value in produce_type_mapping.items():
                            if produce_key in card_text_lower:
                                if produce_value not in vendor_data["produce_types"]:
                                    vendor_data["produce_types"].append(produce_value)
                                    produce_types_found.add(produce_value)
                        
                        # Update confidence based on data completeness
                        if vendor_data["parish"] != "Unknown" and vendor_data["produce_types"]:
                            vendor_data["confidence"] = "High"
                        elif vendor_data["parish"] == "Unknown" and not vendor_data["produce_types"]:
                            vendor_data["confidence"] = "Low"
                        
                        # Add to vendors list
                        vendors.append(vendor_data)
                        print(f"Added vendor from card: {name} (Parish: {vendor_data['parish']})")
                    
                    except Exception as e:
                        print(f"Error processing vendor card: {e}")
            
            # Extract parish info by checking elements with text containing parish names
            if not parishes_found:
                print("No parishes found yet, trying additional methods")
                for parish in parishes:
                    parish_elements = await page.query_selector_all(f'text=/{parish}/i')
                    for elem in parish_elements:
                        try:
                            elem_text = await elem.text_content()
                            print(f"Found text containing '{parish}': {elem_text}")
                            parishes_found.add(parish)
                        except Exception as e:
                            print(f"Error processing text with '{parish}': {e}")
            
            # If we still have few produce types, check the whole page
            if len(produce_types_found) < 5:
                for produce_key, produce_value in produce_type_mapping.items():
                    if produce_key in page_text_lower:
                        produce_types_found.add(produce_value)
            
            print(f"Extracted {len(vendors)} vendor records")
            print(f"Found {len(produce_types_found)} produce types")
            print(f"Found {len(parishes_found)} parishes")
            
            # Take a screenshot of final state
            await page.screenshot(path="screenshots/final_state.png")
            print("Saved final state screenshot.")
            
        except Exception as e:
            print(f"Scraping error: {e}")
        finally:
            await browser.close()
    
    # Post-processing to standardize produce types and parishes
    for vendor in vendors:
        # Ensure we only have official produce types
        standardized_types = []
        for ptype in vendor["produce_types"]:
            if ptype in official_produce_types:
                standardized_types.append(ptype)
        vendor["produce_types"] = standardized_types
    
    # Count parishes
    parish_counts = {}
    for vendor in vendors:
        parish = vendor["parish"]
        if parish in parish_counts:
            parish_counts[parish] += 1
        else:
            parish_counts[parish] = 1
    
    print("Parish distribution:")
    for parish, count in parish_counts.items():
        print(f"  {parish}: {count} vendors")
    
    result = {
        "vendors": vendors,
        "produce_types": sorted(list(produce_types_found)),
        "parishes": sorted(list(parishes_found)),
        "_metadata": {
            "scraped_at": datetime.now().isoformat(),
            "vendor_count": len(vendors),
            "produce_type_count": len(produce_types_found),
            "parish_count": len(parishes_found),
            "source": "https://hedgeveg.je/",
            "scraper_version": "enhanced-v1.1"
        }
    }
    
    # Save to file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'playwright_enhanced_data.json')
    
    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)
    
    print(f"Scraped {len(vendors)} vendors")
    print(f"Data saved to {output_path}")
    return result

if __name__ == "__main__":
    asyncio.run(scrape_hedgeveg()) 