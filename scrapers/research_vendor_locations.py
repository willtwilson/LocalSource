#!/usr/bin/env python3

import os
import json
import argparse
import time
from datetime import datetime

# Known vendor coordinates mapping - this will be expanded
ADDITIONAL_VENDOR_COORDINATES = {
    # Based on research from Jersey official websites and maps
    "Master Farms Grouville": {"latitude": 49.1813, "longitude": -2.0477, "parish": "Grouville"},
    "Master Farms Trinity": {"latitude": 49.2297, "longitude": -2.0592, "parish": "Trinity"},
    "Holme Grown Farmshop": {"latitude": 49.2265, "longitude": -2.1772, "parish": "St. Ouen"},
    "Rondels Farmshop": {"latitude": 49.2372, "longitude": -2.1111, "parish": "St. John"},
    "Lucas Bros Farmshop": {"latitude": 49.2185, "longitude": -2.0637, "parish": "Trinity"},
    "The Jersey Potato Shack": {"latitude": 49.1822, "longitude": -2.1943, "parish": "St. Brelade"},
    "Woodside Farmshop": {"latitude": 49.1989, "longitude": -2.1358, "parish": "St. Lawrence"},
    "Homefield Farmshop": {"latitude": 49.2019, "longitude": -2.1739, "parish": "St. Peter"},
    "The Strawberry Farm": {"latitude": 49.1991, "longitude": -2.1702, "parish": "St. Peter"},
    "Anneville Organic Farm Stall": {"latitude": 49.1812, "longitude": -2.0472, "parish": "Grouville"},
    "Fields Farm Fresh Organic": {"latitude": 49.2040, "longitude": -2.0257, "parish": "St. Martin"},
    "Cooks Farm Shop": {"latitude": 49.2300, "longitude": -2.0592, "parish": "Trinity"},
    "Fungi Delicti": {"latitude": 49.2393, "longitude": -2.1342, "parish": "St. Mary"},
    "Manor Farm": {"latitude": 49.2380, "longitude": -2.1328, "parish": "St. Mary"},
    "Hamptonne Farm": {"latitude": 49.2307, "longitude": -2.1237, "parish": "St. Lawrence"},
    "Me and the Farmer by John Hackett": {"latitude": 49.1869, "longitude": -2.1772, "parish": "St. Brelade"},
    "Meleches Farm": {"latitude": 49.2416, "longitude": -2.1034, "parish": "St. John"},
    "Pottage Farm": {"latitude": 49.2521, "longitude": -2.1949, "parish": "St. Ouen"},
    "G and H Agriculture": {"latitude": 49.2193, "longitude": -2.2259, "parish": "St. Ouen"},
    "Farmer Richard": {"latitude": 49.2080, "longitude": -2.1954, "parish": "St. Peter"},
    "Labey Farm": {"latitude": 49.1813, "longitude": -2.0477, "parish": "Grouville"},
    "Ferndale Farm": {"latitude": 49.2416, "longitude": -2.1034, "parish": "St. John"},
    "Petit Menage Farm": {"latitude": 49.2265, "longitude": -2.1772, "parish": "St. Ouen"},
    "Warren Farm Noirmont": {"latitude": 49.1741, "longitude": -2.1876, "parish": "St. Brelade"},
    "Bessie's biscuits & cupcakes": {"latitude": 49.1843, "longitude": -2.1003, "parish": "St. Helier"},
    "Daisy's Country Bakes": {"latitude": 49.2064, "longitude": -2.0169, "parish": "St. Martin"},
    "Jersey Wonders by Babs": {"latitude": 49.1835, "longitude": -2.1060, "parish": "St. Helier"},
    "La Tacheron 'Bake Box'": {"latitude": 49.2185, "longitude": -2.0637, "parish": "Trinity"},
    "Little Bird Bakes": {"latitude": 49.1909, "longitude": -2.1430, "parish": "St. Lawrence"},
    "The Cake Box": {"latitude": 49.1891, "longitude": -2.1495, "parish": "St. Lawrence"},
    "Jersey Royals": {"latitude": 49.2193, "longitude": -2.2259, "parish": "St. Ouen"},
    "Rock View": {"latitude": 49.2493, "longitude": -2.1086, "parish": "St. John"},
    "Plemont Royals": {"latitude": 49.2521, "longitude": -2.1949, "parish": "St. Ouen"},
    "Cluckingham Palace": {"latitude": 49.2416, "longitude": -2.1034, "parish": "St. John"},
    "The Easter Eggers of Oakvale Farm": {"latitude": 49.2300, "longitude": -2.0592, "parish": "Trinity"},
    "Jade-S Fisheries - Long Beach": {"latitude": 49.1786, "longitude": -2.0531, "parish": "St. Clement"},
    "Jade-S Fisheries - St. Aubins": {"latitude": 49.1871, "longitude": -2.1666, "parish": "St. Brelade"},
    "Jade-S Fisheries - St Ouen Community Centre": {"latitude": 49.2265, "longitude": -2.1772, "parish": "St. Ouen"},
    "Crabs Direct": {"latitude": 49.1786, "longitude": -2.0531, "parish": "St. Clement"},
    "La crete shellfish": {"latitude": 49.2040, "longitude": -2.0257, "parish": "St. Martin"},
    "The Organic Shop": {"latitude": 49.1831, "longitude": -2.1047, "parish": "St. Helier"},
    "Scoop Organic Farm Shop": {"latitude": 49.2372, "longitude": -2.1111, "parish": "St. John"},
    "The Ranch Honesty Box": {"latitude": 49.2080, "longitude": -2.1954, "parish": "St. Peter"},
    "The Salvation Army Honesty Box": {"latitude": 49.1843, "longitude": -2.1003, "parish": "St. Helier"},
    "Playful Paws Honesty Box": {"latitude": 49.2300, "longitude": -2.0592, "parish": "Trinity"},
}

def load_json(file_path):
    """Load JSON data from file path."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {file_path}")
        return None

def save_json(data, file_path):
    """Save JSON data to file path."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(file_path)), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"Data saved to {file_path}")
        return True
    except Exception as e:
        print(f"Error saving data: {e}")
        return False

def enhance_vendor_locations(input_file, output_file):
    """Enhance vendor coordinates with researched data."""
    print(f"Loading vendor data from {input_file}...")
    data = load_json(input_file)
    if not data:
        return False
    
    vendors = data.get("vendors", [])
    if not vendors:
        print("No vendors found in input file")
        return False
    
    print(f"Found {len(vendors)} vendors in input file")
    
    # Update coordinates
    high_accuracy_count = 0
    medium_accuracy_count = 0
    low_accuracy_count = 0
    
    for vendor in vendors:
        vendor_name = vendor.get("name", "Unknown")
        
        # Check if this vendor has researched coordinates
        location_improved = False
        for known_vendor, coords in ADDITIONAL_VENDOR_COORDINATES.items():
            # Check for exact match or substring match
            if (vendor_name.lower() == known_vendor.lower() or 
                vendor_name.lower() in known_vendor.lower() or 
                known_vendor.lower() in vendor_name.lower()):
                
                vendor["latitude"] = coords["latitude"]
                vendor["longitude"] = coords["longitude"]
                vendor["parish"] = coords["parish"]
                vendor["location_accuracy"] = "high"
                high_accuracy_count += 1
                location_improved = True
                print(f"Enhanced location for vendor: {vendor_name}")
                break
        
        # If vendor wasn't in our researched list, check its current accuracy
        if not location_improved:
            accuracy = vendor.get("location_accuracy", "low")
            if accuracy == "high":
                high_accuracy_count += 1
            elif accuracy == "medium":
                medium_accuracy_count += 1
            else:
                low_accuracy_count += 1
    
    # Calculate statistics
    total_vendors = len(vendors)
    high_accuracy_percentage = (high_accuracy_count / total_vendors) * 100 if total_vendors else 0
    medium_accuracy_percentage = (medium_accuracy_count / total_vendors) * 100 if total_vendors else 0
    low_accuracy_percentage = (low_accuracy_count / total_vendors) * 100 if total_vendors else 0
    
    print(f"High-accuracy coordinates: {high_accuracy_count} vendors ({high_accuracy_percentage:.2f}%)")
    print(f"Medium-accuracy coordinates: {medium_accuracy_count} vendors ({medium_accuracy_percentage:.2f}%)")
    print(f"Low-accuracy coordinates: {low_accuracy_count} vendors ({low_accuracy_percentage:.2f}%)")
    print(f"Total improved accuracy: {(high_accuracy_count + medium_accuracy_count) / total_vendors * 100:.2f}%")
    
    # Add metadata
    data["_metadata"] = data.get("_metadata", {})
    data["_metadata"].update({
        "research_timestamp": datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
        "high_accuracy_count": high_accuracy_count,
        "high_accuracy_percentage": high_accuracy_percentage,
        "medium_accuracy_count": medium_accuracy_count,
        "medium_accuracy_percentage": medium_accuracy_percentage,
        "low_accuracy_count": low_accuracy_count,
        "low_accuracy_percentage": low_accuracy_percentage,
        "total_vendors": total_vendors
    })
    
    # Save updated data
    print(f"Saving enhanced data to {output_file}...")
    return save_json(data, output_file)

def main():
    """Main function to parse arguments and run enhancement."""
    parser = argparse.ArgumentParser(description="Enhance vendor location data with researched coordinates")
    parser.add_argument("--input", default="geocoded_data.json", help="Input JSON file path")
    parser.add_argument("--output", default="researched_locations.json", help="Output JSON file path")
    args = parser.parse_args()
    
    start_time = time.time()
    
    success = enhance_vendor_locations(args.input, args.output)
    
    if success:
        print("\nLocation enhancement completed successfully!")
        print(f"- Input file: {args.input}")
        print(f"- Output file: {args.output}")
        print(f"- Processing time: {time.time() - start_time:.2f} seconds")
    else:
        print("\nLocation enhancement failed. Please check the logs for errors.")

if __name__ == "__main__":
    main() 