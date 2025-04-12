import json
import os
from pprint import pprint
from collections import Counter

def load_json(file_path):
    """Load a JSON file with error handling."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {file_path}")
        return None

def analyze_data(data, source_name):
    """Analyze data from a scraper."""
    if not data:
        print(f"No data available for {source_name}")
        return

    print(f"\n=== {source_name} Data Analysis ===")
    
    # Basic counts
    vendor_count = len(data.get('vendors', []))
    parish_count = len(data.get('parishes', []))
    produce_type_count = len(data.get('produce_types', []))
    
    print(f"Vendors: {vendor_count}")
    print(f"Parishes: {parish_count} - {', '.join(data.get('parishes', []))}")
    print(f"Produce Types: {produce_type_count} - {', '.join(data.get('produce_types', []))}")
    
    # Parish distribution
    parish_counter = Counter(vendor.get('parish') for vendor in data.get('vendors', []))
    print("\nParish Distribution:")
    for parish, count in parish_counter.most_common():
        print(f"  {parish}: {count} vendors ({count/vendor_count*100:.1f}%)")
    
    # Produce type distribution
    produce_counter = Counter()
    for vendor in data.get('vendors', []):
        for produce in vendor.get('produce_types', []):
            produce_counter[produce] += 1
    
    print("\nProduce Type Distribution:")
    for produce, count in produce_counter.most_common():
        print(f"  {produce}: {count} vendors ({count/vendor_count*100:.1f}%)")
    
    # Vendors with unknown parish
    unknown_parish = [v.get('name') for v in data.get('vendors', []) if v.get('parish') == 'Unknown']
    unknown_parish_count = len(unknown_parish)
    print(f"\nVendors with Unknown Parish: {unknown_parish_count} ({unknown_parish_count/vendor_count*100:.1f}%)")
    if unknown_parish_count > 0 and unknown_parish_count <= 5:
        print(f"  Examples: {', '.join(unknown_parish[:5])}")
    
    # Vendors with no produce types
    no_produce = [v.get('name') for v in data.get('vendors', []) if not v.get('produce_types')]
    no_produce_count = len(no_produce)
    print(f"\nVendors with No Produce Types: {no_produce_count} ({no_produce_count/vendor_count*100:.1f}%)")
    if no_produce_count > 0 and no_produce_count <= 5:
        print(f"  Examples: {', '.join(no_produce[:5])}")
    
    return {
        'vendor_count': vendor_count,
        'parish_count': parish_count,
        'produce_type_count': produce_type_count,
        'unknown_parish_count': unknown_parish_count,
        'no_produce_count': no_produce_count,
    }

def compare_data(puppeteer_data, playwright_data):
    """Compare data from both scrapers."""
    if not puppeteer_data or not playwright_data:
        print("Cannot compare: missing data from one or both scrapers")
        return
    
    print("\n=== Comparison Between Puppeteer and Playwright Data ===")
    
    # Compare vendor counts
    puppeteer_vendor_count = len(puppeteer_data.get('vendors', []))
    playwright_vendor_count = len(playwright_data.get('vendors', []))
    vendor_diff = abs(puppeteer_vendor_count - playwright_vendor_count)
    
    print(f"Vendor Count Difference: {vendor_diff} vendors ({vendor_diff/max(puppeteer_vendor_count, playwright_vendor_count)*100:.1f}%)")
    
    # Compare vendor names
    puppeteer_names = set(v.get('name') for v in puppeteer_data.get('vendors', []))
    playwright_names = set(v.get('name') for v in playwright_data.get('vendors', []))
    
    common_names = puppeteer_names.intersection(playwright_names)
    only_in_puppeteer = puppeteer_names - playwright_names
    only_in_playwright = playwright_names - puppeteer_names
    
    print(f"Vendors found in both: {len(common_names)}")
    print(f"Vendors only in Puppeteer: {len(only_in_puppeteer)}")
    print(f"Vendors only in Playwright: {len(only_in_playwright)}")
    
    if len(only_in_puppeteer) <= 5:
        print(f"  Only in Puppeteer examples: {', '.join(list(only_in_puppeteer)[:5])}")
    if len(only_in_playwright) <= 5:
        print(f"  Only in Playwright examples: {', '.join(list(only_in_playwright)[:5])}")
    
    # Compare parishes
    print("\nParish Comparison:")
    puppeteer_parishes = set(puppeteer_data.get('parishes', []))
    playwright_parishes = set(playwright_data.get('parishes', []))
    
    common_parishes = puppeteer_parishes.intersection(playwright_parishes)
    only_in_puppeteer_parishes = puppeteer_parishes - playwright_parishes
    only_in_playwright_parishes = playwright_parishes - puppeteer_parishes
    
    print(f"  Common parishes: {len(common_parishes)} - {', '.join(common_parishes)}")
    if only_in_puppeteer_parishes:
        print(f"  Only in Puppeteer: {', '.join(only_in_puppeteer_parishes)}")
    if only_in_playwright_parishes:
        print(f"  Only in Playwright: {', '.join(only_in_playwright_parishes)}")
    
    # Compare produce types
    print("\nProduce Type Comparison:")
    puppeteer_produce = set(puppeteer_data.get('produce_types', []))
    playwright_produce = set(playwright_data.get('produce_types', []))
    
    common_produce = puppeteer_produce.intersection(playwright_produce)
    only_in_puppeteer_produce = puppeteer_produce - playwright_produce
    only_in_playwright_produce = playwright_produce - puppeteer_produce
    
    print(f"  Common produce types: {len(common_produce)} - {', '.join(common_produce)}")
    if only_in_puppeteer_produce:
        print(f"  Only in Puppeteer: {', '.join(only_in_puppeteer_produce)}")
    if only_in_playwright_produce:
        print(f"  Only in Playwright: {', '.join(only_in_playwright_produce)}")
    
    # For vendors that appear in both datasets, compare parish and produce type assignments
    common_vendor_analysis = []
    
    puppeteer_vendor_map = {v.get('name'): v for v in puppeteer_data.get('vendors', [])}
    playwright_vendor_map = {v.get('name'): v for v in playwright_data.get('vendors', [])}
    
    parish_mismatches = 0
    produce_mismatches = 0
    
    for name in common_names:
        puppeteer_vendor = puppeteer_vendor_map.get(name, {})
        playwright_vendor = playwright_vendor_map.get(name, {})
        
        # Check parish match
        puppeteer_parish = puppeteer_vendor.get('parish', 'Unknown')
        playwright_parish = playwright_vendor.get('parish', 'Unknown')
        parish_match = puppeteer_parish == playwright_parish
        
        if not parish_match:
            parish_mismatches += 1
        
        # Check produce type overlap
        puppeteer_produce = set(puppeteer_vendor.get('produce_types', []))
        playwright_produce = set(playwright_vendor.get('produce_types', []))
        produce_overlap = len(puppeteer_produce.intersection(playwright_produce))
        produce_union = len(puppeteer_produce.union(playwright_produce))
        
        if produce_union > 0 and produce_overlap < produce_union:
            produce_mismatches += 1
        
        common_vendor_analysis.append({
            'name': name,
            'parish_match': parish_match,
            'puppeteer_parish': puppeteer_parish,
            'playwright_parish': playwright_parish,
            'produce_overlap': produce_overlap,
            'produce_union': produce_union,
        })
    
    print(f"\nFor vendors that appear in both datasets ({len(common_names)} vendors):")
    print(f"  Parish mismatches: {parish_mismatches} ({parish_mismatches/len(common_names)*100:.1f}%)")
    print(f"  Produce type mismatches: {produce_mismatches} ({produce_mismatches/len(common_names)*100:.1f}%)")
    
    # Show some examples of mismatches
    if parish_mismatches > 0:
        parish_mismatch_examples = [v for v in common_vendor_analysis if not v['parish_match']][:3]
        print("\n  Parish Mismatch Examples:")
        for example in parish_mismatch_examples:
            print(f"    {example['name']}: Puppeteer={example['puppeteer_parish']}, Playwright={example['playwright_parish']}")
    
    # Calculate overall quality score
    vendor_coverage_score = len(common_names) / max(len(puppeteer_names), len(playwright_names))
    parish_assignment_score = 1 - (parish_mismatches / len(common_names) if common_names else 0)
    produce_assignment_score = 1 - (produce_mismatches / len(common_names) if common_names else 0)
    
    quality_score = (vendor_coverage_score + parish_assignment_score + produce_assignment_score) / 3
    print(f"\nOverall Data Quality Score: {quality_score:.2f} out of 1.00")
    
    suggestions = []
    if vendor_coverage_score < 0.8:
        suggestions.append("Improve vendor detection to capture more vendors consistently")
    if parish_assignment_score < 0.8:
        suggestions.append("Enhance parish detection logic for better accuracy")
    if produce_assignment_score < 0.8:
        suggestions.append("Refine produce type detection for more consistent results")
    
    if suggestions:
        print("\nImprovement Suggestions:")
        for i, suggestion in enumerate(suggestions, 1):
            print(f"  {i}. {suggestion}")

def main():
    """Main function to compare scraper data."""
    puppeteer_file = os.path.join('scrapers', 'puppeteer_data.json')
    playwright_file = os.path.join('scrapers', 'playwright_data.json')
    
    print(f"Analyzing data from {puppeteer_file} and {playwright_file}")
    
    puppeteer_data = load_json(puppeteer_file)
    playwright_data = load_json(playwright_file)
    
    puppeteer_stats = analyze_data(puppeteer_data, "Puppeteer")
    playwright_stats = analyze_data(playwright_data, "Playwright")
    
    compare_data(puppeteer_data, playwright_data)
    
    print("\nDone!")

if __name__ == "__main__":
    main() 