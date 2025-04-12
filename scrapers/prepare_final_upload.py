#!/usr/bin/env python3
import os
import json
import argparse
import sys
import time
import uuid
from datetime import datetime

def load_json(file_path: str):
    """Load JSON data from file path."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {file_path}")
        sys.exit(1)

def save_json(data, file_path: str):
    """Save JSON data to file path."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(file_path)), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")

def prepare_vendor_for_upload(vendor):
    """Prepare vendor data for upload to Supabase."""
    # Create a copy to avoid modifying the original
    upload_vendor = vendor.copy()
    
    # Remove fields that shouldn't be in the database
    fields_to_remove = ['source', 'estimated_reliability', 'flagged']
    for field in fields_to_remove:
        if field in upload_vendor:
            del upload_vendor[field]
    
    # Ensure proper types for database fields
    for field in ['latitude', 'longitude']:
        if field in upload_vendor and upload_vendor[field] is not None:
            try:
                upload_vendor[field] = float(upload_vendor[field])
            except (ValueError, TypeError):
                upload_vendor[field] = None
    
    # Generate a permanent ID if not present
    if 'id' not in upload_vendor:
        upload_vendor['id'] = str(uuid.uuid4())
    
    # Add timestamps
    current_time = datetime.utcnow().isoformat() + 'Z'
    upload_vendor['created_at'] = upload_vendor.get('created_at', current_time)
    upload_vendor['updated_at'] = current_time
    
    # Add status for review workflow
    if 'status' not in upload_vendor:
        upload_vendor['status'] = 'active'
        
    return upload_vendor

def prepare_final_data(input_file, output_file):
    """Prepare final data for Supabase upload."""
    print(f"Loading data from {input_file}...")
    data = load_json(input_file)
    
    vendors = data.get('vendors', [])
    if not vendors:
        print("No vendors found in input file")
        return
    
    print(f"Processing {len(vendors)} vendors...")
    
    # Prepare vendors for upload
    final_vendors = []
    for vendor in vendors:
        final_vendor = prepare_vendor_for_upload(vendor)
        final_vendors.append(final_vendor)
    
    # Create final object structure
    final_data = {
        "vendors": final_vendors,
        "metadata": {
            "processed_timestamp": datetime.utcnow().isoformat() + 'Z',
            "total_vendors": len(final_vendors),
            "source_file": input_file,
            "ready_for_upload": True
        }
    }
    
    # Save final data
    print(f"Saving final data to {output_file}...")
    save_json(final_data, output_file)
    print(f"Successfully processed {len(final_vendors)} vendors")
    
    # Generate statistics
    parishes = {}
    produce_types = {}
    
    for vendor in final_vendors:
        # Count parishes
        parish = vendor.get('parish', 'Unknown')
        parishes[parish] = parishes.get(parish, 0) + 1
        
        # Count produce types
        for produce in vendor.get('produce_types', []):
            produce_types[produce] = produce_types.get(produce, 0) + 1
    
    print("\nVendor Statistics:")
    print(f"Total vendors: {len(final_vendors)}")
    
    print("\nTop parishes:")
    for parish, count in sorted(parishes.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  - {parish}: {count}")
    
    print("\nTop produce types:")
    for produce, count in sorted(produce_types.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  - {produce}: {count}")

def main():
    parser = argparse.ArgumentParser(description='Prepare final data for Supabase upload')
    parser.add_argument('--input', type=str, default='geocoded_data.json',
                      help='Input JSON file with geocoded vendor data')
    parser.add_argument('--output', type=str, default='final_upload_data.json',
                      help='Output JSON file for final upload data')
    
    args = parser.parse_args()
    
    # Ensure absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    input_path = args.input
    if not os.path.isabs(input_path):
        input_path = os.path.join(script_dir, input_path)
    
    output_path = args.output
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    prepare_final_data(input_path, output_path)

if __name__ == '__main__':
    main() 