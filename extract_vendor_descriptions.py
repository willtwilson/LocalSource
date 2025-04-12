#!/usr/bin/env python3
import argparse
import os
import json
import re
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

def add_sample_vendors(samples: List[Dict[str, Any]], vendors_data: Dict[str, Any]) -> Dict[str, Any]:
    """Add sample vendor descriptions to the main vendor dataset."""
    vendors = vendors_data.get('vendors', [])
    
    # Create a name-based lookup for quicker matching
    vendor_map = {v.get('name', '').lower(): v for v in vendors}
    
    updated_count = 0
    added_count = 0
    
    for sample in samples:
        sample_name = sample.get('name', '').lower()
        if not sample_name:
            print("Warning: Sample vendor has no name, skipping")
            continue
            
        # Try to find a match in existing vendors
        if sample_name in vendor_map:
            # Update existing vendor with sample data
            vendor = vendor_map[sample_name]
            
            # Only override description if sample has a better one
            if sample.get('description') and (
                not vendor.get('description') or 
                len(sample.get('description', '')) > len(vendor.get('description', ''))
            ):
                vendor['description'] = sample.get('description')
                
            # Update other fields if available in sample
            for field in ['parish', 'produce_types', 'organic', 'cashless_payment']:
                if field in sample and sample[field]:
                    vendor[field] = sample[field]
                    
            updated_count += 1
        else:
            # Add as a new vendor if it has required fields
            if sample.get('name') and sample.get('parish'):
                new_vendor = {
                    'name': sample.get('name'),
                    'parish': sample.get('parish'),
                    'description': sample.get('description', ''),
                    'produce_types': sample.get('produce_types', []),
                    'organic': sample.get('organic', False),
                    'cashless_payment': sample.get('cashless_payment'),
                    'source': 'manual_sample'
                }
                vendors.append(new_vendor)
                added_count += 1
    
    # Update the vendors list in the data
    vendors_data['vendors'] = vendors
    
    # Update metadata if it exists
    if '_metadata' in vendors_data:
        vendors_data['_metadata']['updated_with_samples'] = {
            'updated_count': updated_count,
            'added_count': added_count,
            'total_samples': len(samples)
        }
    
    print(f"Updated {updated_count} vendors and added {added_count} new vendors from samples")
    return vendors_data

def parse_sample_file(file_path: str) -> List[Dict[str, Any]]:
    """Parse a text file with sample vendor data."""
    samples = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
        current_vendor = {}
        for line in lines:
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
                
            # Check for a new vendor entry (starts with '#' or 'Vendor:')
            if line.startswith('#') or line.startswith('Vendor:'):
                # Save previous vendor if exists
                if current_vendor and current_vendor.get('name'):
                    samples.append(current_vendor)
                    
                # Start a new vendor
                current_vendor = {}
                
                # Extract name if in this line
                name_match = re.search(r'(?:Vendor:|#)\s*(.+)', line)
                if name_match:
                    current_vendor['name'] = name_match.group(1).strip()
                
            # Check for parish
            elif 'Parish:' in line:
                parish = line.split('Parish:')[1].strip()
                current_vendor['parish'] = parish
                
            # Check for organic status
            elif 'Organic:' in line:
                organic_str = line.split('Organic:')[1].strip().lower()
                current_vendor['organic'] = organic_str in ['yes', 'true', '1']
                
            # Check for cashless payment
            elif 'Cashless' in line:
                cashless_str = line.split(':')[1].strip().lower() if ':' in line else 'no'
                current_vendor['cashless_payment'] = cashless_str in ['yes', 'true', '1']
                
            # Check for produce types
            elif 'Produce' in line and 'Sold' in line:
                produce_types = []
                # Look for produce types in subsequent lines
                idx = lines.index(line) + 1
                while idx < len(lines) and not lines[idx].strip().startswith(('#', 'Vendor:', 'Parish:', 'Organic:', 'Cashless')):
                    produce = lines[idx].strip()
                    if produce and not 'updated' in produce.lower():
                        produce_types.append(produce)
                    idx += 1
                    
                if produce_types:
                    current_vendor['produce_types'] = produce_types
                    
            # If line doesn't match any known field, it's probably part of the description
            elif current_vendor.get('name') and not any(x in line for x in ['Last updated:', 'Produce Sold']):
                if 'description' not in current_vendor:
                    current_vendor['description'] = line
                else:
                    current_vendor['description'] += ' ' + line
        
        # Add the last vendor
        if current_vendor and current_vendor.get('name'):
            samples.append(current_vendor)
            
    except Exception as e:
        print(f"Error parsing sample file: {e}")
        
    return samples

def add_specific_examples():
    """Add specific example vendors we know about."""
    samples = []
    
    # The Succulents' Lady example from the task
    succulents_lady = {
        'name': "The Succulents' Lady",
        'parish': "St Clement",
        'organic': False,
        'cashless_payment': True,
        'produce_types': ["Plants"],
        'description': "Providing succulents of different varieties in specially chosen containers, making features of both elements. Plus other plants when available. Also includes Macrame hangers etc on occasion."
    }
    samples.append(succulents_lady)
    
    # Add more examples here as needed
    
    return samples

def main():
    parser = argparse.ArgumentParser(description='Extract and update vendor descriptions from samples')
    parser.add_argument('--input', type=str, required=True,
                      help='Input JSON file with vendor data to update')
    parser.add_argument('--output', type=str,
                      help='Output JSON file (defaults to overwriting input)')
    parser.add_argument('--samples', type=str,
                      help='Text file containing sample vendor descriptions')
    parser.add_argument('--samples-dir', type=str,
                      help='Directory containing sample vendor descriptions')
    parser.add_argument('--add-examples', action='store_true',
                      help='Add hardcoded example vendors')
    parser.add_argument('--debug', action='store_true',
                      help='Show detailed debug information')
    
    args = parser.parse_args()
    
    # Set debug mode
    debug = args.debug
    if debug:
        print(f"DEBUG: Starting extraction with input={args.input}, output={args.output}")
    
    # Load vendor data
    print(f"Loading vendor data from {args.input}...")
    data = load_json(args.input)
    
    if debug:
        print(f"DEBUG: Loaded data with {len(data.get('vendors', []))} vendors")
    
    samples = []
    
    # Load samples from file if provided
    if args.samples:
        print(f"Parsing sample file {args.samples}...")
        file_samples = parse_sample_file(args.samples)
        samples.extend(file_samples)
        print(f"Found {len(file_samples)} vendors in sample file")
    
    # Load samples from directory if provided
    if args.samples_dir:
        samples_dir = args.samples_dir
        print(f"Searching for samples in {samples_dir}...")
        try:
            sample_files = [os.path.join(samples_dir, f) for f in os.listdir(samples_dir) 
                          if os.path.isfile(os.path.join(samples_dir, f)) and f.endswith('.txt')]
            
            dir_samples = []
            for sample_file in sample_files:
                print(f"Parsing sample file {sample_file}...")
                file_samples = parse_sample_file(sample_file)
                dir_samples.extend(file_samples)
                
            samples.extend(dir_samples)
            print(f"Found {len(dir_samples)} vendors in {len(sample_files)} sample files")
        except Exception as e:
            print(f"Error reading samples directory: {e}")
    
    # Add hardcoded examples if requested
    if args.add_examples:
        print("Adding hardcoded example vendors...")
        example_samples = add_specific_examples()
        samples.extend(example_samples)
        print(f"Added {len(example_samples)} example vendors")
    
    # Also check for samples in the default location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_samples_dir = os.path.join(script_dir, 'samples')
    if os.path.exists(default_samples_dir) and not args.samples_dir:
        print(f"Checking default samples directory {default_samples_dir}...")
        try:
            sample_files = [os.path.join(default_samples_dir, f) for f in os.listdir(default_samples_dir) 
                          if os.path.isfile(os.path.join(default_samples_dir, f)) and f.endswith('.txt')]
            
            default_samples = []
            for sample_file in sample_files:
                print(f"Parsing sample file {sample_file}...")
                file_samples = parse_sample_file(sample_file)
                default_samples.extend(file_samples)
                
            samples.extend(default_samples)
            print(f"Found {len(default_samples)} vendors in {len(sample_files)} default sample files")
        except Exception as e:
            print(f"Error reading default samples directory: {e}")
    
    if not samples:
        print("No sample data provided. Use --samples, --samples-dir, or --add-examples")
        return
    
    if debug:
        print(f"DEBUG: Processing {len(samples)} sample vendors")
    
    # Update vendor data with samples
    try:
        updated_data = add_sample_vendors(samples, data)
        if debug:
            print(f"DEBUG: Updated data now has {len(updated_data.get('vendors', []))} vendors")
    except Exception as e:
        print(f"Error updating vendors: {e}")
        return
    
    # Determine output path
    output_path = args.output if args.output else args.input
    
    # Save updated data
    print(f"Saving updated data to {output_path}...")
    try:
        save_success = save_json(updated_data, output_path)
        if save_success:
            print(f"Successfully saved updated data with {len(updated_data.get('vendors', []))} vendors")
        else:
            print("Failed to save updated data")
    except Exception as e:
        print(f"Error saving data: {e}")
        if debug:
            print(f"DEBUG: Output path attempted: {os.path.abspath(output_path)}")
            print(f"DEBUG: Current working directory: {os.getcwd()}")

if __name__ == '__main__':
    main() 