import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to merge vendors from multiple sources and remove duplicates
function mergeVendors() {
  const dataDir = path.join(__dirname, '../data');
  let allVendors = [];
  
  try {
    // Try to read both JSON files
    const cheerioParsedData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hedgeveg-vendors.json'), 'utf8'));
    const puppeteerParsedData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hedgeveg-vendors-puppeteer.json'), 'utf8'));
    
    allVendors = [...cheerioParsedData.vendors];
    
    // Add unique vendors from Puppeteer scraping
    for (const puppeteerVendor of puppeteerParsedData.vendors) {
      const isDuplicate = allVendors.some(vendor => 
        vendor.name.toLowerCase() === puppeteerVendor.name.toLowerCase()
      );
      
      if (!isDuplicate) {
        allVendors.push(puppeteerVendor);
      }
    }
    
    console.log(`Merged ${cheerioParsedData.vendors.length} vendors from Cheerio and ${puppeteerParsedData.vendors.length} vendors from Puppeteer`);
    console.log(`Total unique vendors: ${allVendors.length}`);
    
  } catch (error) {
    console.error('Error merging vendor data:', error);
    // Try to load whatever data is available
    try {
      if (fs.existsSync(path.join(dataDir, 'hedgeveg-vendors.json'))) {
        const cheerioData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hedgeveg-vendors.json'), 'utf8'));
        allVendors = cheerioData.vendors;
        console.log(`Loaded ${allVendors.length} vendors from Cheerio scraping only`);
      } else if (fs.existsSync(path.join(dataDir, 'hedgeveg-vendors-puppeteer.json'))) {
        const puppeteerData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hedgeveg-vendors-puppeteer.json'), 'utf8'));
        allVendors = puppeteerData.vendors;
        console.log(`Loaded ${allVendors.length} vendors from Puppeteer scraping only`);
      }
    } catch (innerError) {
      console.error('Error loading any vendor data:', innerError);
    }
  }
  
  // Clean up and standardize the data
  const cleanedVendors = allVendors.map(vendor => ({
    name: vendor.name.trim(),
    description: vendor.description ? vendor.description.trim() : '',
    address: vendor.address ? vendor.address.trim() : '',
    phone: '',  // No phone data from scraping
    website: '', // No website data from scraping
    vendor_type_id: null, // Will be populated later
    status: 'unverified', // Set all imported vendors as unverified
    source: 'hedgeveg.je'
  }));
  
  return cleanedVendors.filter(vendor => vendor.name && vendor.name.length > 1);
}

// Main function to import vendors to Supabase
async function importVendors() {
  try {
    console.log('Starting vendor import process...');
    
    // Get merged vendor data
    const vendors = mergeVendors();
    
    if (vendors.length === 0) {
      console.error('No vendor data to import');
      return;
    }
    
    // Get vendor types from the database
    const { data: vendorTypes, error: vendorTypesError } = await supabase
      .from('vendor_types')
      .select('id, name');
    
    if (vendorTypesError) {
      throw new Error(`Error fetching vendor types: ${vendorTypesError.message}`);
    }
    
    // Map the scraped vendor types to database vendor types
    const vendorTypesMap = {
      'Farm Shop': vendorTypes.find(vt => vt.name.toLowerCase().includes('farm'))?.id,
      'Fishmonger': vendorTypes.find(vt => vt.name.toLowerCase().includes('fish'))?.id,
      'Bakery': vendorTypes.find(vt => vt.name.toLowerCase().includes('bakery'))?.id,
      'Butcher': vendorTypes.find(vt => vt.name.toLowerCase().includes('butcher'))?.id,
      'Grocery Store': vendorTypes.find(vt => vt.name.toLowerCase().includes('grocery'))?.id,
      'Other': vendorTypes.find(vt => vt.name.toLowerCase().includes('other'))?.id
    };
    
    const defaultVendorTypeId = vendorTypes[0]?.id;
    
    // Assign vendor type IDs
    for (const vendor of vendors) {
      vendor.vendor_type_id = vendorTypesMap[vendor.vendorType] || defaultVendorTypeId;
      delete vendor.vendorType; // Remove the text version as we now have the ID
    }
    
    // Check for existing vendors to avoid duplicates
    const { data: existingVendors, error: existingVendorsError } = await supabase
      .from('vendors')
      .select('name');
    
    if (existingVendorsError) {
      throw new Error(`Error fetching existing vendors: ${existingVendorsError.message}`);
    }
    
    const existingVendorNames = existingVendors.map(v => v.name.toLowerCase());
    
    // Filter out vendors that already exist in the database
    const newVendors = vendors.filter(vendor => 
      !existingVendorNames.includes(vendor.name.toLowerCase())
    );
    
    console.log(`Found ${newVendors.length} new vendors to import`);
    
    if (newVendors.length === 0) {
      console.log('All vendors already exist in the database. No import needed.');
      return;
    }
    
    // Create a generic system user for these imported vendors if it doesn't exist
    let systemUserId;
    
    // Check if system user exists
    const { data: systemUser, error: systemUserError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'system@localsource.je')
      .single();
    
    if (systemUserError && systemUserError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw new Error(`Error checking for system user: ${systemUserError.message}`);
    }
    
    if (systemUser) {
      systemUserId = systemUser.id;
    } else {
      // Create the system user
      const { data: newSystemUser, error: newSystemUserError } = await supabase.auth.admin.createUser({
        email: 'system@localsource.je',
        password: Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2),
        email_confirm: true,
        user_metadata: { name: 'System Import', source: 'data_import' }
      });
      
      if (newSystemUserError) {
        throw new Error(`Error creating system user: ${newSystemUserError.message}`);
      }
      
      systemUserId = newSystemUser.id;
    }
    
    // Insert vendors in batches to avoid hitting any limits
    const batchSize = 50;
    for (let i = 0; i < newVendors.length; i += batchSize) {
      const batch = newVendors.slice(i, i + batchSize).map(vendor => ({
        ...vendor,
        owner_user_id: systemUserId
      }));
      
      const { data, error } = await supabase
        .from('vendors')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting batch starting at index ${i}:`, error);
      } else {
        console.log(`Successfully inserted batch starting at index ${i} (${batch.length} vendors)`);
      }
    }
    
    console.log('Vendor import completed successfully!');
    
  } catch (error) {
    console.error('Error in importVendors:', error);
  }
}

// Execute the import
importVendors().then(() => {
  console.log('Import script finished');
}); 