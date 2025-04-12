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
        # Launch with no-sandbox for Docker environment
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
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
        try:
            produce_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
            for element in produce_elements:
                produce_name = await element.inner_text()
                if produce_name not in ["All types", ""]:
                    produce_types.append(produce_name.strip())
            print(f"Found {len(produce_types)} produce types")
        except Exception as e:
            print(f"Error getting produce types: {e}")
        
        # Extract parishes
        try:
            parish_dropdown = await page.query_selector('text=All Parishes')
            if parish_dropdown:
                await parish_dropdown.click()
                print("Clicked parish dropdown")
                await page.wait_for_timeout(1000)
                
                parish_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
                for element in parish_elements:
                    parish_name = await element.inner_text()
                    if parish_name not in ["All Parishes", ""]:
                        parishes.append(parish_name.strip())
                print(f"Found {len(parishes)} parishes")
                
                # Close dropdown by clicking elsewhere
                await page.click('body')
            else:
                print("Parish dropdown not found")
        except Exception as e:
            print(f"Error getting parishes: {e}")
        
        # Extract vendors
        try:
            vendor_dropdown = await page.query_selector('text=All Sellers')
            if vendor_dropdown:
                await vendor_dropdown.click()
                print("Clicked vendor dropdown")
                await page.wait_for_timeout(1000)
                
                vendor_elements = await page.query_selector_all('.filterSelectItems div[class^="FilterSelect_filterItemName"]')
                for element in vendor_elements:
                    vendor_name = await element.inner_text()
                    if vendor_name not in ["All Sellers", ""]:
                        vendors.append({
                            "name": vendor_name.strip(),
                            "description": "",
                            "status": "unverified",
                            "latitude": None,
                            "longitude": None
                        })
                print(f"Found {len(vendors)} vendors")
            else:
                print("Vendor dropdown not found")
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