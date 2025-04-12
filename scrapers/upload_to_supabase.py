#!/usr/bin/env python3
import os
import json
import argparse
import sys
import time
import requests
from typing import Dict, List, Any, Optional, Tuple
import uuid

def load_json(file_path: str) -> Dict[str, Any]:
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

def save_json(data: Dict[str, Any], file_path: str) -> None:
    """Save JSON data to file path."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(file_path)), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")

def clean_vendor_for_upload(vendor: Dict[str, Any]) -> Dict[str, Any]:
    """Prepare vendor data for upload to Supabase."""
    # Create a copy to avoid modifying the original
    upload_vendor = vendor.copy()
    
    # Remove or transform fields that shouldn't be sent to the database
    if 'source' in upload_vendor:
        del upload_vendor['source']
    
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
    
    # Add status for review workflow
    if 'status' not in upload_vendor:
        upload_vendor['status'] = 'active'  # or 'pending' if you want manual review
    
    # Add timestamps
    upload_vendor['created_at'] = upload_vendor.get('created_at', time.strftime('%Y-%m-%dT%H:%M:%SZ'))
    upload_vendor['updated_at'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')
    
    return upload_vendor

def get_existing_vendors(url: str, key: str) -> List[Dict[str, Any]]:
    """Get list of existing vendors from Supabase using direct REST API."""
    try:
        headers = {
            'apikey': key,
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f"{url}/rest/v1/vendors?select=*",
            headers=headers
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching existing vendors: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return []
    except Exception as e:
        print(f"Error fetching existing vendors: {e}")
        return []

def find_matching_vendor(vendor: Dict[str, Any], existing_vendors: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """Find matching vendor in existing vendors list."""
    vendor_name = vendor.get('name', '').strip().lower()
    if not vendor_name:
        return None
    
    for existing in existing_vendors:
        existing_name = existing.get('name', '').strip().lower()
        if existing_name == vendor_name:
            return existing
        
    return None

def upload_vendors(url: str, key: str, vendors: List[Dict[str, Any]], dry_run: bool = False) -> Tuple[int, int, int]:
    """Upload vendors to Supabase database using direct REST API."""
    existing_vendors = get_existing_vendors(url, key)
    print(f"Found {len(existing_vendors)} existing vendors in database")
    
    created = 0
    updated = 0
    skipped = 0
    
    headers = {
        'apikey': key,
        'Authorization': f'Bearer {key}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    for vendor in vendors:
        upload_data = clean_vendor_for_upload(vendor)
        
        # Check if vendor already exists
        existing = find_matching_vendor(vendor, existing_vendors)
        
        if dry_run:
            if existing:
                print(f"Would update existing vendor: {vendor['name']} (id: {existing['id']})")
                updated += 1
            else:
                print(f"Would create new vendor: {vendor['name']}")
                created += 1
            continue
        
        try:
            if existing:
                # Update existing vendor
                upload_data['id'] = existing['id']  # Ensure we update the right record
                response = requests.patch(
                    f"{url}/rest/v1/vendors?id=eq.{existing['id']}",
                    headers=headers,
                    json=upload_data
                )
                
                if response.status_code == 204:
                    print(f"Updated vendor: {vendor['name']} (id: {existing['id']})")
                    updated += 1
                else:
                    print(f"Error updating vendor: HTTP {response.status_code}")
                    print(f"Response: {response.text}")
                    skipped += 1
            else:
                # Create new vendor
                response = requests.post(
                    f"{url}/rest/v1/vendors",
                    headers=headers,
                    json=upload_data
                )
                
                if response.status_code == 201:
                    print(f"Created vendor: {vendor['name']}")
                    created += 1
                else:
                    print(f"Error creating vendor: HTTP {response.status_code}")
                    print(f"Response: {response.text}")
                    skipped += 1
        except Exception as e:
            print(f"Error uploading vendor {vendor.get('name', 'Unknown')}: {e}")
            skipped += 1
    
    return created, updated, skipped

def main():
    parser = argparse.ArgumentParser(description='Upload vendor data to Supabase')
    parser.add_argument('--input', type=str, default='cleaned_data.json',
                      help='Input JSON file with cleaned vendor data')
    parser.add_argument('--url', type=str, required=True,
                      help='Supabase project URL')
    parser.add_argument('--key', type=str, required=True,
                      help='Supabase service key')
    parser.add_argument('--dry-run', action='store_true',
                      help='Dry run mode - show what would be uploaded without making changes')
    parser.add_argument('--output-results', type=str,
                      help='Output file for upload results summary')
    
    args = parser.parse_args()
    
    # Load vendor data
    print(f"Loading vendor data from {args.input}...")
    data = load_json(args.input)
    vendors = data.get('vendors', [])
    if not vendors:
        print("No vendors found in input file")
        return
    
    print(f"Found {len(vendors)} vendors to process")
    
    # Initialize connection
    if not args.dry_run:
        print(f"Using direct API approach to connect to Supabase at {args.url}...")
    else:
        print("DRY RUN MODE: No data will be modified")
    
    # Upload vendors
    start_time = time.time()
    created, updated, skipped = upload_vendors(args.url, args.key, vendors, args.dry_run)
    end_time = time.time()
    
    # Print results
    print("\nUpload Results:")
    print(f"- Total vendors processed: {len(vendors)}")
    print(f"- Vendors created: {created}")
    print(f"- Vendors updated: {updated}")
    print(f"- Vendors skipped/errored: {skipped}")
    print(f"- Time taken: {end_time - start_time:.2f} seconds")
    
    # Save results if requested
    if args.output_results:
        results = {
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "input_file": args.input,
            "upload_stats": {
                "total": len(vendors),
                "created": created,
                "updated": updated,
                "skipped": skipped,
                "time_taken": end_time - start_time
            }
        }
        save_json(results, args.output_results)

if __name__ == '__main__':
    main() 