import asyncio
import json
import os
import re
from datetime import datetime
from playwright.async_api import async_playwright

async def scrape_hedgeveg_enhanced():
    """
    Enhanced scraper for hedgeveg.je that properly extracts parish information
    from vendor cards after clicking "Open List View"
    """
    # Define valid Jersey parishes
    valid_parishes = [
        'St Helier', 'St Saviour', 'St Clement', 'Grouville', 'St Martin',
        'Trinity', 'St John', 'St Mary', 'St Ouen', 'St Peter', 'St Brelade', 'St Lawrence'
    ]
    
    # Create normalized parish matching dictionary
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
        # Abbreviated version (e.g., "St. B" for "St Brelade")
        if parish.startswith('St '):
            abbr = parish[0:5] + parish[3:4]
            normalized_parishes[abbr.lower()] = parish
            normalized_parishes[abbr.lower().replace('.', '')] = parish
    
    # Define valid produce types based on website text
    valid_produce_types = [
        'Vegetables', 'Fruit', 'Eggs', 'Honey', 'Flowers', 'Plants', 'Meat', 'Milk',
        'Wood', 'Baked Goods', 'Fish', 'Shellfish', 'Royals', 'Jersey Royals'
    ]
    
    # Define regex patterns for data extraction
    parish_pattern = r'Parish:\s*([\w\s\.]+)'
    organic_pattern = r'Organic:\s*(Yes|No)'
    cashless_pattern = r'Cashless payment:\s*(Yes|No)'
    last_updated_pattern = r'Last updated:\s*(.+)'
    opening_times_pattern = r'Opening Times\s*([\s\S]+?)(?=Produce Sold|$)'
    produce_sold_pattern = r'Produce Sold\s*([\s\S]+?)(?=Last updated:|$)'
    
    # Create screenshots directory if it doesn't exist
    screenshots_dir = 'screenshots'
    if not os.path.exists(screenshots_dir):
        os.makedirs(screenshots_dir)
    
    print("Starting Enhanced Playwright scraper...")
    vendors = []
    parishes = set()
    produce_types = set()
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()
        
        try:
            # Navigate to the website
            print("Navigating to hedgeveg.je...")
            await page.goto('https://hedgeveg.je/', wait_until='networkidle')
            await page.screenshot(path=f"{screenshots_dir}/01_initial_page.png")
            
            # Accept cookie consent if present
            try:
                cookie_button = page.locator('button:has-text("Continue"), .cc-btn.cc-allow')
                if await cookie_button.count() > 0:
                    await cookie_button.click()
                    print("Clicked cookie consent button")
                    await page.wait_for_timeout(1000)
            except Exception as e:
                print(f"No cookie consent button found or error: {e}")
            
            # Click the "Continue" button to enter the site
            try:
                continue_button = page.locator('a.et_pb_button, a:has-text("Continue")')
                if await continue_button.count() > 0:
                    await continue_button.click()
                    print("Clicked Continue button")
                    await page.wait_for_timeout(2000)
                    await page.screenshot(path=f"{screenshots_dir}/02_after_continue.png")
            except Exception as e:
                print(f"No Continue button found or error: {e}")
            
            # Click the "Open List View" button
            try:
                list_view_button = page.locator('a:has-text("Open List View"), button:has-text("Open List View"), .et_pb_button_1')
                if await list_view_button.count() > 0:
                    await list_view_button.click()
                    print("Clicked Open List View button")
                    await page.wait_for_timeout(2000)
                    await page.screenshot(path=f"{screenshots_dir}/03_list_view.png")
                else:
                    print("Open List View button not found")
            except Exception as e:
                print(f"Error clicking Open List View button: {e}")
            
            # Save full HTML for analysis
            html = await page.content()
            with open(f"{screenshots_dir}/full_page.html", "w", encoding="utf-8") as f:
                f.write(html)
            
            # Try to find vendor cards using different strategies
            # Strategy 1: Look for elements containing "Parish:" text as this is consistent across vendors
            parish_elements = await page.query_selector_all('text/Parish:/')
            if parish_elements and len(parish_elements) > 0:
                print(f"Found {len(parish_elements)} elements with 'Parish:' text")
                
                # For each parish element, try to find its parent vendor card
                for elem in parish_elements:
                    try:
                        # Navigate up to find the parent card container
                        parent_card = await elem.evaluate('''(el) => {
                            let p = el;
                            let depth = 0;
                            // Go up max 5 levels to find a suitable container
                            while (p && depth < 5) {
                                if (p.tagName && ['ARTICLE', 'DIV', 'SECTION'].includes(p.tagName) && 
                                    (p.className.includes('card') || 
                                     p.className.includes('item') || 
                                     p.className.includes('vendor') ||
                                     p.querySelector('h1,h2,h3,h4,h5'))) {
                                    return p;
                                }
                                p = p.parentElement;
                                depth++;
                            }
                            return p;
                        }''')
                        
                        if parent_card:
                            # Extract vendor data from the parent card
                            await process_vendor_card(parent_card, page, valid_parishes, normalized_parishes, 
                                                    valid_produce_types, vendors, parishes, produce_types, 
                                                    screenshots_dir, parish_pattern, organic_pattern, 
                                                    cashless_pattern, last_updated_pattern, opening_times_pattern)
                    except Exception as e:
                        print(f"Error processing parish element: {e}")
            
            # If no parish elements found or processing failed, try alternative strategies
            if not vendors:
                # Strategy 2: Use vendor card selectors
                vendor_card_selectors = [
                    # Look for elements with both heading and parish text
                    'div:has(h1,h2,h3,h4,h5):has-text("Parish:")',
                    # Look for elements with produce sold text  
                    'div:has-text("Produce Sold")',
                    # Original selectors
                    '.FilteredList_itemWrapper__JvT3h', 
                    'article.et_pb_post', 
                    '.et_pb_portfolio_item',
                    '.vendor-card',
                    '.card',
                    'article'
                ]
                
                # Try each selector to find vendor cards
                vendor_cards = None
                used_selector = None
                
                for selector in vendor_card_selectors:
                    try:
                        locator = page.locator(selector)
                        count = await locator.count()
                        if count > 0:
                            print(f"Found {count} vendor cards using selector: {selector}")
                            vendor_cards = locator
                            used_selector = selector
                            break
                    except Exception:
                        continue
                
                if not vendor_cards:
                    print("Could not find any vendor cards with standard selectors")
                    print("Trying to find cards by looking for typical card patterns...")
                    
                    # Try to find any elements that look like cards
                    try:
                        # Look for elements with specific styles or containing key text patterns
                        card_candidates = page.locator('div:has(h3,h4,h5), div[class*="card"], div[class*="item"], div[class*="post"]')
                        count = await card_candidates.count()
                        if count > 0:
                            print(f"Found {count} potential vendor cards using pattern matching")
                            vendor_cards = card_candidates
                            used_selector = "pattern_match"
                    except Exception as e:
                        print(f"Error with pattern matching: {e}")
                    
                    if not vendor_cards:
                        await page.screenshot(path=f"{screenshots_dir}/04_no_cards_found.png")
                        print("Could not find any vendor cards. Saving page structure...")
                        
                        # Get all elements on the page to analyze structure
                        elements = await page.evaluate('''() => {
                            const allElements = Array.from(document.querySelectorAll('*'));
                            return allElements.slice(0, 200).map(el => {
                                return {
                                    tag: el.tagName,
                                    id: el.id,
                                    classes: el.className,
                                    text: el.textContent.slice(0, 50)
                                };
                            });
                        }''')
                        
                        with open(f"{screenshots_dir}/page_structure.json", "w") as f:
                            json.dump(elements, f, indent=2)
                
                if vendor_cards:
                    # Process vendor cards
                    print(f"Processing {await vendor_cards.count()} vendor cards...")
                    for i in range(await vendor_cards.count()):
                        card = vendor_cards.nth(i)
                        try:
                            card_elem = await card.element_handle()
                            await process_vendor_card(card_elem, page, valid_parishes, normalized_parishes, 
                                                     valid_produce_types, vendors, parishes, produce_types, 
                                                     screenshots_dir, parish_pattern, organic_pattern, 
                                                     cashless_pattern, last_updated_pattern, opening_times_pattern,
                                                     card_index=i)
                        except Exception as e:
                            print(f"Error processing vendor card {i}: {e}")
                
                # Take a final screenshot
                await page.screenshot(path=f"{screenshots_dir}/05_processed_cards.png")
        
        except Exception as e:
            print(f"Scraping error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await browser.close()
    
    # Print parish distribution
    parish_count = {}
    for vendor in vendors:
        parish = vendor["parish"]
        parish_count[parish] = parish_count.get(parish, 0) + 1
    
    print("\nParish Distribution:")
    for parish, count in parish_count.items():
        percentage = (count / len(vendors)) * 100 if vendors else 0
        print(f"{parish}: {count} vendors ({percentage:.1f}%)")
    
    # Prepare and save results
    result = {
        "vendors": vendors,
        "produce_types": list(produce_types),
        "parishes": list(parishes),
        "_metadata": {
            "scraped_at": datetime.now().isoformat(),
            "vendor_count": len(vendors),
            "produce_type_count": len(produce_types),
            "parish_count": len(parishes),
            "scraped_by": "playwright_enhanced_scraper",
            "version": "2.0"
        }
    }
    
    # Save to file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'playwright_enhanced_data.json')
    
    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)
    
    print(f"Enhanced scraping complete! Found {len(vendors)} vendors with {len(parishes)} parishes and {len(produce_types)} produce types")
    return result

async def process_vendor_card(card_elem, page, valid_parishes, normalized_parishes, valid_produce_types, 
                              vendors, parishes, produce_types, screenshots_dir, parish_pattern, 
                              organic_pattern, cashless_pattern, last_updated_pattern, opening_times_pattern, 
                              card_index=None):
    """Process a vendor card element to extract all vendor information"""
    
    await card_elem.scroll_into_view_if_needed()
    
    # Take screenshot of each card for debugging (first 10 cards only)
    if card_index is not None and card_index < 10:
        await card_elem.screenshot(path=f"{screenshots_dir}/card_{card_index+1}.png")
        
        # Save HTML structure of the first few cards
        if card_index < 5:
            card_html = await card_elem.evaluate('el => el.outerHTML')
            with open(f"{screenshots_dir}/card_{card_index+1}_html.txt", "w", encoding="utf-8") as f:
                f.write(card_html)
    
    # Get the full card text for pattern matching
    card_text = await card_elem.evaluate('el => el.textContent')
    card_text = card_text.strip() if card_text else ""
    
    # Extract vendor name from headings
    vendor_name = "Unknown"
    name_elem = await card_elem.querySelector('h1, h2, h3, h4, h5, .title, .name, [class*="title"], [class*="name"]')
    if name_elem:
        vendor_name = await name_elem.text_content()
        vendor_name = vendor_name.strip() if vendor_name else "Unknown"
    
    # Initialize vendor data with defaults
    vendor_data = {
        "name": vendor_name,
        "parish": "Unknown",
        "organic": "Unknown",
        "cashless_payment": "Unknown",
        "description": "",
        "opening_times": "",
        "produce_types": [],
        "last_updated": "",
        "confidence_score": 0
    }
    
    # Extract parish using regex pattern
    parish_match = re.search(parish_pattern, card_text, re.IGNORECASE)
    if parish_match:
        parish_text = parish_match.group(1).strip()
        if parish_text.lower() == "unknown":
            vendor_data["parish"] = "Unknown"
        else:
            for parish_key, parish_value in normalized_parishes.items():
                if parish_key in parish_text.lower() or parish_text.lower() in parish_key:
                    vendor_data["parish"] = parish_value
                    parishes.add(parish_value)
                    break
        
        print(f"Extracted parish from '{parish_text}': {vendor_data['parish']}")
    
    # Extract organic status
    organic_match = re.search(organic_pattern, card_text, re.IGNORECASE)
    if organic_match:
        vendor_data["organic"] = organic_match.group(1)
    
    # Extract cashless payment status
    cashless_match = re.search(cashless_pattern, card_text, re.IGNORECASE)
    if cashless_match:
        vendor_data["cashless_payment"] = cashless_match.group(1)
    
    # Extract last updated date
    last_updated_match = re.search(last_updated_pattern, card_text, re.IGNORECASE)
    if last_updated_match:
        vendor_data["last_updated"] = last_updated_match.group(1).strip()
    
    # Extract opening times if present
    opening_times_match = re.search(opening_times_pattern, card_text, re.IGNORECASE)
    if opening_times_match:
        vendor_data["opening_times"] = opening_times_match.group(1).strip()
    
    # Extract produce types
    for produce_type in valid_produce_types:
        if produce_type.lower() in card_text.lower():
            if produce_type not in vendor_data["produce_types"]:
                vendor_data["produce_types"].append(produce_type)
                produce_types.add(produce_type)
    
    # Extract description (text between parish/organic/cashless and produce sold or opening times)
    # This is complex and might require multiple approaches
    description_text = ""
    
    # Try to extract description via paragraphs
    paragraphs = await card_elem.querySelectorAll('p')
    for para in paragraphs:
        para_text = await para.text_content()
        para_text = para_text.strip()
        
        # Skip if it contains standard fields
        if re.search(r'Parish:|Organic:|Cashless payment:|Last updated:|Produce Sold|Opening Times', para_text):
            continue
        
        # Add to description if it seems like content
        if para_text and len(para_text) > 5:
            description_text += para_text + " "
    
    vendor_data["description"] = description_text.strip()
    
    # Calculate confidence score based on completeness
    confidence = 0
    if vendor_data["parish"] != "Unknown": confidence += 2
    if vendor_data["produce_types"]: confidence += 2
    if vendor_data["description"]: confidence += 1
    if vendor_data["last_updated"]: confidence += 1
    if vendor_data["organic"] != "Unknown": confidence += 1
    if vendor_data["cashless_payment"] != "Unknown": confidence += 1
    if vendor_data["opening_times"]: confidence += 1
    
    vendor_data["confidence_score"] = min(confidence, 10)  # Cap at 10
    
    # Add vendor to list
    vendors.append(vendor_data)
    print(f"Processed vendor: {vendor_name}, Parish: {vendor_data['parish']}, Produce: {vendor_data['produce_types']}, Confidence: {vendor_data['confidence_score']}/10")

if __name__ == "__main__":
    asyncio.run(scrape_hedgeveg_enhanced()) 