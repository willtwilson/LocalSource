# HedgeVeg Data Pipeline

This directory contains the scripts and data for scraping, processing, and uploading vendor data from the HedgeVeg website to the Supabase database.

## Data Files

- `cleaned_data.json`: The cleaned data from the scraping process
- `enriched_data.json`: Data enriched with additional vendor descriptions
- `geocoded_data.json`: Data with geocoding added (latitude/longitude)
- `final_upload_data.json`: Final data ready for upload to Supabase

## Scripts

- `puppeteer_scraper.js`: Scraper using Puppeteer (JavaScript)
- `playwright_scraper.py`: Scraper using Playwright (Python)
- `playwright_enhanced_scraper.py`: Enhanced version of the Playwright scraper
- `run_all_scrapers.sh`: Script to run all scrapers and compare results
- `clean_vendor_data.py`: Script to clean and deduplicate vendor data
- `extract_vendor_descriptions.py`: Script to add descriptions from sample files
- `geocode_vendors.py`: Script to add geocoding to vendors
- `upload_to_supabase.py`: Script to upload data to Supabase
- `prepare_final_upload.py`: Script to prepare final data for upload
- `full_pipeline.sh`: Script to run the full data processing pipeline

## Pipeline Status

The data processing pipeline has been successfully completed:

1. ✅ The data has been scraped using multiple scrapers
2. ✅ The data has been cleaned and deduplicated
3. ✅ Vendor descriptions have been enriched from sample files
4. ✅ Geocoding has been added to all vendors
5. ✅ Final data has been prepared for upload

The upload to Supabase was not completed due to DNS resolution issues. The final data is ready for upload in `final_upload_data.json`.

## How to Upload to Supabase

### Option 1: Using the upload_to_supabase.py Script

```bash
python3 upload_to_supabase.py --input final_upload_data.json --url YOUR_SUPABASE_URL --key YOUR_SUPABASE_KEY
```

### Option 2: Using the Supabase Dashboard

1. Go to the Supabase dashboard
2. Select your project
3. Go to the SQL Editor
4. Create a 'vendors' table with the appropriate schema
5. Go to the Table Editor
6. Select the 'vendors' table
7. Click 'Import Data'
8. Upload the `final_upload_data.json` file

## Schema

The vendors table should have the following schema:

```sql
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    parish TEXT,
    description TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    organic BOOLEAN DEFAULT false,
    cashless_payment BOOLEAN,
    produce_types TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Statistics

- Total vendors: 91
- Parishes covered: 13
- Main produce types: Vegetables, Jersey Royals, Eggs, Fruit, Plants, Flowers

## Next Steps

1. Set up proper DNS resolution to connect to Supabase
2. Upload the final data to Supabase
3. Implement regular scraping to keep the data up to date
4. Develop a user interface to display the vendor data on a map 