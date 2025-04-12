import json
import os
import matplotlib.pyplot as plt
from collections import Counter

def load_json(file_path):
    """Load a JSON file with error handling."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: File {file_path} contains invalid JSON.")
        return None

def analyze_scraper_data(data, source_name):
    """Analyze the data from a scraper."""
    if not data:
        print(f"No data available for {source_name}.")
        return
    
    vendor_count = len(data)
    print(f"\n===== {source_name} Analysis =====")
    print(f"Total vendors found: {vendor_count}")
    
    # Parish analysis
    parishes = [vendor.get('parish', 'Unknown') for vendor in data]
    parish_counter = Counter(parishes)
    total_parishes = len(parish_counter)
    unknown_parishes = parish_counter.get('Unknown', 0)
    
    print(f"Parishes found: {total_parishes}")
    print(f"Vendors with unknown parish: {unknown_parishes} ({unknown_parishes/vendor_count*100:.1f}%)")
    print("\nParish distribution:")
    for parish, count in parish_counter.most_common():
        print(f"  {parish}: {count} vendors ({count/vendor_count*100:.1f}%)")
    
    # Produce type analysis
    if any('produce_types' in vendor for vendor in data):
        produce_types = []
        for vendor in data:
            if 'produce_types' in vendor and vendor['produce_types']:
                produce_types.extend(vendor['produce_types'])
        
        produce_counter = Counter(produce_types)
        print("\nProduce types distribution:")
        for produce, count in produce_counter.most_common():
            print(f"  {produce}: {count} occurrences")
        
        no_produce = sum(1 for vendor in data if 'produce_types' not in vendor or not vendor['produce_types'])
        print(f"Vendors with no produce types: {no_produce} ({no_produce/vendor_count*100:.1f}%)")
    
    return {
        'vendor_count': vendor_count,
        'parishes': parish_counter,
        'unknown_parishes': unknown_parishes,
        'unknown_parish_pct': unknown_parishes/vendor_count*100
    }

def compare_scrapers(original_data, enhanced_data):
    """Compare results between original and enhanced scrapers."""
    print("\n===== Scraper Comparison =====")
    
    if not original_data or not enhanced_data:
        print("Cannot compare scrapers: missing data.")
        return
    
    original_count = len(original_data)
    enhanced_count = len(enhanced_data)
    
    print(f"Vendor count comparison: Original: {original_count}, Enhanced: {enhanced_count}")
    
    # Compare parish coverage
    original_unknown = sum(1 for v in original_data if v.get('parish') == 'Unknown')
    enhanced_unknown = sum(1 for v in enhanced_data if v.get('parish') == 'Unknown')
    
    print(f"Parish coverage improvement: {original_unknown/original_count*100:.1f}% unknown in original vs {enhanced_unknown/enhanced_count*100:.1f}% unknown in enhanced")
    print(f"Parish identification improved by {original_unknown/original_count*100 - enhanced_unknown/enhanced_count*100:.1f} percentage points")
    
    # Generate visualizations
    if os.path.exists('scrapers/plots'):
        # Only create visualizations if the plots directory exists
        try:
            # Parish comparison bar chart
            original_parishes = Counter([v.get('parish', 'Unknown') for v in original_data])
            enhanced_parishes = Counter([v.get('parish', 'Unknown') for v in enhanced_data])
            
            all_parishes = sorted(set(list(original_parishes.keys()) + list(enhanced_parishes.keys())))
            
            fig, ax = plt.subplots(figsize=(15, 8))
            x = range(len(all_parishes))
            width = 0.35
            
            original_counts = [original_parishes.get(parish, 0) for parish in all_parishes]
            enhanced_counts = [enhanced_parishes.get(parish, 0) for parish in all_parishes]
            
            ax.bar([i - width/2 for i in x], original_counts, width, label='Original Scraper')
            ax.bar([i + width/2 for i in x], enhanced_counts, width, label='Enhanced Scraper')
            
            ax.set_ylabel('Vendor Count')
            ax.set_title('Parish Distribution Comparison')
            ax.set_xticks(x)
            ax.set_xticklabels(all_parishes, rotation=45, ha='right')
            ax.legend()
            
            plt.tight_layout()
            plt.savefig('scrapers/plots/parish_comparison.png')
            plt.close()
            
            print("Visualizations saved to scrapers/plots directory.")
        except Exception as e:
            print(f"Error creating visualizations: {e}")

def main():
    print("HedgeVeg Scraper Data Comparison")
    print("================================")
    
    # Load data from both scrapers
    original_data_path = 'scrapers/playwright_data.json'
    enhanced_data_path = 'scrapers/playwright_enhanced_data.json'
    
    original_data = load_json(original_data_path)
    enhanced_data = load_json(enhanced_data_path)
    
    # Analyze each dataset
    original_analysis = analyze_scraper_data(original_data, "Original Playwright Scraper")
    enhanced_analysis = analyze_scraper_data(enhanced_data, "Enhanced Playwright Scraper")
    
    # Compare the results
    if original_data and enhanced_data:
        compare_scrapers(original_data, enhanced_data)
        
        # Create plots directory if it doesn't exist
        plots_dir = 'scrapers/plots'
        if not os.path.exists(plots_dir):
            os.makedirs(plots_dir)
            print(f"Created directory: {plots_dir}")

if __name__ == "__main__":
    main() 