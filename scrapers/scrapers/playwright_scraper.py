import asyncio
import json
import os
from playwright.async_api import async_playwright

async def scrape_hedgeveg():
    vendors = []
    produce_types = []
    parishes = []
    
    print("Starting Playwright scraper...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Navigate to the website
        await page.goto('https://hedgeveg.je/')
        print("Page loaded")
        
        # Accept any cookie consent if present
        try:
            continue_button = await page.wait_for_selector('button:has-text("Continue")', timeout=5000)
            if continue_button:
                await continue_button.click()
                print("Clicked continue button")
        except Exception as e:
            print(f"No continue button found or error: {e}")
        
        # Extract produce types
        produce_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
        for element in produce_elements:
            produce_name = await element.inner_text()
            if produce_name not in ["All types", ""]:
                produce_types.append(produce_name.strip())
        
        # Extract parishes
        parish_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
        parish_found = False
        for element in parish_elements:
            parish_name = await element.inner_text()
            if parish_found and parish_name not in ["All Parishes", ""]:
                parishes.append(parish_name.strip())
            if parish_name == "All Parishes":
                parish_found = True
        
        # Extract vendors
        # First click to open the vendor selector dropdown
        try:
            vendor_dropdown = await page.wait_for_selector('text=All Sellers', timeout=5000)
            if vendor_dropdown:
                await vendor_dropdown.click()
                print("Clicked vendor dropdown")
                
                # Get all vendor names
                vendor_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
                for element in vendor_elements:
                    vendor_name = await element.inner_text()
                    if vendor_name not in ["All Sellers", ""]:
                        vendors.append({
                            "name": vendor_name.strip(),
                            "description": "",  # We can't easily get descriptions in this basic scrape
                            "status": "unverified",
                            "latitude": None,  # We'd need to click each marker to get these
                            "longitude": None
                        })
        except Exception as e:
            print(f"Error getting vendors: {e}")
        
        await browser.close()
    
    result = {
        "vendors": vendors,
        "produce_types": produce_types,
        "parishes": parishes
    }
    
    # Determine correct output path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'playwright_data.json')
    
    # Save to file
    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)
    
    print(f"Scraped {len(vendors)} vendors, {len(produce_types)} produce types, and {len(parishes)} parishes.")
    print(f"Data saved to {output_path}")
    return result

if __name__ == "__main__":
    asyncio.run(scrape_hedgeveg())
