#!/bin/bash

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== Jersey HedgeVeg Data Pipeline - Enhanced Version =====${NC}"
echo "Starting data processing pipeline with enhanced location accuracy..."

# Create directories if they don't exist
mkdir -p screenshots
mkdir -p data

# Step 1: Run the extract_coordinates.py script to get initial data
echo -e "\n${YELLOW}Step 1: Extracting initial coordinates data...${NC}"
python scrapers/extract_coordinates.py

# Step 2: Improve coordinates with parish-based approximation
echo -e "\n${YELLOW}Step 2: Improving coordinates with parish-based data...${NC}"
python scrapers/improve_coordinates.py --input scrapers/extracted_coordinates.json --output scrapers/improved_coordinates.json

# Step 3: Enhance coordinates with researched vendor locations
echo -e "\n${YELLOW}Step 3: Enhancing coordinates with researched vendor locations...${NC}"
python scrapers/research_vendor_locations.py --input scrapers/improved_coordinates.json --output scrapers/researched_locations.json

# Step 4: Clean and prepare data for upload
echo -e "\n${YELLOW}Step 4: Cleaning and preparing data for upload...${NC}"
python scrapers/prepare_final_upload.py --input scrapers/researched_locations.json --output scrapers/final_upload_data.json

# Step 5: Upload data to Supabase (if environment variables are set)
echo -e "\n${YELLOW}Step 5: Uploading data to Supabase (if configured)...${NC}"
if [ -f scrapers/.env ]; then
    echo "Found .env file, checking for Supabase configuration..."
    if grep -q "SUPABASE_URL" scrapers/.env && grep -q "SUPABASE_KEY" scrapers/.env; then
        echo "Supabase configuration found. Proceeding with upload..."
        python scrapers/upload_to_supabase.py --input scrapers/final_upload_data.json
    else
        echo -e "${RED}Supabase configuration not found in .env file. Skipping upload.${NC}"
        echo "To enable upload, add SUPABASE_URL and SUPABASE_KEY to scrapers/.env"
    fi
else
    echo -e "${RED}No .env file found in scrapers directory. Skipping upload.${NC}"
    echo "To enable upload, create a scrapers/.env file with SUPABASE_URL and SUPABASE_KEY"
fi

# Step 6: Generate accuracy report
echo -e "\n${YELLOW}Step 6: Generating accuracy report...${NC}"
python - << EOF
import json
import os
from datetime import datetime

def load_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading {file_path}: {e}")
        return None

def generate_report():
    # Load the datasets
    files = [
        ('Initial extraction', 'scrapers/extracted_coordinates.json'),
        ('Parish-based improvement', 'scrapers/improved_coordinates.json'),
        ('Research enhancement', 'scrapers/researched_locations.json'),
        ('Final upload data', 'scrapers/final_upload_data.json')
    ]
    
    results = []
    
    print(f"\n{'='*50}")
    print(f"VENDOR LOCATION ACCURACY REPORT - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*50}")
    
    for label, path in files:
        if not os.path.exists(path):
            print(f"\n{label}: File not found - {path}")
            continue
            
        data = load_json(path)
        if not data:
            continue
            
        metadata = data.get('_metadata', {})
        vendors = data.get('vendors', [])
        
        high_count = metadata.get('high_accuracy_count', 0)
        medium_count = metadata.get('medium_accuracy_count', 0)
        low_count = metadata.get('low_accuracy_count', 0)
        total = metadata.get('total_vendors', len(vendors))
        
        # If counts aren't in metadata, calculate them
        if high_count == 0 and medium_count == 0 and low_count == 0:
            for vendor in vendors:
                accuracy = vendor.get('location_accuracy', 'low')
                if accuracy == 'high':
                    high_count += 1
                elif accuracy == 'medium':
                    medium_count += 1
                else:
                    low_count += 1
        
        high_pct = (high_count / total) * 100 if total else 0
        medium_pct = (medium_count / total) * 100 if total else 0
        low_pct = (low_count / total) * 100 if total else 0
        
        print(f"\n{label} ({path}):")
        print(f"  - Total vendors: {total}")
        print(f"  - High accuracy: {high_count} ({high_pct:.1f}%)")
        print(f"  - Medium accuracy: {medium_count} ({medium_pct:.1f}%)")
        print(f"  - Low/unknown accuracy: {low_count} ({low_pct:.1f}%)")
        print(f"  - Total improved: {high_count + medium_count} ({high_pct + medium_pct:.1f}%)")
        
        results.append({
            'stage': label,
            'file': path,
            'total': total,
            'high_count': high_count,
            'high_percentage': high_pct,
            'medium_count': medium_count, 
            'medium_percentage': medium_pct,
            'low_count': low_count,
            'low_percentage': low_pct
        })
    
    print(f"\n{'='*50}")
    
    # Save report
    report_path = 'scrapers/accuracy_report.json'
    try:
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump({
                'generated': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
                'stages': results
            }, f, indent=2)
        print(f"Report saved to {report_path}")
    except Exception as e:
        print(f"Error saving report: {e}")

generate_report()
EOF

echo -e "\n${GREEN}===== Pipeline Complete =====${NC}"
echo "The following files have been generated:"
echo "  - scrapers/extracted_coordinates.json: Initial data extraction"
echo "  - scrapers/improved_coordinates.json: Parish-based location improvements"
echo "  - scrapers/researched_locations.json: Enhanced with researched locations"
echo "  - scrapers/final_upload_data.json: Final cleaned data for upload"
echo "  - scrapers/accuracy_report.json: Accuracy improvement report"

echo -e "\nCheck the logs above for any errors or warnings."
echo -e "To view the accuracy report, run: ${YELLOW}cat scrapers/accuracy_report.json${NC}" 