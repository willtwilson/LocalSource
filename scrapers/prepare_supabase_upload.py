#!/usr/bin/env python3
import json
import os
import argparse
import time
import uuid
from typing import Dict, List, Any, Optional

def load_data(file_path: str) -> Dict[str, Any]:
    """Load vendor data from JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return {"vendors": []}
    except json.JSONDecodeError:
        print(f"Error: File '{file_path}' contains invalid JSON.")
        return {"vendors": []}

def save_data(data: Dict[str, Any], file_path: str) -> None:
    """Save vendor data to JSON file."""
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")

def prepare_vendors_for_supabase(
    vendors: List[Dict[str, Any]], 
    quality_threshold: int = 50
) -> List[Dict[str, Any]]:
    """
    Prepare vendors for upload to Supabase.
    
    Transforms the data structure to match Supabase schema and filters
    out low-quality vendors.
    """
    supabase_vendors = []
    
    for vendor in vendors:
        # Skip vendors below quality threshold
        if vendor.get('quality_score', 0) < quality_threshold:
            continue
        
        # Create a new vendor object with the structure expected by Supabase
        supabase_vendor = {
            "id": str(uuid.uuid4()),  # Generate a unique ID
            "name": vendor.get('name', ''),
            "parish": vendor.get('parish', 'Unknown'),
            "description": vendor.get('description', ''),
            "produce_types": vendor.get('produce_types', []),
            "latitude": vendor.get('latitude'),
            "longitude": vendor.get('longitude'),
            "location_accuracy": vendor.get('location_accuracy', 'parish'),
            "is_active": True,
            "created_at": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "is_approved": True,  # These are trusted sources
            "source": "hedgeveg_scraper",
            "original_data": {
                "original_name": vendor.get('original_name', vendor.get('name', '')),
                "original_parish": vendor.get('original_parish', vendor.get('parish', '')),
                "original_description": vendor.get('original_description', vendor.get('description', '')),
                "quality_score": vendor.get('quality_score', 0),
                "quality_issues": vendor.get('quality_issues', [])
            }
        }
        
        # Add to the list
        supabase_vendors.append(supabase_vendor)
    
    return supabase_vendors

def main():
    parser = argparse.ArgumentParser(description='Prepare vendor data for Supabase upload')
    parser.add_argument('--cleaned', type=str, default='cleaned_data.json',
                      help='Input cleaned JSON file with vendor data')
    parser.add_argument('--geocoded', type=str, default='geocoded_data.json',
                      help='Input geocoded JSON file with vendor data')
    parser.add_argument('--output', type=str, default='supabase_upload.json',
                      help='Output JSON file for Supabase upload')
    parser.add_argument('--quality', type=int, default=50,
                      help='Quality threshold (0-100) for vendors to include')
    args = parser.parse_args()
    
    # Ensure file paths are correct
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    cleaned_path = args.cleaned
    if not os.path.isabs(cleaned_path):
        cleaned_path = os.path.join(script_dir, cleaned_path)
    
    geocoded_path = args.geocoded
    if not os.path.isabs(geocoded_path):
        geocoded_path = os.path.join(script_dir, geocoded_path)
    
    output_path = args.output
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    # Load cleaned data
    print(f"Loading cleaned data from {cleaned_path}...")
    cleaned_data = load_data(cleaned_path)
    cleaned_vendors = cleaned_data.get('vendors', [])
    
    if not cleaned_vendors:
        print("No vendors found in the cleaned data file.")
        return
    
    # Load geocoded data
    print(f"Loading geocoded data from {geocoded_path}...")
    geocoded_data = load_data(geocoded_path)
    geocoded_vendors = geocoded_data.get('vendors', [])
    
    if not geocoded_vendors:
        print("No vendors found in the geocoded data file. Using cleaned data only.")
        combined_vendors = cleaned_vendors
    else:
        # Combine cleaned and geocoded data
        # Create a map of vendor names to geocoded data for quick lookup
        geocoded_map = {v.get('name', ''): v for v in geocoded_vendors if v.get('name')}
        
        # Combine data, prioritizing geocoded information
        combined_vendors = []
        for vendor in cleaned_vendors:
            name = vendor.get('name', '')
            if name and name in geocoded_map:
                # Merge the vendor data with geocoded data
                combined_vendor = vendor.copy()
                geocoded_vendor = geocoded_map[name]
                
                # Add geocoding information
                combined_vendor['latitude'] = geocoded_vendor.get('latitude')
                combined_vendor['longitude'] = geocoded_vendor.get('longitude')
                combined_vendor['location_accuracy'] = geocoded_vendor.get('location_accuracy')
                
                # Preserve original values
                combined_vendor['original_name'] = vendor.get('name', '')
                combined_vendor['original_parish'] = vendor.get('parish', '')
                combined_vendor['original_description'] = vendor.get('description', '')
                
                combined_vendors.append(combined_vendor)
            else:
                # Just use the cleaned data
                vendor['original_name'] = vendor.get('name', '')
                vendor['original_parish'] = vendor.get('parish', '')
                vendor['original_description'] = vendor.get('description', '')
                combined_vendors.append(vendor)
    
    # Prepare for Supabase
    print(f"Preparing {len(combined_vendors)} vendors for Supabase upload...")
    supabase_vendors = prepare_vendors_for_supabase(combined_vendors, args.quality)
    
    # Create the final data structure
    supabase_data = {
        "vendors": supabase_vendors,
        "metadata": {
            "prepared_at": time.strftime('%Y-%m-%d %H:%M:%S'),
            "total_vendors": len(supabase_vendors),
            "quality_threshold": args.quality,
            "upload_version": "1.0"
        }
    }
    
    # Save the prepared data
    save_data(supabase_data, output_path)
    
    print(f"\nPrepared {len(supabase_vendors)} vendors for Supabase upload.")
    print(f"Filtered out {len(combined_vendors) - len(supabase_vendors)} low-quality vendors.")

if __name__ == '__main__':
    main() 