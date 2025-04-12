#!/usr/bin/env python3
import json
import os
import argparse
import time
import requests
import random
from typing import Dict, List, Any, Optional, Tuple

# Jersey parishes with approximate center coordinates
PARISH_LOCATIONS = {
    "St. Helier": (49.1858, -2.1042),
    "St. Saviour": (49.1944, -2.0789),
    "St. Clement": (49.1783, -2.0644),
    "Grouville": (49.1811, -2.0461),
    "St. Martin": (49.1969, -2.0233),
    "Trinity": (49.2178, -2.0625),
    "St. John": (49.2428, -2.1042),
    "St. Mary": (49.2394, -2.1331),
    "St. Ouen": (49.2264, -2.1767),
    "St. Peter": (49.2019, -2.1739),
    "St. Brelade": (49.1833, -2.1942),
    "St. Lawrence": (49.1997, -2.1347),
    # Fallback for unknown parishes
    "Unknown": (49.2000, -2.1200),  # Approximate center of Jersey
}

# Alternative spellings and normalizations
PARISH_ALIASES = {
    "St Helier": "St. Helier",
    "St. Helier": "St. Helier",
    "Saint Helier": "St. Helier",
    "St Saviour": "St. Saviour",
    "St. Saviour": "St. Saviour",
    "Saint Saviour": "St. Saviour",
    "St Clement": "St. Clement",
    "St. Clement": "St. Clement",
    "Saint Clement": "St. Clement",
    "St Martin": "St. Martin",
    "St. Martin": "St. Martin",
    "Saint Martin": "St. Martin",
    "St John": "St. John",
    "St. John": "St. John",
    "Saint John": "St. John",
    "St Mary": "St. Mary",
    "St. Mary": "St. Mary",
    "Saint Mary": "St. Mary",
    "St Ouen": "St. Ouen",
    "St. Ouen": "St. Ouen",
    "Saint Ouen": "St. Ouen",
    "St Peter": "St. Peter",
    "St. Peter": "St. Peter",
    "Saint Peter": "St. Peter",
    "St Brelade": "St. Brelade",
    "St. Brelade": "St. Brelade",
    "Saint Brelade": "St. Brelade",
    "St Lawrence": "St. Lawrence",
    "St. Lawrence": "St. Lawrence",
    "Saint Lawrence": "St. Lawrence",
    "Trinity": "Trinity",
    "Grouville": "Grouville",
}

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

def save_data(data: Dict[str, Any], file_path: str) -> bool:
    """Save vendor data to JSON file."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(file_path)), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving data to {file_path}: {str(e)}")
        return False

def normalize_parish(parish: str) -> str:
    """Normalize parish name to standard format."""
    # If parish is None or empty, return "Unknown"
    if not parish:
        return "Unknown"
    
    # Remove leading/trailing whitespace and convert to title case
    parish = parish.strip().title()
    
    # Check if parish is in aliases
    if parish in PARISH_ALIASES:
        return PARISH_ALIASES[parish]
    
    # If parish not recognized, return "Unknown"
    if parish not in PARISH_LOCATIONS:
        return "Unknown"
    
    return parish

def add_parish_coordinates(vendor: Dict[str, Any]) -> Dict[str, Any]:
    """Add approximate coordinates based on parish."""
    # Normalize parish
    parish = normalize_parish(vendor.get('parish', ''))
    vendor['parish'] = parish
    
    # Skip if vendor already has coordinates
    if vendor.get('latitude') is not None and vendor.get('longitude') is not None:
        vendor['location_accuracy'] = vendor.get('location_accuracy', 'exact')
        return vendor
    
    # Get base coordinates for parish
    base_lat, base_lng = PARISH_LOCATIONS.get(parish, PARISH_LOCATIONS['Unknown'])
    
    # Add some randomness to avoid all vendors in same parish having identical coordinates
    # Random offset of up to ~1km
    lat_offset = random.uniform(-0.005, 0.005)
    lng_offset = random.uniform(-0.005, 0.005)
    
    vendor['latitude'] = base_lat + lat_offset
    vendor['longitude'] = base_lng + lng_offset
    vendor['location_accuracy'] = 'parish'
    
    return vendor

def geocode_vendors(vendors: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Add geocoding to all vendors."""
    geocoded_vendors = []
    
    for vendor in vendors:
        geocoded_vendor = add_parish_coordinates(vendor)
        geocoded_vendors.append(geocoded_vendor)
    
    return geocoded_vendors

def main():
    parser = argparse.ArgumentParser(description='Add geocoding to vendor data')
    parser.add_argument('--input', type=str, default='cleaned_data.json',
                      help='Input JSON file with cleaned vendor data')
    parser.add_argument('--output', type=str, default='geocoded_data.json',
                      help='Output JSON file for geocoded vendor data')
    args = parser.parse_args()
    
    # Ensure file paths are correct
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    input_path = args.input
    if not os.path.isabs(input_path):
        input_path = os.path.join(script_dir, input_path)
    
    output_path = args.output
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    # Load data
    print(f"Loading vendor data from {input_path}...")
    data = load_data(input_path)
    vendors = data.get('vendors', [])
    
    if not vendors:
        print("No vendors found in the input file.")
        return
    
    print(f"Found {len(vendors)} vendors in the input file.")
    
    # Geocode vendors
    print("Adding geocoding to vendors...")
    geocoded_vendors = geocode_vendors(vendors)
    
    # Update data
    data['vendors'] = geocoded_vendors
    data['_metadata'] = {
        'geocoded_count': len(geocoded_vendors),
        'geocoding_timestamp': time.time(),
        'geocoding_method': 'parish-based approximation'
    }
    
    # Save data
    print(f"Saving geocoded data to {output_path}...")
    if save_data(data, output_path):
        print(f"Successfully saved {len(geocoded_vendors)} geocoded vendors.")
    else:
        print("Failed to save geocoded data.")

if __name__ == '__main__':
    main() 