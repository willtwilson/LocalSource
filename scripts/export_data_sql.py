#!/usr/bin/env python3
"""
Script to export the fully enhanced vendor data to SQL statements.
This will generate SQL to insert/update vendors from the fully_enhanced_data.json file.
"""

import os
import sys
import json
import uuid
import random
from datetime import datetime
import argparse
from typing import Dict, List, Any, Optional
import re

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
        "Fruit": ["fruit", "apple", "berry", "strawberry"],
        "Vegetable": ["vegetable", "potato", "royal", "tomato"],
        "Dairy": ["milk", "cheese", "egg", "dairy"],
        "Meat": ["meat", "beef", "pork", "chicken"],
        "Seafood": ["fish", "shellfish", "crab", "oyster"],
        "Plants": ["plant", "flower"],
        "Other": ["honey", "baked goods", "wood"]
    }
    
    for category, keywords in categories.items():
        if any(keyword in name for keyword in keywords):
            return category
    
    return "Other"

def extract_address_from_description(description: str) -> Optional[str]:
    """Extract address information from the description if it exists."""
    # Look for patterns like "located on X in Y" or "located at X in Y"
    patterns = [
        r"located on ([^,]+) in",
        r"located at ([^,]+) in"
    ]
    
    for pattern in patterns:
        match = re.search(pattern, description)
        if match:
            return match.group(1).strip()
    return None

def generate_sql(vendors: List[Dict[str, Any]]) -> str:
    """Generate SQL to insert or update data in the database."""
    sql_lines = []
    
    # Add a header
    sql_lines.append("-- SQL to import vendor data")
    sql_lines.append("-- Generated at " + datetime.now().isoformat())
    sql_lines.append("")
    
    # Transaction for atomicity
    sql_lines.append("BEGIN;")
    sql_lines.append("")
    
    # Clean existing data if needed
    sql_lines.append("-- Clean existing data if needed")
    sql_lines.append("DELETE FROM public.vendor_produce;")
    sql_lines.append("DELETE FROM public.produce;")
    sql_lines.append("DELETE FROM public.vendors;")
    sql_lines.append("")
    
    # Process produce types
    produce_types = extract_produce_types(vendors)
    produce_map = {}
    
    sql_lines.append(f"-- Insert {len(produce_types)} produce types")
    for produce in produce_types:
        produce_id = str(uuid.uuid4())
        produce_map[produce] = produce_id
        category = categorize_produce(produce)
        escaped_produce = produce.replace("'", "''")
        sql_lines.append(f"INSERT INTO public.produce (id, name, category, description)")
        sql_lines.append(f"VALUES ('{produce_id}', '{escaped_produce}', '{category}', '{escaped_produce} available from local Jersey producers')")
        sql_lines.append(f"ON CONFLICT (name) DO UPDATE SET category = '{category}';")
    
    sql_lines.append("")
    
    # Process vendors
    sql_lines.append(f"-- Insert {len(vendors)} vendors")
    for vendor in vendors:
        vendor_id = vendor.get("id", str(uuid.uuid4()))
        name = vendor["name"].replace("'", "''")
        description = vendor.get("description", "").replace("'", "''")
        
        # Extract address from description if possible
        address = extract_address_from_description(description)
        
        # Add parish, organic, cashless info to the description since they're not in the schema
        if not description:
            description = "Local vendor"
            
            parish = vendor.get("parish", "")
            if parish:
                description += f" in {parish}"
                
            organic = vendor.get("organic", False)
            if organic:
                description += ". Organically grown"
                
            cashless = vendor.get("cashless_payment")
            if cashless is False:
                description += ". Cash only"
            elif cashless is True:
                description += ". Accepts cashless payments"
                
            if "produce_types" in vendor:
                produce_list = ", ".join(vendor["produce_types"]).lower()
                description += f". Offering {produce_list}"
            
            description += "."
            
        latitude = vendor.get("latitude")
        longitude = vendor.get("longitude")
        
        sql_lines.append(f"INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)")
        
        # Build the VALUES part
        values_line = f"VALUES ('{vendor_id}', '{name}', '{description}', "
        
        # Add address
        if address:
            values_line += f"'{address}', "
        else:
            values_line += "NULL, "
            
        if latitude is not None and longitude is not None:
            values_line += f"{latitude}, {longitude}, "
        else:
            values_line += "NULL, NULL, "
        values_line += f"'unverified')"
        
        sql_lines.append(values_line)
        sql_lines.append("ON CONFLICT (id) DO UPDATE SET")
        sql_lines.append(f"  name = '{name}',")
        sql_lines.append(f"  description = '{description}',")
        
        if address:
            sql_lines.append(f"  address = '{address}',")
            
        if latitude is not None and longitude is not None:
            sql_lines.append(f"  latitude = {latitude},")
            sql_lines.append(f"  longitude = {longitude},")
            
        sql_lines.append("  updated_at = NOW();")
        sql_lines.append("")
    
    # Process vendor-produce relationships
    sql_lines.append("-- Insert vendor-produce relationships")
    for vendor in vendors:
        vendor_id = vendor.get("id")
        if vendor_id and "produce_types" in vendor:
            for produce_type in vendor.get("produce_types", []):
                if produce_type in produce_map:
                    produce_id = produce_map[produce_type]
                    availability = random.choice(["Seasonal", "Year-round", "Limited"])
                    
                    sql_lines.append(f"INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)")
                    sql_lines.append(f"VALUES ('{vendor_id}', '{produce_id}', '{availability}')")
                    sql_lines.append("ON CONFLICT (vendor_id, produce_id) DO UPDATE SET")
                    sql_lines.append(f"  availability = '{availability}',")
                    sql_lines.append("  updated_at = NOW();")
    
    sql_lines.append("")
    
    # Commit the transaction
    sql_lines.append("COMMIT;")
    
    return "\n".join(sql_lines)

def main():
    parser = argparse.ArgumentParser(description='Export vendor data to SQL')
    parser.add_argument('--input', type=str, default='../scrapers/fully_enhanced_data.json',
                        help='Input JSON file with enhanced vendor data')
    parser.add_argument('--output', type=str, default='../scrapers/seed_vendors.sql',
                        help='Output SQL file')
    
    args = parser.parse_args()
    
    # Determine correct file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    input_path = args.input
    if not os.path.isabs(input_path):
        input_path = os.path.join(script_dir, input_path)
    
    output_path = args.output
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return 1
    
    # Load data
    print(f"Loading data from {input_path}...")
    data = load_data(input_path)
    
    vendors = data.get("vendors", [])
    if not vendors:
        print("No vendors found in input file")
        return 1
    
    print(f"Found {len(vendors)} vendors in input file")
    
    # Generate SQL
    sql = generate_sql(vendors)
    
    # Write SQL to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    print(f"SQL exported to {output_path}")
    print(f"You can run this SQL directly against your Supabase database")
    return 0

if __name__ == "__main__":
    sys.exit(main()) 