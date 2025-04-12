const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeHedgeveg() {
  const vendors = [];
  const produceTypes = [];
  const parishes = [];
  
  console.log("Starting Puppeteer scraper...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to website
    await page.goto('https://hedgeveg.je/', { waitUntil: 'networkidle2' });
    console.log("Page loaded");
    
    // Accept any cookie consent
    try {
      const continueButton = await page.$('button:has-text("Continue")');
      if (continueButton) {
        await continueButton.click();
        console.log("Clicked continue button");
        // Wait for any animations
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log("No continue button found or error:", e);
    }
    
    // Extract produce types
    const produceItemsSelector = '.filterSelectItems div[class^="FilterSelect_filterItemName"]';
    await page.waitForSelector(produceItemsSelector);
    const produceElements = await page.$$(produceItemsSelector);
    
    for (const element of produceElements) {
      const produceName = await page.evaluate(el => el.textContent, element);
      if (produceName && !["All types", ""].includes(produceName.trim())) {
        produceTypes.push(produceName.trim());
      }
    }
    
    // Click on parish dropdown to load parishes
    try {
      const parishDropdown = await page.$('text=All Parishes');
      if (parishDropdown) {
        await parishDropdown.click();
        console.log("Clicked parish dropdown");
        await page.waitForTimeout(1000);
        
        // Get parishes
        const parishElements = await page.$$(produceItemsSelector);
        for (const element of parishElements) {
          const parishName = await page.evaluate(el => el.textContent, element);
          if (parishName && !["All Parishes", ""].includes(parishName.trim())) {
            parishes.push(parishName.trim());
          }
        }
        
        // Close parish dropdown by clicking elsewhere
        await page.click('body');
      }
    } catch (e) {
      console.log("Error getting parishes:", e);
    }
    
    // Extract vendors
    try {
      const vendorDropdown = await page.$('text=All Sellers');
      if (vendorDropdown) {
        await vendorDropdown.click();
        console.log("Clicked vendor dropdown");
        await page.waitForTimeout(1000);
        
        // Get vendors
        const vendorElements = await page.$$(produceItemsSelector);
        for (const element of vendorElements) {
          const vendorName = await page.evaluate(el => el.textContent, element);
          if (vendorName && !["All Sellers", ""].includes(vendorName.trim())) {
            vendors.push({
              name: vendorName.trim(),
              description: "",
              status: "unverified",
              latitude: null,
              longitude: null
            });
          }
        }
      }
    } catch (e) {
      console.log("Error getting vendors:", e);
    }
  } catch (error) {
    console.error("Scraping error:", error);
  } finally {
    await browser.close();
  }
  
  const result = {
    vendors,
    produce_types: produceTypes,
    parishes
  };
  
  // Determine correct output path
  const scriptDir = path.dirname(require.main.filename);
  const outputPath = path.join(scriptDir, 'puppeteer_data.json');
  
  // Save to file
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  
  console.log(`Scraped ${vendors.length} vendors, ${produceTypes.length} produce types, and ${parishes.length} parishes.`);
  console.log(`Data saved to ${outputPath}`);
  return result;
}

scrapeHedgeveg();
