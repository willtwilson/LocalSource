#!/usr/bin/env python3
import json
import os
import re
import string
from datetime import datetime

def load_data(file_path):
    """Load data from a JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def save_data(data, file_path):
    """Save data to a JSON file."""
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Data saved to {file_path}")
        return True
    except Exception as e:
        print(f"Error saving to {file_path}: {e}")
        return False

def clean_description(vendor):
    """Clean or generate description based on vendor data.
    Preserves original description if it exists and is substantial.
    """
    # Check if there's an existing meaningful description
    existing_desc = vendor.get("description", "").strip()
    if existing_desc and len(existing_desc) > 20:
        # Keep original description as is
        return existing_desc
        
    # Otherwise generate a new description
    name = vendor.get("name", "").strip()
    parish = vendor.get("parish", "").strip()
    produce_types = vendor.get("produce_types", [])
    organic = vendor.get("organic", False)
    cashless = vendor.get("cashless_payment", None)

    # Check if the name appears to be a location/address
    is_location = any(x in name.lower() for x in ["road", "lane", "street", "avenue", "rue", "route", "chemin", "mont", "le", "la"])
    
    # Basic description
    description = ""
    
    # Add intro based on whether this is a named vendor or location
    if is_location:
        description = f"Roadside stall located on {name} in {parish}, offering "
    else:
        description = f"Local vendor in {parish} offering "
    
    # Add produce information
    if produce_types:
        # Format the produce list nicely
        if len(produce_types) == 1:
            description += f"{produce_types[0].lower()}"
        elif len(produce_types) == 2:
            description += f"{produce_types[0].lower()} and {produce_types[1].lower()}"
        else:
            formatted_types = [t.lower() for t in produce_types]
            description += f"{', '.join(formatted_types[:-1])}, and {formatted_types[-1]}"
    else:
        description += "local produce"
    
    # Add organic status if applicable
    if organic:
        description += ". Organically grown"
    
    # Add payment information if known
    if cashless is not None:
        if cashless:
            description += ". Accepts cashless payments"
        else:
            description += ". Cash only"
    
    # Ensure the description ends with a period
    if not description.endswith("."):
        description += "."
        
    return description

def is_poor_quality(vendor):
    """Identify entries that are likely poor quality and should be flagged."""
    # Calculate a quality score for the vendor
    quality_score = 0
    
    # Check if essential fields are present and non-empty
    if vendor.get("name") and len(vendor.get("name", "").strip()) > 2:
        quality_score += 20
    
    if vendor.get("parish") and vendor.get("parish") != "Unknown":
        quality_score += 20
    
    if vendor.get("description") and len(vendor.get("description", "").strip()) > 20:
        quality_score += 20
    
    if vendor.get("produce_types") and len(vendor.get("produce_types", [])) > 0:
        quality_score += 20
        # Bonus for multiple produce types
        if len(vendor.get("produce_types", [])) > 1:
            quality_score += 10
    
    # Check if reliability score is decent
    reliability = vendor.get("estimated_reliability", 0)
    if reliability >= 75:
        quality_score += 10
    elif reliability >= 50:
        quality_score += 5
    
    # Flag as poor quality if score is below threshold
    return quality_score < 60  # Threshold for poor quality

def remove_duplicates(vendors):
    """Remove duplicate vendors based on name similarity."""
    # Dictionary to store unique vendors
    unique_vendors = {}
    duplicate_count = 0
    
    # Function to standardize vendor names for comparison
    def standardize_name(name):
        # Convert to lowercase
        name = name.lower()
        # Remove punctuation
        name = name.translate(str.maketrans('', '', string.punctuation))
        # Remove common words
        for word in ['honesty', 'box', 'farm', 'stall', 'the', 'jersey']:
            name = re.sub(r'\b' + word + r'\b', '', name)
        # Remove extra spaces
        name = re.sub(r'\s+', ' ', name).strip()
        return name
    
    # Process each vendor
    for vendor in vendors:
        std_name = standardize_name(vendor["name"])
        
        # Check if this vendor is similar to one we've already seen
        if std_name in unique_vendors:
            duplicate_count += 1
            # Keep the vendor with higher estimated_reliability
            existing = unique_vendors[std_name]
            if vendor.get("estimated_reliability", 0) > existing.get("estimated_reliability", 0):
                unique_vendors[std_name] = vendor
            else:
                # If the existing vendor has higher reliability, keep it but merge produce types
                existing_produce = set(existing.get("produce_types", []))
                vendor_produce = set(vendor.get("produce_types", []))
                existing["produce_types"] = list(existing_produce.union(vendor_produce))
        else:
            unique_vendors[std_name] = vendor
    
    print(f"Removed {duplicate_count} duplicate vendors")
    return list(unique_vendors.values())

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Input consolidated data file
    input_path = os.path.join(script_dir, 'ai_consolidated_data.json')
    
    # Output files
    cleaned_path = os.path.join(script_dir, 'cleaned_data.json')
    flagged_path = os.path.join(script_dir, 'flagged_entries.json')
    
    # Load the consolidated data
    data = load_data(input_path)
    if not data:
        print("Failed to load data. Exiting.")
        return
    
    vendors = data.get("vendors", [])
    print(f"Loaded {len(vendors)} vendors from {input_path}")
    
    # Remove duplicates first
    vendors = remove_duplicates(vendors)
    print(f"After removing duplicates: {len(vendors)} vendors")
    
    # Clean up vendors and identify poor quality entries
    cleaned_vendors = []
    flagged_vendors = []
    
    for vendor in vendors:
        # Clean the description
        vendor["description"] = clean_description(vendor)
        
        # Check if it's a poor quality entry
        if is_poor_quality(vendor):
            vendor["flagged"] = True
            flagged_vendors.append(vendor)
        else:
            vendor["flagged"] = False
            cleaned_vendors.append(vendor)
    
    print(f"Cleaned {len(cleaned_vendors)} vendors")
    print(f"Flagged {len(flagged_vendors)} vendors as poor quality")
    
    # Save cleaned data
    cleaned_data = {
        "vendors": cleaned_vendors,
        "parishes": data.get("parishes", []),
        "produce_types": data.get("produce_types", []),
        "_metadata": {
            "cleaned_at": datetime.now().isoformat(),
            "vendor_count": len(cleaned_vendors),
            "flagged_count": len(flagged_vendors),
            "original_source": "ai_consolidated_data.json",
            "cleaning_process": "description cleanup, duplicate removal, quality filtering"
        }
    }
    
    # Save flagged data
    flagged_data = {
        "vendors": flagged_vendors,
        "parishes": data.get("parishes", []),
        "produce_types": data.get("produce_types", []),
        "_metadata": {
            "flagged_at": datetime.now().isoformat(),
            "vendor_count": len(flagged_vendors),
            "original_source": "ai_consolidated_data.json",
            "flagging_criteria": "low quality score (missing data, low reliability, etc.)"
        }
    }
    
    save_data(cleaned_data, cleaned_path)
    save_data(flagged_data, flagged_path)
    
    print(f"Cleaned data saved to {cleaned_path}")
    print(f"Flagged entries saved to {flagged_path}")
    print("Next steps: Add geocoding to get latitude/longitude coordinates for each vendor")

if __name__ == "__main__":
    main() 