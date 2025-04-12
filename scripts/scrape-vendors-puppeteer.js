import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main function to scrape the hedgeveg.je website using Puppeteer
async function scrapeHedgeVegWithPuppeteer() {
  console.log('Starting to scrape HedgeVeg.je with Puppeteer...');
  
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the homepage
    console.log('Navigating to HedgeVeg.je...');
    await page.goto('https://hedgeveg.je', { waitUntil: 'networkidle2' });
    
    // Look for the list view or navigation to the list view
    console.log('Looking for vendor list page...');
    const listLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .filter(link => {
          const text = link.textContent.toLowerCase();
          return (text.includes('list') || text.includes('vendors') || text.includes('producers')) && link.href;
        })
        .map(link => link.href);
    });
    
    let listPageUrl = '';
    if (listLinks.length > 0) {
      listPageUrl = listLinks[0];
      console.log(`Found potential list page link: ${listPageUrl}`);
    } else {
      console.log('No list page URL found. Using homepage...');
      listPageUrl = 'https://hedgeveg.je';
    }
    
    // Navigate to the list page if different from homepage
    if (listPageUrl !== 'https://hedgeveg.je') {
      console.log(`Navigating to vendor list page: ${listPageUrl}`);
      await page.goto(listPageUrl, { waitUntil: 'networkidle2' });
    }
    
    // Wait for potential dynamic content to load
    await page.waitForTimeout(2000);
    
    // Extract vendors 
    console.log('Extracting vendor information...');
    const vendors = await page.evaluate(() => {
      // Helper function to guess vendor type based on text
      function guessVendorType(text) {
        text = text.toLowerCase();
        
        if (text.includes('farm') || text.includes('produce') || text.includes('vegetable') || text.includes('fruit')) {
          return 'Farm Shop';
        } else if (text.includes('fish') || text.includes('seafood')) {
          return 'Fishmonger';
        } else if (text.includes('bread') || text.includes('bakery') || text.includes('pastry')) {
          return 'Bakery';
        } else if (text.includes('meat') || text.includes('butcher')) {
          return 'Butcher';
        } else if (text.includes('grocery') || text.includes('store') || text.includes('shop')) {
          return 'Grocery Store';
        } else {
          return 'Other';
        }
      }
      
      const vendors = [];
      
      // Strategy 1: Look for cards or list items with vendor information
      const vendorElements = document.querySelectorAll('.vendor-card, .vendor-item, .producer-card, .producer-item, .card, .item');
      if (vendorElements.length > 0) {
        vendorElements.forEach(element => {
          const nameElement = element.querySelector('h1, h2, h3, h4, h5, h6, .title, .name');
          if (nameElement) {
            const name = nameElement.textContent.trim();
            const description = element.querySelector('p, .description')?.textContent.trim() || '';
            
            // Try to find address information
            let address = '';
            element.querySelectorAll('p, .address, .location').forEach(el => {
              const text = el.textContent.trim();
              if (text.toLowerCase().includes('road') || 
                  text.toLowerCase().includes('lane') || 
                  text.toLowerCase().includes('street') || 
                  text.toLowerCase().includes('avenue') || 
                  text.toLowerCase().includes('jersey') || 
                  text.toLowerCase().includes('jsy')) {
                address = text;
              }
            });
            
            vendors.push({
              name,
              description,
              address,
              vendorType: guessVendorType(element.textContent)
            });
          }
        });
      }
      
      // Strategy 2: Look for elements with headings
      if (vendors.length === 0) {
        const elements = document.querySelectorAll('div, li');
        elements.forEach(element => {
          const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
          if (heading) {
            const name = heading.textContent.trim();
            if (name && name.length > 2 && !vendors.some(v => v.name === name)) {
              const description = element.querySelector('p')?.textContent.trim() || '';
              
              vendors.push({
                name,
                description,
                address: '',
                vendorType: guessVendorType(element.textContent)
              });
            }
          }
        });
      }
      
      // Strategy 3: Look for tables
      if (vendors.length === 0) {
        const tableRows = document.querySelectorAll('table tr');
        tableRows.forEach((row, index) => {
          if (index > 0) { // Skip header row
            const cells = row.querySelectorAll('td');
            if (cells.length >= 1) {
              const name = cells[0].textContent.trim();
              const description = cells.length >= 2 ? cells[1].textContent.trim() : '';
              const address = cells.length >= 3 ? cells[2].textContent.trim() : '';
              
              if (name && !vendors.some(v => v.name === name)) {
                vendors.push({
                  name,
                  description,
                  address,
                  vendorType: guessVendorType(row.textContent)
                });
              }
            }
          }
        });
      }
      
      // Strategy 4: More aggressive approach
      if (vendors.length === 0) {
        const textBlocks = [];
        document.querySelectorAll('p, div, span, li').forEach(el => {
          const text = el.textContent.trim();
          if (text && text.length > 5 && text.length < 100) {
            textBlocks.push(text);
          }
        });
        
        // Try to identify vendor names from text blocks
        textBlocks.forEach(block => {
          // Look for patterns like capitalized words that might be business names
          if (/^[A-Z]/.test(block) && !vendors.some(v => v.name === block)) {
            vendors.push({
              name: block,
              description: '',
              address: '',
              vendorType: guessVendorType(block)
            });
          }
        });
      }
      
      return vendors;
    });
    
    console.log(`Found ${vendors.length} vendors using Puppeteer`);
    
    // Save the vendors to a JSON file
    const vendorsData = {
      source: 'HedgeVeg.je (Puppeteer)',
      scrapedAt: new Date().toISOString(),
      vendors: vendors
    };
    
    const outputDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'hedgeveg-vendors-puppeteer.json');
    fs.writeFileSync(outputPath, JSON.stringify(vendorsData, null, 2));
    
    console.log(`Vendor data saved to ${outputPath}`);
    
    // Capture a screenshot for debugging
    await page.screenshot({ path: path.join(outputDir, 'hedgeveg-screenshot.png') });
    console.log('Saved a screenshot for verification');
    
    return vendors;
  } catch (error) {
    console.error('Error scraping with Puppeteer:', error);
    return [];
  } finally {
    await browser.close();
  }
}

// Execute the Puppeteer scraper
scrapeHedgeVegWithPuppeteer().then(vendors => {
  console.log('Puppeteer scraping completed successfully');
  
  if (vendors.length === 0) {
    console.log('Warning: No vendors were found using Puppeteer. The website structure might have changed.');
  } else {
    console.log('Vendor List (Puppeteer):');
    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ${vendor.name} (${vendor.vendorType})`);
    });
  }
}); 