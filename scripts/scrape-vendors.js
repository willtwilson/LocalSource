import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main function to scrape the hedgeveg.je website
async function scrapeHedgeVeg() {
  try {
    console.log('Starting to scrape HedgeVeg.je...');
    
    // Fetch the homepage
    const response = await axios.get('https://hedgeveg.je');
    const $ = load(response.data);
    
    // Look for the list view or navigation to the list view
    let listPageUrl = '';
    $('a').each((i, element) => {
      const href = $(element).attr('href');
      const text = $(element).text().toLowerCase();
      if (
        (text.includes('list') || text.includes('vendors') || text.includes('producers')) && 
        href && 
        !href.startsWith('#')
      ) {
        listPageUrl = href.startsWith('http') ? href : `https://hedgeveg.je${href.startsWith('/') ? '' : '/'}${href}`;
        console.log(`Found potential list page link: ${listPageUrl}`);
      }
    });
    
    if (!listPageUrl) {
      console.log('No list page URL found. Trying to find vendors on the homepage...');
      listPageUrl = 'https://hedgeveg.je';
    }
    
    // Fetch the list page
    console.log(`Fetching vendor list from: ${listPageUrl}`);
    const listPageResponse = await axios.get(listPageUrl);
    const listPage$ = load(listPageResponse.data);
    
    // Extract vendors based on potential HTML patterns
    const vendors = [];
    
    // Pattern 1: Look for cards or list items with vendor information
    listPage$('.vendor-card, .vendor-item, .producer-card, .producer-item, .card, .item').each((i, element) => {
      const vendor = extractVendorInfo(listPage$, element);
      if (vendor.name) vendors.push(vendor);
    });
    
    // Pattern 2: Look for generic divs or list items that might contain vendor info
    if (vendors.length === 0) {
      listPage$('div, li').each((i, element) => {
        // Check if this element has a heading and some text that might indicate it's a vendor card
        const headings = listPage$(element).find('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) {
          const vendor = extractVendorInfo(listPage$, element);
          if (vendor.name && !vendors.some(v => v.name === vendor.name)) {
            vendors.push(vendor);
          }
        }
      });
    }
    
    // Pattern 3: Look for tables
    if (vendors.length === 0) {
      listPage$('table tr').each((i, element) => {
        // Skip header row
        if (i > 0) {
          const vendor = {
            name: listPage$(element).find('td').eq(0).text().trim(),
            description: listPage$(element).find('td').eq(1).text().trim(),
            address: listPage$(element).find('td').eq(2).text().trim(),
            vendorType: guessVendorType(listPage$(element).text()),
          };
          
          if (vendor.name && !vendors.some(v => v.name === vendor.name)) {
            vendors.push(vendor);
          }
        }
      });
    }
    
    // If we still haven't found any vendors, try a more aggressive approach
    if (vendors.length === 0) {
      console.log('No vendors found using standard patterns. Trying more aggressive extraction...');
      
      // Extract all text blocks that might be vendor names
      const textBlocks = [];
      listPage$('p, div, span, li').each((i, element) => {
        const text = listPage$(element).text().trim();
        if (text && text.length > 5 && text.length < 100) {
          textBlocks.push(text);
        }
      });
      
      // Try to identify vendor names from text blocks
      for (const block of textBlocks) {
        // Look for patterns like capitalized words that might be business names
        if (/^[A-Z]/.test(block) && !vendors.some(v => v.name === block)) {
          vendors.push({
            name: block,
            description: '',
            address: '',
            vendorType: guessVendorType(block),
          });
        }
      }
    }
    
    console.log(`Found ${vendors.length} vendors`);
    
    // Save the vendors to a JSON file
    const vendorsData = {
      source: 'HedgeVeg.je',
      scrapedAt: new Date().toISOString(),
      vendors: vendors
    };
    
    const outputDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'hedgeveg-vendors.json');
    fs.writeFileSync(outputPath, JSON.stringify(vendorsData, null, 2));
    
    console.log(`Vendor data saved to ${outputPath}`);
    
    return vendors;
  } catch (error) {
    console.error('Error scraping HedgeVeg.je:', error);
    return [];
  }
}

// Helper function to extract vendor information from an HTML element
function extractVendorInfo($, element) {
  const name = $(element).find('h1, h2, h3, h4, h5, h6, .title, .name').first().text().trim();
  const description = $(element).find('p, .description').first().text().trim();
  
  // Try to find address information
  let address = '';
  $(element).find('p, .address, .location').each((i, el) => {
    const text = $(el).text().trim();
    if (text.toLowerCase().includes('road') || 
        text.toLowerCase().includes('lane') || 
        text.toLowerCase().includes('street') || 
        text.toLowerCase().includes('avenue') || 
        text.toLowerCase().includes('jersey') || 
        text.toLowerCase().includes('jsy') || 
        /[A-Z]{2}\d+\s+\d[A-Z]{2}/.test(text)) { // Matches UK & Jersey postcodes
      address = text;
      return false; // break out of each loop
    }
  });
  
  // Guess the vendor type based on text
  const vendorType = guessVendorType($(element).text());
  
  return {
    name,
    description,
    address,
    vendorType
  };
}

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

// Execute the scraper
scrapeHedgeVeg().then(vendors => {
  console.log('Scraping completed successfully');
  
  if (vendors.length === 0) {
    console.log('Warning: No vendors were found. The website structure might have changed.');
  } else {
    console.log('Vendor List:');
    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ${vendor.name} (${vendor.vendorType})`);
    });
  }
}); 