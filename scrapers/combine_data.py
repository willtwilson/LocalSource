#!/usr/bin/env python3
import os
import json
import argparse
from typing import Dict, List, Any

def load_json(file_path: str) -> Dict[str, Any]:
    """Load JSON data from file path."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return {}
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {file_path}")
        return {}

def save_json(data: Dict[str, Any], file_path: str) -> bool:
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

def normalize_vendor(vendor: Dict[str, Any], source: str) -> Dict[str, Any]:
    """Normalize vendor data structure from different scraper sources."""
    normalized = {}
    
    # Basic information
    normalized['name'] = vendor.get('name', '')
    
    # Handle description (different scrapers may use different property names)
    description = vendor.get('description', vendor.get('desc', ''))
    normalized['description'] = description
    
    # Handle parish information
    parish = vendor.get('parish', 'Unknown')
    if not parish or parish == 'null' or parish.lower() == 'unknown':
        parish = 'Unknown'
    normalized['parish'] = parish
    
    # Handle produce types (different scrapers may use different property names)
    produce_types = vendor.get('produceTypes', vendor.get('produce_types', []))
    if isinstance(produce_types, str):
        # Handle case where produce_types might be a comma-separated string
        produce_types = [item.strip() for item in produce_types.split(',') if item.strip()]
    normalized['produceTypes'] = produce_types
    
    # Location data
    normalized['latitude'] = vendor.get('latitude', vendor.get('lat', None))
    normalized['longitude'] = vendor.get('longitude', vendor.get('lng', None))
    
    # Contact information
    for field in ['phone', 'email', 'website', 'address']:
        if field in vendor:
            normalized[field] = vendor[field]
    
    # Add source information
    normalized['source'] = source
    
    return normalized

def combine_data(source_files: List[str], output_file: str) -> None:
    """Combine vendor data from multiple sources into a single dataset."""
    combined_vendors = []
    sources_summary = {}

    for source_file in source_files:
        try:
            # Extract source name from filename without path or extension
            source_name = os.path.basename(source_file).split('.')[0]
            print(f"Loading data from {source_file}...")
            
            data = load_json(source_file)
            
            # Handle different data structures from scrapers
            vendors = []
            if 'vendors' in data:
                vendors = data['vendors']
            elif isinstance(data, list):
                vendors = data
            
            if not vendors:
                print(f"No vendors found in {source_file}")
                sources_summary[source_name] = 0
                continue
            
            # Normalize vendor data and add to combined list
            source_vendors = []
            for vendor in vendors:
                if vendor.get('name'):  # Only include vendors with a name
                    normalized = normalize_vendor(vendor, source_name)
                    source_vendors.append(normalized)
            
            combined_vendors.extend(source_vendors)
            sources_summary[source_name] = len(source_vendors)
            print(f"Added {len(source_vendors)} vendors from {source_name}")
            
        except Exception as e:
            print(f"Error processing {source_file}: {e}")
    
    # Create output data structure
    output_data = {
        'vendors': combined_vendors,
        '_metadata': {
            'total_vendors': len(combined_vendors),
            'sources': sources_summary
        }
    }
    
    # Save combined data
    print(f"Saving combined data with {len(combined_vendors)} vendors to {output_file}...")
    save_json(output_data, output_file)

def main():
    parser = argparse.ArgumentParser(description='Combine vendor data from multiple scrapers')
    parser.add_argument('--sources', nargs='+', required=True,
                      help='List of JSON files with vendor data from different scrapers')
    parser.add_argument('--output', type=str, default='combined_data.json',
                      help='Output JSON file for combined vendor data')
    args = parser.parse_args()
    
    # Ensure source files exist
    valid_sources = []
    for source in args.sources:
        if os.path.exists(source):
            valid_sources.append(source)
        else:
            print(f"Warning: Source file not found: {source}")
    
    if not valid_sources:
        print("Error: No valid source files found")
        return
    
    # Combine data
    combine_data(valid_sources, args.output)

if __name__ == '__main__':
    main() 