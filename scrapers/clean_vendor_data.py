#!/usr/bin/env python3
import json
import os
import re
import argparse
import time
from typing import Dict, List, Any, Set
from collections import Counter
from difflib import SequenceMatcher

# Valid parishes in Jersey
VALID_PARISHES = {
    "St. Helier", "St. Saviour", "St. Clement", "Grouville", "St. Martin",
    "Trinity", "St. John", "St. Mary", "St. Ouen", "St. Peter", "St. Brelade",
    "St. Lawrence"
}

# Valid produce types
VALID_PRODUCE = {
    "Vegetables", "Fruit", "Eggs", "Plants", "Flowers", "Herbs",
    "Honey", "Preserves", "Baked Goods", "Other"
}

# Parish name normalization mapping
PARISH_MAPPING = {
    "st helier": "St. Helier",
    "st. helier": "St. Helier",
    "sthelier": "St. Helier",
    "st saviour": "St. Saviour",
    "st. saviour": "St. Saviour",
    "stsaviour": "St. Saviour",
    "st clement": "St. Clement",
    "st. clement": "St. Clement",
    "stclement": "St. Clement",
    "grouville": "Grouville",
    "st martin": "St. Martin",
    "st. martin": "St. Martin",
    "stmartin": "St. Martin",
    "trinity": "Trinity",
    "st john": "St. John",
    "st. john": "St. John",
    "stjohn": "St. John",
    "st mary": "St. Mary",
    "st. mary": "St. Mary",
    "stmary": "St. Mary",
    "st ouen": "St. Ouen",
    "st. ouen": "St. Ouen",
    "stouen": "St. Ouen",
    "st peter": "St. Peter",
    "st. peter": "St. Peter",
    "stpeter": "St. Peter",
    "st brelade": "St. Brelade",
    "st. brelade": "St. Brelade",
    "stbrelade": "St. Brelade",
    "st lawrence": "St. Lawrence",
    "st. lawrence": "St. Lawrence",
    "stlawrence": "St. Lawrence",
}

# Produce type normalization mapping
PRODUCE_MAPPING = {
    "vegetable": "Vegetables",
    "vegetables": "Vegetables",
    "veg": "Vegetables",
    "vegs": "Vegetables",
    "fruit": "Fruit",
    "fruits": "Fruit",
    "egg": "Eggs",
    "eggs": "Eggs",
    "plant": "Plants",
    "plants": "Plants",
    "flower": "Flowers",
    "flowers": "Flowers",
    "herb": "Herbs",
    "herbs": "Herbs",
    "honey": "Honey",
    "preserve": "Preserves",
    "preserves": "Preserves",
    "jam": "Preserves",
    "jams": "Preserves",
    "pickle": "Preserves",
    "pickles": "Preserves",
    "chutney": "Preserves",
    "chutneys": "Preserves",
    "baked": "Baked Goods",
    "baked goods": "Baked Goods",
    "bakery": "Baked Goods",
    "bread": "Baked Goods",
    "cake": "Baked Goods",
    "cakes": "Baked Goods",
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

def clean_text(text: str) -> str:
    """Clean and standardize text fields."""
    if not text:
        return ""
        
    # Convert to string if not already
    text = str(text)
    
    # Trim whitespace
    text = text.strip()
    
    # Replace multiple spaces with a single space
    text = re.sub(r'\s+', ' ', text)
    
    # Remove non-printable characters
    text = ''.join(c for c in text if c.isprintable() or c.isspace())
    
    return text

def name_similarity(name1: str, name2: str) -> float:
    """Calculate similarity between two vendor names."""
    # Clean names for comparison
    clean_name1 = clean_text(name1).lower()
    clean_name2 = clean_text(name2).lower()
    
    # Use SequenceMatcher for string similarity
    return SequenceMatcher(None, clean_name1, clean_name2).ratio()

def is_duplicate(vendor: Dict[str, Any], existing_vendors: List[Dict[str, Any]], threshold: float = 0.85) -> bool:
    """Check if vendor is a duplicate of any existing vendor."""
    vendor_name = vendor.get('name', '').lower()
    
    for existing in existing_vendors:
        existing_name = existing.get('name', '').lower()
        
        # If names are very similar
        similarity = name_similarity(vendor_name, existing_name)
        if similarity >= threshold:
            return True
            
        # Check if one name contains the other completely
        if (vendor_name in existing_name or existing_name in vendor_name) and len(vendor_name) > 3 and len(existing_name) > 3:
            return True
    
    return False

def calculate_quality_score(vendor: Dict[str, Any]) -> float:
    """Calculate a quality score for the vendor data (0-100)."""
    score = 0
    max_score = 100
    
    # Check for required fields
    if vendor.get('name'):
        name_length = len(vendor.get('name', ''))
        if name_length > 3:
            score += 25  # Basic name present
            if name_length > 5:
                score += 5  # Longer name is better
    
    # Check for parish
    if vendor.get('parish') and vendor.get('parish') != 'Unknown':
        score += 15
    
    # Check for produce types
    produce_types = vendor.get('produceTypes', [])
    if produce_types:
        if len(produce_types) >= 1:
            score += 10
        if len(produce_types) >= 3:
            score += 10
    
    # Check for description
    description = vendor.get('description', '')
    if description:
        if len(description) > 10:
            score += 10
        if len(description) > 50:
            score += 10
    
    # Check for contact info (optional but valuable)
    if vendor.get('phone') or vendor.get('email'):
        score += 15
    
    # Cap at max_score
    return min(score, max_score)

def clean_vendor(vendor: Dict[str, Any]) -> Dict[str, Any]:
    """Clean and standardize vendor data."""
    cleaned = {}
    
    # Clean text fields
    for field in ['name', 'description', 'phone', 'email', 'website', 'address', 'parish']:
        if field in vendor and vendor[field]:
            cleaned[field] = clean_text(vendor[field])
        elif field == 'parish':
            cleaned[field] = 'Unknown'  # Default parish
    
    # Ensure required fields exist
    if 'name' not in cleaned or not cleaned['name']:
        cleaned['name'] = 'Unnamed Vendor'
    
    # Handle produce types
    if 'produceTypes' in vendor and isinstance(vendor['produceTypes'], list):
        # Clean and deduplicate produce types
        produce_types = set()
        for item in vendor['produceTypes']:
            if item and isinstance(item, str):
                cleaned_item = clean_text(item)
                if cleaned_item:
                    produce_types.add(cleaned_item)
        
        cleaned['produceTypes'] = sorted(list(produce_types))
    else:
        cleaned['produceTypes'] = []
    
    # Clean location fields
    for field in ['latitude', 'longitude']:
        if field in vendor and vendor[field] is not None:
            try:
                cleaned[field] = float(vendor[field])
            except (ValueError, TypeError):
                # Invalid value, don't include
                pass
    
    # Handle location accuracy if present
    if 'location_accuracy' in vendor:
        cleaned['location_accuracy'] = vendor['location_accuracy']
    
    # Calculate quality score
    cleaned['quality_score'] = calculate_quality_score(cleaned)
    
    # Add source information if present
    if 'source' in vendor:
        cleaned['source'] = vendor['source']
    
    return cleaned

def deduplicate_vendors(vendors: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Remove duplicate vendors, keeping the highest quality ones."""
    # Sort by quality score (highest first)
    sorted_vendors = sorted(vendors, key=lambda x: x.get('quality_score', 0), reverse=True)
    
    unique_vendors = []
    seen_names: Set[str] = set()
    
    for vendor in sorted_vendors:
        name = vendor.get('name', '').lower()
        
        # Skip if very similar to existing vendor
        if is_duplicate(vendor, unique_vendors):
            continue
            
        # Skip if exact name already seen
        if name in seen_names:
            continue
            
        unique_vendors.append(vendor)
        seen_names.add(name)
    
    return unique_vendors

def clean_description(vendor: Dict[str, Any]) -> Dict[str, Any]:
    """Clean description to remove redundant information, but preserve substantial original descriptions."""
    description = vendor.get('description', '')
    name = vendor.get('name', '')
    parish = vendor.get('parish', '')
    produce_types = vendor.get('produceTypes', [])
    
    if not description:
        return vendor
    
    # If description is substantial (more than just a basic phrase), preserve it largely as is
    if len(description) > 40 and len(description.split()) > 8:
        # Just do minimal cleanup for substantial descriptions
        cleaned_desc = re.sub(r'\s+', ' ', description)  # Fix multiple spaces
        cleaned_desc = cleaned_desc.strip()
        vendor['description'] = cleaned_desc
        return vendor
    
    # For minimal descriptions, do more thorough cleaning
    
    # Remove redundant name mentions
    if name and len(name) > 3:
        description = re.sub(rf'\b{re.escape(name)}\b', '', description, flags=re.IGNORECASE)
    
    # Remove redundant parish mentions
    if parish and parish != 'Unknown':
        description = re.sub(rf'\b{re.escape(parish)}\b', '', description, flags=re.IGNORECASE)
    
    # Remove redundant produce type mentions
    for produce in produce_types:
        if produce and len(produce) > 3:
            description = re.sub(rf'\b{re.escape(produce)}\b', '', description, flags=re.IGNORECASE)
    
    # Remove phrases like "sells" or "offers"
    description = re.sub(r'\b(sells|offers|has|provides|specializes in)\b', '', description, flags=re.IGNORECASE)
    
    # Clean up multiple spaces, punctuation, etc.
    description = re.sub(r'\s+', ' ', description)
    description = re.sub(r'^\s*[,;:.]\s*', '', description)
    description = re.sub(r'\s*[,;:.]\s*$', '', description)
    description = description.strip()
    
    # Update vendor
    vendor['description'] = description
    
    return vendor

def clean_vendors(vendors: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Clean all vendors in the list."""
    # Initial cleaning
    cleaned_vendors = [clean_vendor(vendor) for vendor in vendors]
    
    # Deduplicate
    unique_vendors = deduplicate_vendors(cleaned_vendors)
    
    # Clean descriptions
    final_vendors = [clean_description(vendor) for vendor in unique_vendors]
    
    return final_vendors

def print_summary(vendors: List[Dict[str, Any]]) -> None:
    """Print summary statistics about the vendors."""
    total_vendors = len(vendors)
    
    # Count parishes
    parish_counts = Counter([v.get('parish', 'Unknown') for v in vendors])
    
    # Count produce types
    all_produce = []
    for vendor in vendors:
        all_produce.extend(vendor.get('produce_types', []))
    produce_counts = Counter(all_produce)
    
    # Quality score distribution
    quality_scores = [v.get('quality_score', 0) for v in vendors]
    avg_quality = sum(quality_scores) / len(quality_scores) if quality_scores else 0
    
    # Count vendors with low quality scores
    low_quality = sum(1 for s in quality_scores if s < 50)
    
    print("\nData Summary:")
    print(f"Total Vendors: {total_vendors}")
    print(f"Average Quality Score: {avg_quality:.2f}")
    print(f"Low Quality Vendors (<50): {low_quality} ({low_quality/total_vendors*100:.1f}%)")
    
    print("\nParish Distribution:")
    for parish, count in parish_counts.most_common():
        print(f"  {parish}: {count} ({count/total_vendors*100:.1f}%)")
    
    print("\nProduce Type Distribution:")
    for produce, count in produce_counts.most_common():
        print(f"  {produce}: {count} ({count/len(all_produce)*100:.1f}% of all produce mentions)")

def main():
    parser = argparse.ArgumentParser(description='Clean vendor data for Supabase upload')
    parser.add_argument('--input', type=str, default='combined_data.json',
                      help='Input JSON file with raw vendor data')
    parser.add_argument('--output', type=str, default='cleaned_data.json',
                      help='Output JSON file for cleaned vendor data')
    parser.add_argument('--min-quality', type=float, default=40.0,
                      help='Minimum quality score to include vendor (0-100)')
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
    
    # Clean vendors
    print("Cleaning and deduplicating vendors...")
    cleaned_vendors = clean_vendors(vendors)
    
    # Filter by minimum quality score
    quality_filtered = [v for v in cleaned_vendors if v.get('quality_score', 0) >= args.min_quality]
    
    # Update data
    output_data = {
        'vendors': quality_filtered,
        '_metadata': {
            'original_count': len(vendors),
            'cleaned_count': len(cleaned_vendors),
            'final_count': len(quality_filtered),
            'min_quality_score': args.min_quality
        }
    }
    
    # Save data
    print(f"Saving cleaned data to {output_path}...")
    if save_data(output_data, output_path):
        print(f"Successfully saved {len(quality_filtered)} cleaned vendors.")
        print(f"Removed {len(vendors) - len(cleaned_vendors)} duplicates.")
        print(f"Filtered out {len(cleaned_vendors) - len(quality_filtered)} low-quality entries.")
    else:
        print("Failed to save cleaned data.")

if __name__ == '__main__':
    main() 