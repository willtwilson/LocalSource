#!/bin/bash
set -e

echo "============================================"
echo "HedgeVeg Data Pipeline"
echo "Processing and uploading vendor data (using existing data)"
echo "============================================"

# Define directories and files
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCREENSHOTS_DIR="${SCRIPT_DIR}/screenshots"
ENHANCED_DATA="${SCRIPT_DIR}/cleaned_data.json"  # Use existing cleaned data
ENRICHED_DATA="${SCRIPT_DIR}/enriched_data.json"
GEOCODED_DATA="${SCRIPT_DIR}/geocoded_data.json"
LOG_FILE="${SCRIPT_DIR}/pipeline_log.txt"

# Create log file
echo "Pipeline started at $(date)" > "${LOG_FILE}"

# Function to log messages
log_message() {
    echo "$1"
    echo "$(date +"%Y-%m-%d %H:%M:%S"): $1" >> "${LOG_FILE}"
}

# Check if python is installed
if ! command -v python3 &> /dev/null; then
    log_message "Error: python3 is not installed"
    exit 1
fi

# Step 1: Create screenshots directory if it doesn't exist
if [ ! -d "${SCREENSHOTS_DIR}" ]; then
    mkdir -p "${SCREENSHOTS_DIR}"
    log_message "Created screenshots directory"
fi

# Skip scraping step as we're using existing data
log_message "Using existing cleaned data from ${ENHANCED_DATA}"

# Step 2: Enhance data with known vendor descriptions
log_message "Enriching data with known vendor descriptions..."
python3 "${SCRIPT_DIR}/extract_vendor_descriptions.py" --input "${ENHANCED_DATA}" --output "${ENRICHED_DATA}" --add-examples || {
    log_message "Error: Vendor description enrichment failed"
    # Don't exit on this error, just continue with original data
    cp "${ENHANCED_DATA}" "${ENRICHED_DATA}"
    log_message "Continuing with original data"
}
log_message "Data enrichment completed"

# Step 3: Geocode the vendor data
log_message "Starting geocoding process..."
python3 "${SCRIPT_DIR}/geocode_vendors.py" --input "${ENRICHED_DATA}" --output "${GEOCODED_DATA}" || {
    log_message "Error: Geocoding process failed"
    exit 1
}
log_message "Geocoding process completed"

# Step 4: Verify the data quality
log_message "Verifying data quality..."
python3 -c "
import json
import sys

try:
    with open('${GEOCODED_DATA}', 'r') as f:
        data = json.load(f)
    
    vendors = data.get('vendors', [])
    
    if not vendors:
        print('Error: No vendors found in geocoded data')
        sys.exit(1)
    
    geocoded_count = sum(1 for v in vendors if v.get('latitude') and v.get('longitude'))
    geocoded_percentage = (geocoded_count / len(vendors)) * 100
    
    print(f'Total vendors: {len(vendors)}')
    print(f'Geocoded vendors: {geocoded_count} ({geocoded_percentage:.2f}%)')
    
    if geocoded_percentage < 50:
        print('Warning: Less than 50% of vendors have been geocoded')
        sys.exit(1)
        
    print('Data quality check passed')
    
except Exception as e:
    print(f'Error during data verification: {e}')
    sys.exit(1)
" || {
    log_message "Error: Data quality verification failed"
    exit 1
}
log_message "Data quality verification completed"

# Step 5: Upload to Supabase
read -p "Do you want to upload the data to Supabase? (y/n): " UPLOAD_CONFIRMATION
if [[ "${UPLOAD_CONFIRMATION}" == "y" ]]; then
    # Check for environment file with Supabase credentials
    ENV_FILE="${SCRIPT_DIR}/.env"
    if [ -f "${ENV_FILE}" ]; then
        log_message "Loading Supabase credentials from .env file"
        source "${ENV_FILE}"
    fi
    
    # Check if credentials are available
    if [[ -z "${SUPABASE_URL}" || -z "${SUPABASE_KEY}" ]]; then
        log_message "Error: Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_KEY in .env file or environment"
        # Prompt for credentials if not found
        read -p "Enter Supabase URL: " SUPABASE_URL
        read -p "Enter Supabase API key: " SUPABASE_KEY
    fi
    
    log_message "Starting Supabase upload..."
    python3 "${SCRIPT_DIR}/upload_to_supabase.py" --input "${GEOCODED_DATA}" --url "${SUPABASE_URL}" --key "${SUPABASE_KEY}" || {
        log_message "Error: Supabase upload failed"
        exit 1
    }
    log_message "Supabase upload completed"
else
    log_message "Supabase upload skipped by user"
fi

# Step 6: Generate summary report
log_message "Generating summary report..."
python3 -c "
import json
import sys
from datetime import datetime

try:
    with open('${GEOCODED_DATA}', 'r') as f:
        data = json.load(f)
    
    vendors = data.get('vendors', [])
    
    # Count vendors by parish
    parishes = {}
    for vendor in vendors:
        parish = vendor.get('parish', 'Unknown')
        parishes[parish] = parishes.get(parish, 0) + 1
    
    # Count produce types
    produce_types = {}
    for vendor in vendors:
        for produce in vendor.get('produce_types', []):
            produce_types[produce] = produce_types.get(produce, 0) + 1
    
    # Generate report
    print('\nHedgeVeg Data Pipeline Summary')
    print('=' * 40)
    print(f'Date: {datetime.now().strftime(\"%Y-%m-%d %H:%M:%S\")}')
    print(f'Total vendors: {len(vendors)}')
    
    print('\nVendors by Parish:')
    for parish, count in sorted(parishes.items(), key=lambda x: x[1], reverse=True):
        print(f'  - {parish}: {count}')
    
    print('\nTop 10 Produce Types:')
    top_produce = sorted(produce_types.items(), key=lambda x: x[1], reverse=True)[:10]
    for produce, count in top_produce:
        print(f'  - {produce}: {count}')
    
    geocoded_count = sum(1 for v in vendors if v.get('latitude') and v.get('longitude'))
    print(f'\nGeocoded vendors: {geocoded_count} ({(geocoded_count/len(vendors))*100:.2f}%)')
    
    # Check for original descriptions preserved
    original_desc_count = sum(1 for v in vendors if len(v.get('description', '')) > 40)
    print(f'Vendors with substantial descriptions: {original_desc_count} ({(original_desc_count/len(vendors))*100:.2f}%)')
    
    print('\nFile paths:')
    print(f'  - Original data: {\"${ENHANCED_DATA}\"}')
    print(f'  - Enriched data: {\"${ENRICHED_DATA}\"}')
    print(f'  - Geocoded data: {\"${GEOCODED_DATA}\"}')
    print(f'  - Log file: {\"${LOG_FILE}\"}')
    
    print('\nPipeline completed successfully!')
    
except Exception as e:
    print(f'Error generating summary report: {e}')
    sys.exit(1)
" || {
    log_message "Error: Summary report generation failed"
    exit 1
}

log_message "Pipeline completed successfully"

echo "Complete! See ${LOG_FILE} for details." 