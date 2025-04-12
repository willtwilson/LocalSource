import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function scrapeHedgeveg() {
  // Define valid Jersey parishes - without periods for consistent matching
  const validParishes = [
    'St Helier', 'St Saviour', 'St Clement', 'Grouville', 'St Martin',
    'Trinity', 'St John', 'St Mary', 'St Ouen', 'St Peter', 'St Brelade', 'St Lawrence'
  ];

  // Define valid produce types for filtering
  const validProduceTypes = [
    'Vegetables', 'Fruit', 'Eggs', 'Honey', 'Flowers', 'Plants', 'Meat', 'Dairy', 'Herbs', 'Jams',
    'Preserves', 'Cider', 'Oils', 'Bread', 'Cakes', 'Seafood', 'Baked Goods', 'Royals', 'Jerseys', 'International Kidneys'
  ];

  console.log('Starting Hedgeveg scraper...');
  
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots', { recursive: true });
  }
  
  // Launch browser with no-sandbox for Docker compatibility
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    console.log('Browser launched');
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the website
    await page.goto('https://hedgeveg.je/', { waitUntil: 'networkidle2' });
    console.log('Navigated to hedgeveg.je');
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'screenshots/initial_page.png' });
    console.log('Took initial screenshot');
    
    // Accept cookies if the dialog appears
    try {
      const acceptCookiesButton = await page.$('.cc-btn.cc-allow, button:contains("Continue")');
      if (acceptCookiesButton) {
        await acceptCookiesButton.click();
        console.log('Accepted cookies/consent');
        await page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log('Cookie consent not found or already accepted');
    }
    
    // Click on the "Continue" button to enter the site
    try {
      await page.waitForSelector('a.et_pb_button, a:contains("Continue")', { timeout: 5000 });
      await page.click('a.et_pb_button, a:contains("Continue")');
      console.log('Clicked Continue button');
      
      // Wait for page to load
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'screenshots/after_continue.png' });
    } catch (error) {
      console.log('Error clicking Continue button:', error.message);
    }

    // Click on the "Open List View" button
    try {
      await page.waitForSelector('a:contains("Open List View"), button:contains("Open List View"), .et_pb_button_1', { timeout: 5000 });
      await page.click('a:contains("Open List View"), button:contains("Open List View"), .et_pb_button_1');
      console.log('Clicked Open List View button');
      
      // Wait for page to load
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'screenshots/list_view.png' });
    } catch (error) {
      console.log('Error clicking Open List View button:', error.message);
    }
    
    // Analyze page structure to better understand the DOM
    const pageStructure = await page.evaluate(() => {
      const structure = {
        title: document.title,
        bodyClasses: Array.from(document.body.classList),
        divCount: document.querySelectorAll('div').length,
        h1Count: document.querySelectorAll('h1').length,
        h2Count: document.querySelectorAll('h2').length,
        h3Count: document.querySelectorAll('h3').length,
        h4Count: document.querySelectorAll('h4').length,
        h5Count: document.querySelectorAll('h5').length,
        potentialCards: [
          document.querySelectorAll('.vendor-card').length,
          document.querySelectorAll('.card').length,
          document.querySelectorAll('.item').length,
          document.querySelectorAll('article').length,
          document.querySelectorAll('.et_pb_portfolio_item').length,
          document.querySelectorAll('.FilteredList_itemWrapper__JvT3h').length
        ],
        sampleHeaders: Array.from(document.querySelectorAll('h3, h4, h5')).slice(0, 10).map(h => ({
          text: h.textContent.trim(),
          tag: h.tagName,
          classes: Array.from(h.classList)
        }))
      };
      return structure;
    });
    
    console.log('Analyzing page structure...');
    console.log('Page structure analysis:', JSON.stringify(pageStructure, null, 2));
    
    // Wait for vendor cards to load - using a more flexible selector based on page analysis
    let vendorCardSelector = '.vendor-card, .et_pb_portfolio_item, article';
    
    // Dynamically adjust selector based on page analysis
    if (pageStructure.potentialCards[3] > 0) {
      // If we have articles, they're likely our cards
      vendorCardSelector = 'article';
    } else if (pageStructure.potentialCards[4] > 0) {
      // If we have portfolio items, use those
      vendorCardSelector = '.et_pb_portfolio_item';
    }
    
    try {
      await page.waitForSelector(vendorCardSelector, { timeout: 10000 });
      await page.screenshot({ path: 'screenshots/vendor_cards.png' });
      console.log('Vendor cards loaded');
    } catch (error) {
      console.log('Error waiting for vendor cards:', error.message);
      
      // Take a screenshot of what's visible
      await page.screenshot({ path: 'screenshots/cards_not_found.png' });
      
      // Try to get page HTML for debugging
      const pageHtml = await page.content();
      fs.writeFileSync('screenshots/page_html.txt', pageHtml);
      console.log('Saved page HTML for debugging');
    }
    
    // Extract vendors, produce types, and parishes
    const { vendors, produce_types, parishes } = await page.evaluate((validParishes, validProduceTypes, vendorCardSelector) => {
      // Helper function to clean text
      const cleanText = (text) => text ? text.trim().replace(/\s+/g, ' ') : '';
      
      // Helper function to normalize parish names by removing periods
      const normalizeParish = (parish) => parish.replace(/\./g, '');
      
      // Helper function to extract boolean values (Yes/No)
      const extractBooleanValue = (text, defaultValue = 'Unknown') => {
        if (!text) return defaultValue;
        
        const cleanedText = text.toLowerCase().trim();
        if (cleanedText.includes('yes') || cleanedText === 'y' || cleanedText === 'true') {
          return 'Yes';
        } else if (cleanedText.includes('no') || cleanedText === 'n' || cleanedText === 'false') {
          return 'No';
        }
        return defaultValue;
      };
      
      const vendors = [];
      const produceTypesSet = new Set();
      const parishesSet = new Set();
      
      // Try to find vendor cards with various selectors
      const vendorCards = document.querySelectorAll(vendorCardSelector);
      console.log(`Found ${vendorCards.length} vendor cards`);
      
      // If no vendor cards found with primary selector, try alternative selectors
      const alternativeSelectors = [
        '.FilteredList_itemWrapper__JvT3h',
        '.card, .vendor, [class*="vendor-card"]',
        '.et_pb_portfolio_item',
        'article, .post'
      ];
      
      let cards = vendorCards.length > 0 ? vendorCards : [];
      
      // Try alternative selectors if primary selector didn't find anything
      if (cards.length === 0) {
        for (const selector of alternativeSelectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            cards = elements;
            console.log(`Found ${cards.length} cards using selector: ${selector}`);
            break;
          }
        }
      }
      
      console.log(`Processing ${cards.length} cards with class names: ${Array.from(cards).map(card => Array.from(card.classList)).flat().join(', ')}`);
      
      // Add deep inspection of first 2 cards
      if (cards.length > 0) {
        console.log(`Inspecting first 2 cards structure:`);
        for (let i = 0; i < Math.min(2, cards.length); i++) {
          const card = cards[i];
          console.log(`Card ${i+1}:`);
          console.log(`- Tag name: ${card.tagName}`);
          console.log(`- Class list: ${Array.from(card.classList)}`);
          console.log(`- Children count: ${card.childNodes.length}`);
          console.log(`- Inner text preview: ${card.innerText?.slice(0, 150)}...`);
          
          // Find all elements with text content
          const textElements = Array.from(card.querySelectorAll('*')).filter(el => el.textContent?.trim());
          console.log(`- Elements with text: ${textElements.length}`);
          console.log(`- First 5 text elements: ${textElements.slice(0, 5).map(el => `${el.tagName}:${el.textContent?.trim().slice(0, 30)}...`).join(' | ')}`);
        }
      }
      
      // Process found cards
      cards.forEach(card => {
        try {
          // Try multiple selectors for vendor name
          const nameSelectors = [
            'h2, h3, h4, h5, .title, .name, [class*="title"], [class*="name"]',
            '.et_pb_module_header',
            'header h1, header h2, header h3'
          ];
          
          let name = 'Unknown';
          for (const selector of nameSelectors) {
            const element = card.querySelector(selector);
            if (element) {
              name = cleanText(element.textContent);
              if (name && name !== 'Unknown') break;
            }
          }
          
          // Extract content from description or content area
          const contentSelectors = [
            '.description, .content, .post-content, [class*="description"], [class*="content"]',
            'p, .details, [class*="details"]',
            'div.et_pb_post_content'
          ];
          
          let detailsText = '';
          for (const selector of contentSelectors) {
            const elements = card.querySelectorAll(selector);
            if (elements.length > 0) {
              elements.forEach(el => {
                detailsText += ' ' + cleanText(el.textContent);
              });
              break;
            }
          }
          
          // Try direct property extraction
          const labelSelectors = card.querySelectorAll('strong, b, .label, .property-label');
          const propertyMap = {};
          
          labelSelectors.forEach(label => {
            const labelText = cleanText(label.textContent);
            if (labelText.endsWith(':')) {
              const nextSibling = label.nextSibling;
              if (nextSibling && nextSibling.textContent) {
                const value = cleanText(nextSibling.textContent);
                propertyMap[labelText.replace(':', '').toLowerCase()] = value;
              }
            }
          });
          
          console.log(`Property map for ${name}:`, JSON.stringify(propertyMap));
          
          // Extract parish
          let parish = 'Unknown';
          
          // First try direct property extraction
          if (propertyMap['parish']) {
            const extractedParish = normalizeParish(propertyMap['parish']);
            
            // Find matching valid parish
            for (const validParish of validParishes) {
              if (normalizeParish(extractedParish).includes(normalizeParish(validParish))) {
                parish = validParish;
                parishesSet.add(validParish);
                break;
              }
            }
          }
          
          // If not found, check for parish in designated field
          if (parish === 'Unknown') {
            const parishMatch = detailsText.match(/Parish:?\s*([^,\n.]+)/i);
            if (parishMatch && parishMatch[1]) {
              const extractedParish = cleanText(parishMatch[1]);
              
              // Find matching valid parish (ignoring periods)
              for (const validParish of validParishes) {
                if (normalizeParish(extractedParish).includes(normalizeParish(validParish)) || 
                    normalizeParish(name).includes(normalizeParish(validParish))) {
                  parish = validParish;
                  parishesSet.add(validParish);
                  break;
                }
              }
            }
          }
          
          // Check name for parish as fallback
          if (parish === 'Unknown') {
            for (const validParish of validParishes) {
              if (normalizeParish(name).includes(normalizeParish(validParish))) {
                parish = validParish;
                parishesSet.add(validParish);
                break;
              }
            }
          }
          
          console.log(`Parish extraction result for ${name}: ${parish}`);
          
          // Extract organic status
          let organic = 'Unknown';
          
          // First try from propertyMap
          if (propertyMap['organic']) {
            organic = extractBooleanValue(propertyMap['organic']);
          } 
          
          // If still unknown, try regex
          if (organic === 'Unknown') {
            const organicMatch = detailsText.match(/Organic:?\s*([^,\n.]+)/i);
            if (organicMatch && organicMatch[1]) {
              organic = extractBooleanValue(cleanText(organicMatch[1]));
            }
          }
          
          // Look for specific organic labels as fallback
          if (organic === 'Unknown') {
            const organicLabels = card.querySelectorAll('.organic, .is-organic');
            if (organicLabels.length > 0) {
              organic = 'Yes';
            } else {
              // Default to No if we couldn't determine (from examples, most seem to be No)
              organic = 'No';
            }
          }
          
          console.log(`Organic extraction result for ${name}: ${organic}`);
          
          // Extract cashless payment
          let cashless_payment = 'Unknown';
          
          // First try from propertyMap
          if (propertyMap['cashless payment']) {
            cashless_payment = extractBooleanValue(propertyMap['cashless payment']);
          }
          
          // If still unknown, try regex
          if (cashless_payment === 'Unknown') {
            const cashlessMatch = detailsText.match(/Cashless\s*payment:?\s*([^,\n.]+)/i);
            if (cashlessMatch && cashlessMatch[1]) {
              cashless_payment = extractBooleanValue(cleanText(cashlessMatch[1]));
            }
          }
          
          // Look for payment icons as fallback
          if (cashless_payment === 'Unknown') {
            const paymentIcons = card.querySelectorAll('.payment-icon, .cashless, .accepts-card');
            if (paymentIcons.length > 0) {
              cashless_payment = 'Yes';
            } else {
              // Based on examples, default to Yes as that seems common
              cashless_payment = 'Yes';
            }
          }
          
          console.log(`Cashless payment extraction result for ${name}: ${cashless_payment}`);
          
          // Extract description (text between cashless payment and produce sold)
          let description = '';
          
          // Method 1: Try using regex to extract the text between structured sections
          const descriptionRegex = /Cashless payment:?\s*(?:Yes|No)\s*(.*?)(?:Produce Sold:|Last Updated)/is;
          const descMatch = detailsText.match(descriptionRegex);
          if (descMatch && descMatch[1]) {
            description = cleanText(descMatch[1]);
          }
          
          // Method 2: If no match, try using paragraph elements
          if (!description) {
            const paragraphs = card.querySelectorAll('p');
            paragraphs.forEach(p => {
              const text = cleanText(p.textContent);
              if (!text.includes('Parish:') && 
                  !text.includes('Organic:') && 
                  !text.includes('Cashless payment:') &&
                  !text.includes('Produce Sold:') &&
                  !text.includes('Last Updated:')) {
                description += ' ' + text;
              }
            });
            description = description.trim();
          }
          
          // Extract produce types - look for specific section or individual types
          const produceTypes = [];
          
          // Method 1: Look for produce icons/images
          const produceIcons = card.querySelectorAll('img[alt*="produce"], .produce-icon, .produce-type');
          produceIcons.forEach(icon => {
            const alt = icon.getAttribute('alt') || '';
            validProduceTypes.forEach(type => {
              if (alt.toLowerCase().includes(type.toLowerCase())) {
                produceTypes.push(type);
                produceTypesSet.add(type);
              }
            });
          });
          
          // Method 2: Try to find a produce section
          if (produceTypes.length === 0) {
            const produceSection = detailsText.match(/Produce Sold:([^]*)(?:Last Updated|$)/i);
            
            if (produceSection && produceSection[1]) {
              const producesText = cleanText(produceSection[1]);
              
              // Check for each valid produce type
              validProduceTypes.forEach(produceType => {
                if (producesText.toLowerCase().includes(produceType.toLowerCase())) {
                  produceTypes.push(produceType);
                  produceTypesSet.add(produceType);
                }
              });
            }
          }
          
          // Method 3: Look for baked goods specifically (common in the examples)
          if (produceTypes.length === 0 && (
              detailsText.toLowerCase().includes('cake') || 
              detailsText.toLowerCase().includes('bake') ||
              name.toLowerCase().includes('cake') ||
              name.toLowerCase().includes('bake')
          )) {
            produceTypes.push('Baked Goods');
            produceTypesSet.add('Baked Goods');
          }
          
          // Extract last updated date
          let lastUpdated = 'Unknown';
          const dateMatch = detailsText.match(/Last [Uu]pdated:?\s*([^,\n.]+)/i);
          if (dateMatch && dateMatch[1]) {
            lastUpdated = cleanText(dateMatch[1]);
          }
          
          // Extract location coordinates if available
          let latitude = null;
          let longitude = null;
          
          // Look for data attributes or hidden fields with coordinates
          const coordsElement = card.querySelector('[data-lat], [data-latitude], [data-lng], [data-longitude]');
          if (coordsElement) {
            latitude = coordsElement.getAttribute('data-lat') || coordsElement.getAttribute('data-latitude');
            longitude = coordsElement.getAttribute('data-lng') || coordsElement.getAttribute('data-longitude');
          }
          
          // Add vendor to results
          vendors.push({
            name,
            parish,
            organic,
            cashless_payment,
            description,
            produce_types: produceTypes,
            last_updated: lastUpdated,
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
            raw_details: detailsText
          });
          
          console.log(`Processing card for vendor: ${name}`);
          
        } catch (error) {
          console.log('Error processing vendor card:', error);
        }
      });
      
      return {
        vendors,
        produce_types: [...produceTypesSet],
        parishes: [...parishesSet]
      };
    }, validParishes, validProduceTypes, vendorCardSelector);
    
    console.log(`Extracted ${vendors.length} vendors, ${produce_types.length} produce types, and ${parishes.length} parishes`);
    
    // Take a screenshot showing what the page looks like at extraction time
    await page.screenshot({ path: 'screenshots/extraction_complete.png', fullPage: true });
    
    // Save data to JSON file
    const data = { 
      vendors, 
      produce_types, 
      parishes,
      _metadata: {
        scraped_at: new Date().toISOString(),
        vendor_count: vendors.length,
        produce_type_count: produce_types.length,
        parish_count: parishes.length
      }
    };
    
    fs.writeFileSync('scrapers/puppeteer_data.json', JSON.stringify(data, null, 2));
    console.log('Data saved to puppeteer_data.json');
    
  } catch (error) {
    console.error('Scraper error:', error);
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
}

// Run the scraper
scrapeHedgeveg().catch(console.error);
