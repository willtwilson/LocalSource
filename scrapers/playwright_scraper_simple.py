import asyncio
import json
import re
from playwright.async_api import async_playwright
from typing import Dict, List, Any, Optional, Set

async def scrape_hedgeveg():
    """Scrape the hedgeveg website for vendor information."""
    print("Starting scraper...")
    
    # Define known valid parishes in Jersey
    valid_parishes = [
        "St Helier", "St Saviour", "St Clement", "Grouville", "St Martin", 
        "Trinity", "St John", "St Mary", "St Ouen", "St Peter", "St Brelade", "St Lawrence"
    ]
    
    # Known produce types
    valid_produce_types = [
        "Vegetables", "Fruit", "Eggs", "Flowers", "Plants", "Honey", 
        "Jam", "Herbs", "Dairy", "Baked Goods", "Cakes", "Meat", "Seafood", "Royals"
    ]
    
    # Normalize parish names for better matching (remove periods, lowercase, etc.)
    normalized_parishes = {parish.lower().replace(".", "").strip(): parish for parish in valid_parishes}
    
    # Function to match parish text to valid parish
    def match_parish(text: str) -> str:
        if not text:
            return "Unknown"
        
        # Clean up the text
        cleaned = text.lower().replace(".", "").strip()
        
        # Direct match
        if cleaned in normalized_parishes:
            return normalized_parishes[cleaned]
        
        # Check if any valid parish is contained in the text
        for norm_parish, original_parish in normalized_parishes.items():
            if norm_parish in cleaned or cleaned in norm_parish:
                return original_parish
                
        # Check for common abbreviations
        if "st h" in cleaned:
            return "St Helier"
        elif "st b" in cleaned and "brelade" in cleaned:
            return "St Brelade"
        elif "st b" in cleaned and "st brel" in cleaned:
            return "St Brelade"
        elif "st p" in cleaned and "peter" in cleaned:
            return "St Peter"
        elif "st o" in cleaned and "ouen" in cleaned:
            return "St Ouen"
        elif "st m" in cleaned and "martin" in cleaned:
            return "St Martin"
        elif "st m" in cleaned and "mary" in cleaned:
            return "St Mary"
        elif "st j" in cleaned and "john" in cleaned:
            return "St John"
        elif "st l" in cleaned and "lawrence" in cleaned:
            return "St Lawrence"
        elif "st s" in cleaned and "saviour" in cleaned:
            return "St Saviour"
        elif "trinity" in cleaned:
            return "Trinity"
        elif "grouville" in cleaned:
            return "Grouville"

        # If we didn't find a match, check for parts of the parish name
        for norm_parish, original_parish in normalized_parishes.items():
            # Check the first parts - like "st b" for "St Brelade"
            parish_parts = norm_parish.split()
            if len(parish_parts) > 1:
                prefix = parish_parts[0] + " " + parish_parts[1][0]
                if prefix in cleaned:
                    return original_parish
        
        return "Unknown"
    
    # Function to extract produce types from text
    def extract_produce_types(text: str) -> List[str]:
        if not text:
            return []
        
        found_types = []
        text_lower = text.lower()
        
        for produce_type in valid_produce_types:
            # Check for singular and plural forms
            singular = produce_type.lower().rstrip('s')
            if singular in text_lower or produce_type.lower() in text_lower:
                found_types.append(produce_type)
        
        # Special case checks
        if "potato" in text_lower or "potatoes" in text_lower or "jersey royal" in text_lower:
            if "Royals" not in found_types:
                found_types.append("Royals")
        
        if "bread" in text_lower or "cake" in text_lower or "pastry" in text_lower or "pastries" in text_lower:
            if "Baked Goods" not in found_types:
                found_types.append("Baked Goods")
                
        if "milk" in text_lower or "cheese" in text_lower or "butter" in text_lower:
            if "Dairy" not in found_types:
                found_types.append("Dairy")
        
        return found_types

    # Extract address and try to determine parish
    def extract_address_and_parish(text: str) -> tuple:
        if not text:
            return None, "Unknown"
        
        # Check for potential address format with parish
        address = None
        parish = "Unknown"
        
        # Look for common address indicators
        address_match = re.search(r'(?:located at|address|find us at|situated at)\s+(.*)', text, re.IGNORECASE)
        if address_match:
            address = address_match.group(1).strip()
        
        # Try to match parish from the entire text
        parish = match_parish(text)
        
        return address, parish

    # Extract yes/no fields
    def extract_yes_no_field(text: str, field_name: str) -> str:
        if not text:
            return "Unknown"
            
        text_lower = text.lower()
        
        # Look for patterns like "Organic: Yes" or "We offer cashless payment"
        if f"{field_name.lower()}: yes" in text_lower or f"{field_name.lower()} yes" in text_lower:
            return "Yes"
        elif f"{field_name.lower()}: no" in text_lower or f"{field_name.lower()} no" in text_lower:
            return "No"
        
        # Check for positive indicators
        positive_indicators = [
            "is organic", "are organic", "organic produce", "organic farm", 
            "organically grown", "accept cashless", "cashless payment", 
            "card payment", "accept card", "accept credit card", "accept debit card",
            "contactless", "card accepted", "card machine"
        ]
        
        negative_indicators = [
            "not organic", "non-organic", "no organic", "don't accept cashless",
            "no cashless", "cash only", "no card", "no cards accepted", 
            "cannot accept card", "do not accept card"
        ]
        
        # Special cases for each field
        if field_name.lower() == "organic":
            if any(ind in text_lower for ind in positive_indicators if "organic" in ind):
                return "Yes"
            if any(ind in text_lower for ind in negative_indicators if "organic" in ind):
                return "No"
        elif field_name.lower() == "cashless":
            if any(ind in text_lower for ind in positive_indicators if "card" in ind or "cashless" in ind or "contactless" in ind):
                return "Yes"
            if any(ind in text_lower for ind in negative_indicators if "card" in ind or "cashless" in ind or "cash only" in ind):
                return "No"
                
        return "Unknown"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            print("Loading website...")
            await page.goto('https://hedgeveg.je/', timeout=60000)
            
            # Accept cookies if the dialog appears
            try:
                await page.wait_for_selector('button#onetrust-accept-btn-handler', timeout=5000)
                await page.click('button#onetrust-accept-btn-handler')
                print("Accepted cookies")
            except Exception as e:
                print(f"No cookie consent dialog found or error: {e}")
            
            # Wait for the page to load properly
            await page.wait_for_load_state('networkidle')
            
            # Try to click continue button if it appears
            try:
                continue_button = await page.wait_for_selector('button:has-text("Continue")', timeout=5000)
                if continue_button:
                    await continue_button.click()
                    print("Clicked Continue button")
                    await page.wait_for_load_state('networkidle')
            except Exception as e:
                print(f"No Continue button found or error: {e}")
            
            # Wait for vendor cards to appear
            print("Looking for vendor cards...")
            
            # Try to find vendor names using h5 elements (these are usually the headers in vendor cards)
            vendor_names = await page.query_selector_all('h5')
            print(f"Found {len(vendor_names)} potential vendors")
            
            # Extract all text content from the page for context analysis
            page_content = await page.content()
            
            # Initialize results
            vendors = []
            found_parishes = set()
            found_produce_types = set()
            
            # Process each vendor
            for i, name_element in enumerate(vendor_names):
                try:
                    # Get the name text
                    name_text = await name_element.inner_text()
                    name = name_text.strip()
                    
                    if not name or len(name) < 3:  # Skip very short or empty names
                        continue
                    
                    # Try to get the parent card element to extract more details
                    card = None
                    try:
                        # Try different strategies to find the card container
                        card = await name_element.evaluate('el => el.closest(".card")')
                        if not card:
                            card = await name_element.evaluate('el => el.closest("div[class*=card]")')
                        if not card:
                            # Try going up a few levels
                            card = await name_element.evaluate('el => el.parentElement.parentElement.parentElement')
                    except Exception as e:
                        print(f"Could not find card for {name}: {e}")
                    
                    # Initialize vendor data
                    vendor_data = {
                        "name": name,
                        "parish": "Unknown",
                        "produce_types": [],
                        "organic": "Unknown",
                        "cashless": "Unknown",
                        "description": ""
                    }
                    
                    # If we found a card element, try to extract more details
                    if card:
                        try:
                            # Try to get all text in the card
                            card_text = await page.evaluate('''
                                card => {
                                    return Array.from(card.querySelectorAll('*'))
                                        .map(el => el.textContent)
                                        .join(' ')
                                        .replace(/\\s+/g, ' ')
                                        .trim();
                                }
                            ''', card)
                            
                            # Extract data from the card text
                            vendor_data["description"] = card_text
                            address, parish = extract_address_and_parish(card_text)
                            if address:
                                vendor_data["address"] = address
                            if parish != "Unknown":
                                vendor_data["parish"] = parish
                                found_parishes.add(parish)
                            
                            # Extract produce types
                            produce_types = extract_produce_types(card_text)
                            if produce_types:
                                vendor_data["produce_types"] = produce_types
                                found_produce_types.update(produce_types)
                            
                            # Extract organic status
                            vendor_data["organic"] = extract_yes_no_field(card_text, "organic")
                            
                            # Extract cashless payment
                            vendor_data["cashless"] = extract_yes_no_field(card_text, "cashless")
                            
                        except Exception as e:
                            print(f"Error extracting details for {name}: {e}")
                    
                    # Try to match the parish from the name as a fallback
                    if vendor_data["parish"] == "Unknown":
                        parish = match_parish(name)
                        if parish != "Unknown":
                            vendor_data["parish"] = parish
                            found_parishes.add(parish)
                    
                    # Add vendor to results
                    vendors.append(vendor_data)
                    
                except Exception as e:
                    print(f"Error processing vendor {i}: {e}")
            
            print(f"Extracted {len(vendors)} vendors")
            
            # Prepare final result
            result = {
                "parishes": sorted(list(found_parishes)),
                "produce_types": sorted(list(found_produce_types)),
                "vendors": vendors
            }
            
            # Save to file
            with open('scrapers/playwright_data.json', 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"Data saved to scrapers/playwright_data.json")
            
        except Exception as e:
            print(f"Error during scraping: {e}")
        finally:
            await browser.close()
    
    return "Scraping completed"

if __name__ == "__main__":
    asyncio.run(scrape_hedgeveg()) 