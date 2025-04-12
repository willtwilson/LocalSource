#!/usr/bin/env python3

import json
import os
import argparse
from datetime import datetime
from tabulate import tabulate

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

def calculate_accuracy_stats(data):
    """Calculate accuracy statistics from vendor data."""
    if not data:
        return None
    
    vendors = data.get("vendors", [])
    if not vendors:
        return None
    
    metadata = data.get("_metadata", {})
    total_vendors = len(vendors)
    
    # If metadata already has accuracy counts, use those
    if metadata and "high_accuracy_count" in metadata:
        return {
            "total_vendors": total_vendors,
            "high_accuracy_count": metadata.get("high_accuracy_count", 0),
            "high_accuracy_percentage": metadata.get("high_accuracy_percentage", 0),
            "medium_accuracy_count": metadata.get("medium_accuracy_count", 0),
            "medium_accuracy_percentage": metadata.get("medium_accuracy_percentage", 0),
            "low_accuracy_count": metadata.get("low_accuracy_count", 0),
            "low_accuracy_percentage": metadata.get("low_accuracy_percentage", 0),
            "improved_accuracy_percentage": metadata.get("improved_accuracy_percentage", 0),
            "has_unknown_parish": sum(1 for v in vendors if not v.get("parish", "")),
            "has_unknown_coordinates": sum(1 for v in vendors if "latitude" not in v or "longitude" not in v)
        }
    
    # Otherwise, calculate from vendor data
    high_accuracy_count = 0
    medium_accuracy_count = 0
    low_accuracy_count = 0
    
    for vendor in vendors:
        location_accuracy = vendor.get("location_accuracy", "low")
        if location_accuracy == "high":
            high_accuracy_count += 1
        elif location_accuracy == "medium":
            medium_accuracy_count += 1
        else:
            low_accuracy_count += 1
    
    high_accuracy_percentage = (high_accuracy_count / total_vendors) * 100 if total_vendors else 0
    medium_accuracy_percentage = (medium_accuracy_count / total_vendors) * 100 if total_vendors else 0
    low_accuracy_percentage = (low_accuracy_count / total_vendors) * 100 if total_vendors else 0
    
    return {
        "total_vendors": total_vendors,
        "high_accuracy_count": high_accuracy_count,
        "high_accuracy_percentage": high_accuracy_percentage,
        "medium_accuracy_count": medium_accuracy_count,
        "medium_accuracy_percentage": medium_accuracy_percentage,
        "low_accuracy_count": low_accuracy_count,
        "low_accuracy_percentage": low_accuracy_percentage,
        "improved_accuracy_percentage": high_accuracy_percentage + medium_accuracy_percentage,
        "has_unknown_parish": sum(1 for v in vendors if not v.get("parish", "")),
        "has_unknown_coordinates": sum(1 for v in vendors if "latitude" not in v or "longitude" not in v)
    }

def generate_report(files, output_file):
    """Generate accuracy report for multiple vendor data files."""
    print("\nGenerating vendor location accuracy report...")
    
    report_data = {
        "generated_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
        "files": {}
    }
    
    table_data = []
    
    # Process each file
    for label, file_path in files:
        print(f"Processing {label}: {file_path}")
        
        if not os.path.exists(file_path):
            print(f"  - Warning: File not found")
            continue
        
        data = load_json(file_path)
        if not data:
            continue
        
        stats = calculate_accuracy_stats(data)
        if not stats:
            print(f"  - Warning: Could not calculate statistics")
            continue
        
        # Add to report data
        report_data["files"][label] = {
            "path": file_path,
            "stats": stats
        }
        
        # Add to table data
        table_data.append([
            label,
            stats["total_vendors"],
            f"{stats['high_accuracy_count']} ({stats['high_accuracy_percentage']:.1f}%)",
            f"{stats['medium_accuracy_count']} ({stats['medium_accuracy_percentage']:.1f}%)",
            f"{stats['low_accuracy_count']} ({stats['low_accuracy_percentage']:.1f}%)",
            f"{stats['improved_accuracy_percentage']:.1f}%",
            stats["has_unknown_parish"],
            stats["has_unknown_coordinates"]
        ])
    
    # Generate table output
    headers = ["Stage", "Total", "High Accuracy", "Medium Accuracy", "Low Accuracy", "Improved %", "Unknown Parish", "No Coords"]
    table = tabulate(table_data, headers=headers, tablefmt="grid")
    
    # Save report to file
    if save_json(report_data, output_file):
        print(f"\nReport saved to {output_file}")
    
    # Print report summary
    print("\nVendor Location Accuracy Report Summary:")
    print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("\n" + table)
    
    # Add recommendations
    if table_data:
        last_stage = table_data[-1]
        high_accuracy = float(last_stage[2].split('(')[1].split('%')[0])
        
        print("\nRecommendations:")
        if high_accuracy < 50:
            print("- NEEDS IMPROVEMENT: High-accuracy vendor coordinates are below 50%")
            print("  - Research more vendor locations with precise coordinates")
            print("  - Add references to specific landmarks near each vendor")
        elif high_accuracy < 75:
            print("- ADEQUATE: High-accuracy vendor coordinates are between 50% and 75%")
            print("  - Consider researching more important vendor locations")
        else:
            print("- GOOD: High-accuracy vendor coordinates are above 75%")
            print("  - Location accuracy is excellent, focus on other data quality aspects")
    
    return True

def main():
    """Main function to parse arguments and generate report."""
    parser = argparse.ArgumentParser(description="Generate vendor location accuracy report")
    parser.add_argument("--output", default="vendor_accuracy_report.json", help="Output JSON report file path")
    args = parser.parse_args()
    
    # Define files to analyze (label, path)
    files = [
        ("Original Data", "geocoded_data.json"),
        ("Parish-Based Improvement", "improved_geocoded_data.json"),
        ("Research Enhancement", "researched_locations.json"),
        ("Final Enhanced Data", "fully_enhanced_data.json")
    ]
    
    # Update paths to include scrapers/ directory if not running from there
    files = [(label, f"scrapers/{path}" if not os.path.exists(path) else path) for label, path in files]
    
    # Update output path
    output_file = f"scrapers/{args.output}" if not args.output.startswith("scrapers/") else args.output
    
    generate_report(files, output_file)

if __name__ == "__main__":
    main() 