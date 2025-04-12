#!/usr/bin/env python3
import json
import os
import re
import argparse
from typing import Dict, List, Any, Tuple
from collections import Counter
import time

# Known Jersey parishes
VALID_PARISHES = {
    'St. Ouen', 'St. Mary', 'St. John', 'Trinity', 'St. Martin',
    'Grouville', 'St. Clement', 'St. Saviour', 'St. Helier',
    'St. Brelade', 'St. Peter', 'St. Lawrence'
}

# Known produce types
VALID_PRODUCE = {
    'Vegetables', 'Fruit', 'Eggs', 'Flowers', 'Plants', 'Homemade Goods'
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

def save_data(data: Dict[str, Any], file_path: str) -> None:
    """Save vendor data to JSON file."""
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")

def normalize_parish(parish: str) -> str:
    """Normalize parish name to standard format."""
    if not parish:
        return "Unknown"
    
    # Remove 'Parish' if it appears at the end
    parish = re.sub(r'Parish$', '', parish).strip()
    
    # Normalize abbreviations
    parish = parish.replace('St ', 'St. ')
    
    # Check if the normalized parish is valid
    if parish in VALID_PARISHES:
        return parish
    
    # Try to match closest valid parish
    for valid_parish in VALID_PARISHES:
        if valid_parish.lower() in parish.lower():
            return valid_parish
    
    return "Unknown"

def normalize_produce_types(produce_types: List[str]) -> List[str]:
    """Normalize produce types to standard format."""
    if not produce_types:
        return []
    
    normalized = []
    for produce in produce_types:
        produce = produce.strip()
        # Direct match
        if produce in VALID_PRODUCE:
            normalized.append(produce)
            continue
        
        # Try to match by substring
        matched = False
        for valid_produce in VALID_PRODUCE:
            if (valid_produce.lower() in produce.lower() or 
                produce.lower() in valid_produce.lower()):
                normalized.append(valid_produce)
                matched = True
                break
        
        # If no match, keep the original as is
        if not matched and produce:
            normalized.append(produce)
    
    # Remove duplicates while preserving order
    return list(dict.fromkeys(normalized))

def clean_description(description: str, vendor_name: str, parish: str, produce_types: List[str]) -> str:
    """Clean description to remove redundant information."""
    if not description:
        return ""
    
    # Remove vendor name from description
    if vendor_name and vendor_name.strip() in description:
        description = description.replace(vendor_name.strip(), "").strip()
    
    # Remove parish from description
    if parish and parish != "Unknown":
        description = re.sub(r'\b' + re.escape(parish) + r'\b', "", description, flags=re.IGNORECASE)
    
    # Remove produce types from description
    for produce in produce_types:
        if produce:
            description = re.sub(r'\b' + re.escape(produce) + r'\b', "", description, flags=re.IGNORECASE)
    
    # Clean up multiple spaces, commas, etc.
    description = re.sub(r'\s+', ' ', description).strip()
    description = re.sub(r',\s*,', ',', description).strip()
    description = re.sub(r'^\s*,\s*|\s*,\s*$', '', description).strip()
    
    return description

def assess_vendor_quality(vendor: Dict[str, Any]) -> Tuple[int, List[str]]:
    """Assess vendor data quality and return a score (0-100) and issues list."""
    score = 100
    issues = []
    
    # Check name
    if not vendor.get('name'):
        score -= 30
        issues.append("Missing vendor name")
    elif len(vendor.get('name', '')) < 3:
        score -= 15
        issues.append("Very short vendor name")
    
    # Check parish
    if not vendor.get('parish') or vendor.get('parish') == "Unknown":
        score -= 20
        issues.append("Missing or unknown parish")
    
    # Check produce types
    if not vendor.get('produce_types') or len(vendor.get('produce_types', [])) == 0:
        score -= 20
        issues.append("No produce types listed")
    
    # Check description
    if not vendor.get('description'):
        score -= 10
        issues.append("Missing description")
    elif len(vendor.get('description', '')) < 10:
        score -= 5
        issues.append("Very short description")
    
    # Cap score at 0
    return max(0, score), issues

def find_duplicates(vendors: List[Dict[str, Any]]) -> Dict[str, List[int]]:
    """Find potential duplicate vendors and return their indices."""
    duplicates = {}
    
    for i, vendor1 in enumerate(vendors):
        for j, vendor2 in enumerate(vendors):
            if i >= j:  # Skip self-comparison and pairs we've already checked
                continue
            
            # Check if names are similar (case insensitive)
            name_similar = False
            if vendor1.get('name') and vendor2.get('name'):
                name1 = vendor1['name'].lower()
                name2 = vendor2['name'].lower()
                
                # Simple similarity check (edit distance would be better)
                if name1 == name2 or name1 in name2 or name2 in name1:
                    name_similar = True
            
            # Check if same parish
            same_parish = (vendor1.get('parish') == vendor2.get('parish') and 
                          vendor1.get('parish') != "Unknown")
            
            # If both conditions match, consider them potential duplicates
            if name_similar and same_parish:
                # Use vendor1's name as key
                key = vendor1.get('name', f"Unnamed Vendor {i}")
                if key not in duplicates:
                    duplicates[key] = [i]
                duplicates[key].append(j)
    
    return duplicates

def clean_vendors(vendors: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """Clean and normalize vendor data, remove duplicates, assess quality."""
    cleaned_vendors = []
    stats = {
        'total_original': len(vendors),
        'duplicates_removed': 0,
        'low_quality': 0,
        'unknown_parish': 0,
        'no_produce': 0,
        'parish_counts': Counter(),
        'produce_counts': Counter()
    }
    
    print(f"Cleaning {len(vendors)} vendors...")
    
    # First pass: normalize and clean data
    for i, vendor in enumerate(vendors):
        # Make a copy to avoid modifying the original
        cleaned = vendor.copy()
        
        # Normalize parish
        cleaned['parish'] = normalize_parish(vendor.get('parish', ''))
        
        # Normalize produce types
        cleaned['produce_types'] = normalize_produce_types(vendor.get('produce_types', []))
        
        # Clean description
        cleaned['description'] = clean_description(
            vendor.get('description', ''),
            vendor.get('name', ''),
            cleaned['parish'],
            cleaned['produce_types']
        )
        
        # Assess quality
        quality_score, issues = assess_vendor_quality(cleaned)
        cleaned['quality_score'] = quality_score
        cleaned['quality_issues'] = issues
        
        # Add to cleaned list
        cleaned_vendors.append(cleaned)
        
        # Update statistics
        if cleaned['parish'] == "Unknown":
            stats['unknown_parish'] += 1
        else:
            stats['parish_counts'][cleaned['parish']] += 1
            
        if not cleaned.get('produce_types'):
            stats['no_produce'] += 1
        else:
            for produce in cleaned['produce_types']:
                stats['produce_counts'][produce] += 1
        
        if quality_score < 50:
            stats['low_quality'] += 1
    
    # Find duplicates
    duplicates = find_duplicates(cleaned_vendors)
    stats['duplicate_sets'] = len(duplicates)
    
    # Second pass: remove duplicates, keeping the one with the highest quality score
    if duplicates:
        # Get all indices that are part of a duplicate set
        all_duplicate_indices = set()
        for dup_set in duplicates.values():
            all_duplicate_indices.update(dup_set)
        
        # Create a new list without duplicates
        deduped_vendors = []
        for i, vendor in enumerate(cleaned_vendors):
            if i not in all_duplicate_indices:
                # Not a duplicate, add to the new list
                deduped_vendors.append(vendor)
            elif i in all_duplicate_indices:
                # This is a duplicate, find which set it belongs to
                for name, indices in duplicates.items():
                    if i in indices:
                        # If this is the first one we're seeing from this set, add it
                        if not any(j in all_duplicate_indices for j in indices if j < i):
                            # Find the vendor with the highest quality score
                            best_idx = max(indices, key=lambda idx: cleaned_vendors[idx]['quality_score'])
                            deduped_vendors.append(cleaned_vendors[best_idx])
                            stats['duplicates_removed'] += len(indices) - 1
                        break
        
        cleaned_vendors = deduped_vendors
    
    # Update final count
    stats['total_cleaned'] = len(cleaned_vendors)
    
    # Convert Counter objects to regular dictionaries for JSON serialization
    stats['parish_counts'] = dict(stats['parish_counts'])
    stats['produce_counts'] = dict(stats['produce_counts'])
    
    return cleaned_vendors, stats

def add_metadata(data: Dict[str, Any], stats: Dict[str, Any]) -> Dict[str, Any]:
    """Add metadata to the cleaned dataset."""
    result = data.copy()
    
    # Add metadata
    result['metadata'] = {
        'cleaned_at': time.strftime('%Y-%m-%d %H:%M:%S'),
        'cleaning_stats': stats,
        'clean_version': '1.0'
    }
    
    return result

def main():
    parser = argparse.ArgumentParser(description='Clean and normalize HedgeVeg vendor data')
    parser.add_argument('--input', type=str, default='playwright_enhanced_data.json',
                        help='Input JSON file with vendor data')
    parser.add_argument('--output', type=str, default='cleaned_data.json',
                        help='Output JSON file for cleaned data')
    args = parser.parse_args()
    
    # Ensure input file path is correct
    input_path = args.input
    if not os.path.isabs(input_path):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        input_path = os.path.join(script_dir, input_path)
    
    # Load data
    data = load_data(input_path)
    
    # Get vendors from data
    vendors = data.get('vendors', [])
    if not vendors:
        print("No vendors found in the input file.")
        return
    
    # Clean vendors
    cleaned_vendors, stats = clean_vendors(vendors)
    
    # Update data with cleaned vendors
    data['vendors'] = cleaned_vendors
    
    # Add metadata
    data = add_metadata(data, stats)
    
    # Ensure output file path is correct
    output_path = args.output
    if not os.path.isabs(output_path):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(script_dir, output_path)
    
    # Save cleaned data
    save_data(data, output_path)
    
    # Print summary
    print("\nCleaning Summary:")
    print(f"Original vendors: {stats['total_original']}")
    print(f"Cleaned vendors: {stats['total_cleaned']}")
    print(f"Duplicates removed: {stats['duplicates_removed']}")
    print(f"Low quality vendors: {stats['low_quality']}")
    print(f"Vendors with unknown parish: {stats['unknown_parish']}")
    print(f"Vendors with no produce: {stats['no_produce']}")

if __name__ == '__main__':
    main() 