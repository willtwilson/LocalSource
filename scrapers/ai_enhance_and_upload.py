#!/usr/bin/env python3
import json
import os
import sys
import uuid
import random
from datetime import datetime
import requests
from dotenv import load_dotenv
# import anthropic - We'll use requests directly for OpenRouter
from supabase import create_client, Client

# Load environment variables
load_dotenv()
# ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY") or "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"
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SERVICE_ROLE_SECRET") or os.getenv("SUPABASE_ACCESS_TOKEN")  # Try both service role key options

print(f"SUPABASE_URL: {SUPABASE_URL}")
print(f"SUPABASE_KEY: {SUPABASE_KEY[:10]}..." if SUPABASE_KEY else "SUPABASE_KEY: Not found")
print(f"OPENROUTER_API_KEY: {OPENROUTER_API_KEY[:10]}..." if OPENROUTER_API_KEY else "OPENROUTER_API_KEY: Not found")

if not OPENROUTER_API_KEY:
    print("Error: OPENROUTER_API_KEY not found in environment variables.")
    sys.exit(1)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Supabase credentials not found in environment variables.")
    print("Available environment variables:")
    env_vars = [key for key in os.environ.keys() if "SUPABASE" in key or "VITE_SUPABASE" in key]
    for var in env_vars:
        print(f"  - {var}: {os.environ[var][:10]}..." if os.environ[var] else f"  - {var}: Not set")
    sys.exit(1)

# Initialize OpenRouter client
print("Using OpenRouter API for AI enhancement")

# Initialize Supabase client
try:
    supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(f"Supabase client initialized with URL: {SUPABASE_URL}")
    # Test the connection to verify it's working
    try:
        health_check = supabase_client.table("_dummy_query_for_connection_test").select("*").limit(1).execute()
        print("Supabase connection verified successfully")
    except Exception as e:
        print(f"Warning: Could not verify Supabase connection: {e}")
        print("Will attempt to continue but upload may fail")
except Exception as e:
    print(f"Error initializing Supabase client: {e}")
    sys.exit(1)

def load_data(file_path):
    """Load data from a JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return {"vendors": [], "produce_types": [], "parishes": []}

def save_data(data, file_path):
    """Save data to a JSON file."""
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving to {file_path}: {e}")

def enhance_vendor_with_ai(vendor_data, parish_data, produces_data):
    """Use OpenRouter to enhance vendor data with more accurate information."""
    
    # Prepare a prompt for the AI
    system_prompt = """
    You are an AI assistant helping to improve data quality for a Jersey (Channel Islands) local produce database.
    Your task is to analyze vendor information from web scrapers and enhance it with:
    1. More accurate parish information (if "Unknown")
    2. Better produce categorization
    3. Filling in missing details
    4. Standardizing information
    5. Generating a more comprehensive description
    
    Only output valid JSON data for a single vendor record.
    """
    
    user_prompt = f"""
    Here is a vendor record that needs enhancement:
    ```json
    {json.dumps(vendor_data, indent=2)}
    ```
    
    Available parishes in Jersey: {", ".join(parish_data)}
    Available produce types: {", ".join(produces_data)}
    
    Please analyze this data and produce an enhanced JSON record with these fields:
    - name: The vendor name (keep original unless it needs correction)
    - parish: The parish location (use one from the list, or "Unknown" if truly impossible to determine)
    - description: An enhanced description that combines and improves existing information
    - latitude: null (we'll fill this in later)
    - longitude: null (we'll fill this in later)
    - organic: true/false based on the information (or null if unclear)
    - cashless_payment: true/false based on the information (or null if unclear)
    - produce_types: Array of produce types sold from the available list
    - estimated_reliability: A score from 0-100 indicating how reliable this data seems
    
    Only output valid JSON. Return the full vendor record.
    """
    
    try:
        # Call OpenRouter API (routing to Claude model)
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://hedgeveg.je",  # Replace with your site URL
        }
        
        payload = {
            "model": "anthropic/claude-3-sonnet:20240229",  # Specify Claude model
            "max_tokens": 1000,
            "temperature": 0.2,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        }
        
        print(f"Making API call for vendor: {vendor_data.get('name', 'Unknown')}")
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        
        # Debug output for API response
        if response.status_code != 200:
            print(f"API Error: Status {response.status_code}")
            print(f"Response: {response.text}")
            return vendor_data
            
        response.raise_for_status()  # Raise exception for HTTP errors
        response_data = response.json()
        
        # Debug the response format
        if 'choices' not in response_data:
            print(f"Unexpected response format: {response_data.keys()}")
            return vendor_data
            
        # Extract JSON from the response
        ai_response = response_data['choices'][0]['message']['content']
        
        # Find JSON in the response
        import re
        json_match = re.search(r'```json\n([\s\S]*?)\n```', ai_response)
        if json_match:
            ai_response = json_match.group(1)
        elif ai_response.strip().startswith('{') and ai_response.strip().endswith('}'):
            # Already JSON format without markdown
            pass
        else:
            print(f"Could not extract JSON from response: {ai_response[:100]}...")
            return vendor_data
        
        # Parse the JSON
        try:
            enhanced_data = json.loads(ai_response)
            return enhanced_data
        except json.JSONDecodeError as e:
            print(f"JSON parse error: {e}")
            print(f"Attempted to parse: {ai_response[:100]}...")
            return vendor_data
    
    except Exception as e:
        print(f"Error enhancing vendor with AI: {e}")
        print(f"Failed on vendor: {vendor_data['name']}")
        # Return original data if enhancement fails
        return vendor_data

def consolidate_data(enhanced_playwright_data, enhanced_puppeteer_data):
    """Combine vendor data from both sources, removing duplicates, with improved matching."""
    
    # Create a mapping function to standardize vendor names for comparison
    def standardize_name(name):
        # Remove common prefixes/suffixes, lowercase, remove special chars, etc.
        std_name = name.lower()
        std_name = std_name.replace("farm", "").replace("stall", "").replace("honesty box", "")
        std_name = ''.join(c for c in std_name if c.isalnum() or c.isspace())
        return std_name.strip()
    
    # Create a combined dictionary with standardized names as keys
    consolidated = {}
    
    # Process Playwright data first
    for vendor in enhanced_playwright_data:
        std_name = standardize_name(vendor["name"])
        consolidated[std_name] = vendor
    
    # Process Puppeteer data, merging where standardized names match
    for vendor in enhanced_puppeteer_data:
        std_name = standardize_name(vendor["name"])
        if std_name in consolidated:
            # Merge the records, preferring higher estimated_reliability
            existing = consolidated[std_name]
            if vendor.get("estimated_reliability", 0) > existing.get("estimated_reliability", 0):
                consolidated[std_name] = vendor
            else:
                # Merge certain fields even if we keep the existing record
                if not existing.get("parish") or existing["parish"] == "Unknown":
                    existing["parish"] = vendor.get("parish", "Unknown")
                
                # Combine produce types
                existing_produce = set(existing.get("produce_types", []))
                vendor_produce = set(vendor.get("produce_types", []))
                existing["produce_types"] = list(existing_produce.union(vendor_produce))
                
                # Update the consolidated record
                consolidated[std_name] = existing
        else:
            # Add new record
            consolidated[std_name] = vendor
    
    # Convert back to list and add UUIDs
    consolidated_list = []
    for vendor in consolidated.values():
        vendor["id"] = str(uuid.uuid4())
        consolidated_list.append(vendor)
    
    return consolidated_list

def upload_to_supabase(vendors, produce_types):
    """Upload the enhanced data to Supabase."""
    
    # First check if tables exist
    try:
        # Check vendors table
        vendors_result = supabase_client.table("vendors").select("id").limit(1).execute()
        print(f"Vendors table check: {vendors_result.data}")
        
        # Check produce table
        produce_result = supabase_client.table("produce").select("id").limit(1).execute()
        print(f"Produce table check: {produce_result.data}")
    except Exception as e:
        print(f"Error checking tables: {e}")
        return False
    
    print(f"Uploading {len(vendors)} vendors and {len(produce_types)} produce types...")
    
    # Upload produce types first
    produce_records = []
    for produce in produce_types:
        produce_id = str(uuid.uuid4())
        category = categorize_produce(produce)
        produce_records.append({
            "id": produce_id,
            "name": produce,
            "category": category,
            "description": f"{produce} available from local Jersey producers"
        })
    
    try:
        # Insert in batches to avoid limitations
        batch_size = 50
        for i in range(0, len(produce_records), batch_size):
            batch = produce_records[i:i+batch_size]
            result = supabase_client.table("produce").upsert(batch).execute()
            print(f"Uploaded produce batch {i//batch_size + 1}: {len(batch)} records")
    except Exception as e:
        print(f"Error uploading produce types: {e}")
        return False
    
    # Map produce names to IDs for relationship creation
    produce_map = {p["name"]: p["id"] for p in produce_records}
    
    # Upload vendors
    vendor_records = []
    for vendor in vendors:
        # Create the vendor record
        vendor_record = {
            "id": vendor["id"],
            "name": vendor["name"],
            "description": vendor["description"],
            "parish": vendor["parish"],
            "latitude": vendor.get("latitude"),
            "longitude": vendor.get("longitude"),
            "organic": vendor.get("organic"),
            "cashless_payment": vendor.get("cashless_payment"),
            "status": "unverified",  # Default status
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        vendor_records.append(vendor_record)
    
    try:
        # Insert vendors in batches
        for i in range(0, len(vendor_records), batch_size):
            batch = vendor_records[i:i+batch_size]
            result = supabase_client.table("vendors").upsert(batch).execute()
            print(f"Uploaded vendor batch {i//batch_size + 1}: {len(batch)} records")
    except Exception as e:
        print(f"Error uploading vendors: {e}")
        return False
    
    # Create vendor-produce relationships
    relationships = []
    for vendor in vendors:
        for produce_type in vendor.get("produce_types", []):
            if produce_type in produce_map:
                relationship = {
                    "vendor_id": vendor["id"],
                    "produce_id": produce_map[produce_type],
                    "availability": random.choice(["Seasonal", "Year-round", "Limited"]),
                    "price": None,  # We don't have actual prices
                    "unit": None    # We don't have units
                }
                relationships.append(relationship)
    
    try:
        # Insert relationships in batches
        for i in range(0, len(relationships), batch_size):
            batch = relationships[i:i+batch_size]
            result = supabase_client.table("vendor_produce").upsert(batch).execute()
            print(f"Uploaded relationship batch {i//batch_size + 1}: {len(batch)} records")
    except Exception as e:
        print(f"Error uploading vendor-produce relationships: {e}")
        return False
    
    return True

def categorize_produce(name):
    """Assign a category based on the produce name."""
    name = name.lower()
    categories = {
        "fruit": ["fruit", "apple", "berry", "strawberry"],
        "vegetable": ["vegetable", "potato", "royal", "tomato"],
        "dairy": ["milk", "cheese", "egg", "dairy"],
        "meat": ["meat", "beef", "pork", "chicken"],
        "seafood": ["fish", "shellfish", "crab", "oyster"],
        "plants": ["plant", "flower"],
        "other": ["honey", "baked goods", "wood"]
    }
    
    for category, keywords in categories.items():
        if any(keyword in name for keyword in keywords):
            return category
    
    return "other"

def main():
    # Determine correct data paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Paths for input data
    playwright_path = os.path.join(script_dir, 'playwright_enhanced_data.json')
    puppeteer_path = os.path.join(script_dir, 'puppeteer_data.json')
    
    # Paths for output data
    enhanced_playwright_path = os.path.join(script_dir, 'enhanced_playwright_data.json')
    enhanced_puppeteer_path = os.path.join(script_dir, 'enhanced_puppeteer_data.json')
    consolidated_path = os.path.join(script_dir, 'ai_consolidated_data.json')
    
    print(f"Using data from:")
    print(f"  - Playwright: {playwright_path}")
    print(f"  - Puppeteer: {puppeteer_path}")
    
    # Load data
    playwright_data = load_data(playwright_path)
    puppeteer_data = load_data(puppeteer_path)
    
    # Extract parishes and produce types for AI enhancement
    parishes = sorted(list(set(
        playwright_data.get("parishes", []) + 
        puppeteer_data.get("parishes", [])
    )))
    
    produce_types = sorted(list(set(
        playwright_data.get("produce_types", []) + 
        puppeteer_data.get("produce_types", [])
    )))
    
    print(f"Found {len(parishes)} parishes and {len(produce_types)} produce types")
    
    # Enhance data with AI
    print("\nEnhancing Playwright data with AI...")
    enhanced_playwright_vendors = []
    for i, vendor in enumerate(playwright_data.get("vendors", [])):
        print(f"Processing vendor {i+1}/{len(playwright_data.get('vendors', []))}: {vendor.get('name', 'Unknown')}")
        enhanced_vendor = enhance_vendor_with_ai(vendor, parishes, produce_types)
        enhanced_playwright_vendors.append(enhanced_vendor)
    
    enhanced_playwright_data = {
        "vendors": enhanced_playwright_vendors,
        "parishes": parishes,
        "produce_types": produce_types,
        "_metadata": {
            "enhanced_at": datetime.now().isoformat(),
            "original_source": "playwright_enhanced_data.json",
            "ai_model": "OpenRouter - claude-3-sonnet"
        }
    }
    
    # Save enhanced Playwright data
    save_data(enhanced_playwright_data, enhanced_playwright_path)
    
    print("\nEnhancing Puppeteer data with AI...")
    enhanced_puppeteer_vendors = []
    for i, vendor in enumerate(puppeteer_data.get("vendors", [])):
        print(f"Processing vendor {i+1}/{len(puppeteer_data.get('vendors', []))}: {vendor.get('name', 'Unknown')}")
        enhanced_vendor = enhance_vendor_with_ai(vendor, parishes, produce_types)
        enhanced_puppeteer_vendors.append(enhanced_vendor)
    
    enhanced_puppeteer_data = {
        "vendors": enhanced_puppeteer_vendors,
        "parishes": parishes,
        "produce_types": produce_types,
        "_metadata": {
            "enhanced_at": datetime.now().isoformat(),
            "original_source": "puppeteer_data.json",
            "ai_model": "OpenRouter - claude-3-sonnet"
        }
    }
    
    # Save enhanced Puppeteer data
    save_data(enhanced_puppeteer_data, enhanced_puppeteer_path)
    
    # Consolidate enhanced data
    print("\nConsolidating enhanced data...")
    consolidated_vendors = consolidate_data(
        enhanced_playwright_vendors,
        enhanced_puppeteer_vendors
    )
    
    consolidated_data = {
        "vendors": consolidated_vendors,
        "parishes": parishes,
        "produce_types": produce_types,
        "_metadata": {
            "consolidated_at": datetime.now().isoformat(),
            "vendor_count": len(consolidated_vendors),
            "parish_count": len(parishes),
            "produce_type_count": len(produce_types),
            "consolidated_by": "ai_enhance_and_upload.py",
            "ai_model": "OpenRouter - claude-3-sonnet"
        }
    }
    
    # Save consolidated data
    save_data(consolidated_data, consolidated_path)
    
    # Check if we should skip the Supabase upload due to connection issues
    skip_upload = False
    try:
        # Test Supabase connection
        supabase_client.table("vendors").select("id").limit(1).execute()
    except Exception as e:
        print(f"\nSkipping Supabase upload due to connection issues: {e}")
        print("The enhanced and consolidated data has been saved locally.")
        skip_upload = True
    
    # Upload to Supabase if connection is available
    if not skip_upload:
        print("\nUploading data to Supabase...")
        success = upload_to_supabase(consolidated_vendors, produce_types)
        
        if success:
            print("\nData successfully uploaded to Supabase!")
        else:
            print("\nError occurred during Supabase upload. See logs above for details.")
            print("The enhanced and consolidated data has been saved locally.")
    
    print("\nProcess complete!")

if __name__ == "__main__":
    main() 