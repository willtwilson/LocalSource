#!/usr/bin/env python3
"""
Script to import the fully enhanced vendor data into Supabase database.
This will import vendors from the fully_enhanced_data.json file.
"""

import os
import sys
import json
import uuid
import random
from datetime import datetime
import argparse
from typing import Dict, List, Any, Optional

# Import Supabase client
from supabase import create_client, Client

def load_data(file_path: str) -> Dict[str, Any]:
    """Load data from a JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading data from {file_path}: {e}")
        return {}

def extract_produce_types(vendors: List[Dict[str, Any]]) -> List[str]:
    """Extract unique produce types from all vendors."""
    produce_types = set()
    for vendor in vendors:
        for produce_type in vendor.get("produce_types", []):
            produce_types.add(produce_type)
    return sorted(list(produce_types))

def categorize_produce(name: str) -> str:
    """Assign a category based on the produce name."""
    name = name.lower()
    categories = {
        "fruit": ["fruit", "apple", "berry", "strawberry"],
        "vegetable": ["vegetable", "potato", "royal", "tomato"],
        "dairy": ["milk", "cheese", "egg", "dairy"],
        "meat": ["meat", "beef", "pork", "chicken"],
        "seafood": ["fish", "shellfish", "crab", "oyster"],
        "plants": ["plant", "flower"],
        "other": ["honey", "baked goods", "wood"]
    }
    
    for category, keywords in categories.items():
        if any(keyword in name for keyword in keywords):
            return category.capitalize()
    
    return "Other"

def upload_to_supabase(
    supabase: Client, 
    vendors: List[Dict[str, Any]], 
    dry_run: bool = False
) -> bool:
    """Upload the enhanced data to Supabase."""
    
    if dry_run:
        print("DRY RUN - No data will be modified in the database")
    
    # Extract unique produce types
    produce_types = extract_produce_types(vendors)
    print(f"Found {len(produce_types)} unique produce types")
    
    # First check if tables exist
    try:
        # Check vendors table
        vendors_result = supabase.table("vendors").select("id").limit(1).execute()
        print(f"Vendors table check: {len(vendors_result.data)} records found")
        
        # Check produce table
        produce_result = supabase.table("produce").select("id").limit(1).execute()
        print(f"Produce table check: {len(produce_result.data)} records found")
        
        # Check vendor_produce table
        vp_result = supabase.table("vendor_produce").select("vendor_id").limit(1).execute()
        print(f"Vendor_produce table check: {len(vp_result.data)} records found")
    except Exception as e:
        print(f"Error checking tables: {e}")
        return False
    
    print(f"Preparing to upload {len(vendors)} vendors and {len(produce_types)} produce types...")
    
    # Upload produce types first
    produce_records = []
    for produce in produce_types:
        produce_id = str(uuid.uuid4())
        category = categorize_produce(produce)
        produce_records.append({
            "id": produce_id,
            "name": produce,
            "category": category,
            "description": f"{produce} available from local Jersey producers"
        })
    
    if not dry_run:
        try:
            # Insert in batches to avoid limitations
            batch_size = 50
            for i in range(0, len(produce_records), batch_size):
                batch = produce_records[i:i+batch_size]
                result = supabase.table("produce").upsert(batch).execute()
                print(f"Uploaded produce batch {i//batch_size + 1}: {len(batch)} records")
        except Exception as e:
            print(f"Error uploading produce types: {e}")
            return False
    else:
        print(f"Would upload {len(produce_records)} produce records in batches of 50")
    
    # Map produce names to IDs for relationship creation
    produce_map = {p["name"]: p["id"] for p in produce_records}
    
    # Upload vendors
    vendor_records = []
    for vendor in vendors:
        # Create the vendor record
        vendor_record = {
            "id": vendor.get("id", str(uuid.uuid4())),
            "name": vendor["name"],
            "description": vendor.get("description", ""),
            "parish": vendor.get("parish", ""),
            "latitude": vendor.get("latitude"),
            "longitude": vendor.get("longitude"),
            "organic": vendor.get("organic", False),
            "cashless_payment": vendor.get("cashless_payment"),
            "status": "unverified",  # Default status
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        vendor_records.append(vendor_record)
    
    if not dry_run:
        try:
            # Insert vendors in batches
            for i in range(0, len(vendor_records), batch_size):
                batch = vendor_records[i:i+batch_size]
                result = supabase.table("vendors").upsert(batch).execute()
                print(f"Uploaded vendor batch {i//batch_size + 1}: {len(batch)} records")
        except Exception as e:
            print(f"Error uploading vendors: {e}")
            return False
    else:
        print(f"Would upload {len(vendor_records)} vendor records in batches of 50")
    
    # Create vendor-produce relationships
    relationships = []
    for vendor in vendors:
        for produce_type in vendor.get("produce_types", []):
            if produce_type in produce_map:
                relationship = {
                    "vendor_id": vendor.get("id", ""),
                    "produce_id": produce_map[produce_type],
                    "availability": random.choice(["Seasonal", "Year-round", "Limited"]),
                    "price": None,  # We don't have actual prices
                    "unit": None    # We don't have units
                }
                relationships.append(relationship)
    
    if not dry_run:
        try:
            # Insert relationships in batches
            for i in range(0, len(relationships), batch_size):
                batch = relationships[i:i+batch_size]
                result = supabase.table("vendor_produce").upsert(batch).execute()
                print(f"Uploaded relationship batch {i//batch_size + 1}: {len(batch)} records")
        except Exception as e:
            print(f"Error uploading vendor-produce relationships: {e}")
            return False
    else:
        print(f"Would upload {len(relationships)} vendor-produce relationships in batches of 50")
    
    return True

def main():
    parser = argparse.ArgumentParser(description='Import vendor data to Supabase')
    parser.add_argument('--input', type=str, default='../scrapers/fully_enhanced_data.json',
                        help='Input JSON file with enhanced vendor data')
    parser.add_argument('--dry-run', action='store_true',
                        help='Perform a dry run without modifying the database')
    parser.add_argument('--clear-existing', action='store_true',
                        help='Clear existing data before import (USE WITH CAUTION)')
    
    args = parser.parse_args()
    
    # Determine correct file path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    input_path = args.input
    if not os.path.isabs(input_path):
        input_path = os.path.join(script_dir, input_path)
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return 1
    
    # Load environment variables for Supabase
    supabase_url = os.environ.get("VITE_SUPABASE_URL")
    supabase_key = os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    if not supabase_url or not supabase_key:
        print("Supabase URL or key not found in environment variables")
        print("Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY")
        return 1
    
    # Initialize Supabase client
    supabase = create_client(supabase_url, supabase_key)
    
    # Load data
    print(f"Loading data from {input_path}...")
    data = load_data(input_path)
    
    vendors = data.get("vendors", [])
    if not vendors:
        print("No vendors found in input file")
        return 1
    
    print(f"Found {len(vendors)} vendors in input file")
    
    # Clear existing data if requested
    if args.clear_existing and not args.dry_run:
        print("WARNING: Clearing existing data...")
        try:
            print("Deleting vendor-produce relationships...")
            supabase.table("vendor_produce").delete().execute()
            
            print("Deleting produce...")
            supabase.table("produce").delete().execute()
            
            print("Deleting vendors...")
            supabase.table("vendors").delete().execute()
            
            print("Existing data cleared successfully")
        except Exception as e:
            print(f"Error clearing existing data: {e}")
            return 1
    elif args.clear_existing and args.dry_run:
        print("DRY RUN: Would clear existing data from vendor_produce, produce, and vendors tables")
    
    # Upload to Supabase
    success = upload_to_supabase(supabase, vendors, args.dry_run)
    
    if success:
        print("Import completed successfully!")
        return 0
    else:
        print("Import failed")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 