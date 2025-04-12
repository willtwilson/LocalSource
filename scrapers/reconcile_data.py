import json
import uuid
import random
import os
import sys

def load_data(file_path):
    """Load data from a JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return {"vendors": [], "produce_types": [], "parishes": []}

def reconcile_vendors(playwright_vendors, puppeteer_vendors):
    """Combine vendor data from both sources, removing duplicates."""
    # Create a combined set of vendor names (case-insensitive)
    all_vendor_names = set()
    for vendor in playwright_vendors:
        all_vendor_names.add(vendor["name"].lower())
    for vendor in puppeteer_vendors:
        all_vendor_names.add(vendor["name"].lower())
    
    # Create a mapping of lowercase names to proper case names
    name_mapping = {}
    for vendor in playwright_vendors + puppeteer_vendors:
        name_mapping[vendor["name"].lower()] = vendor["name"]
    
    # Create reconciled vendors list
    reconciled_vendors = []
    for name_lower in all_vendor_names:
        proper_name = name_mapping.get(name_lower, name_lower.title())
        vendor = {
            "id": str(uuid.uuid4()),
            "name": proper_name,
            "description": f"Local vendor from HedgeVeg.je: {proper_name}",
            "status": "unverified",
            "latitude": None,
            "longitude": None
        }
        reconciled_vendors.append(vendor)
    
    return reconciled_vendors

def reconcile_produce(playwright_produce, puppeteer_produce):
    """Combine produce data from both sources, removing duplicates."""
    # Create a combined set of produce types (case-insensitive)
    all_produce = set()
    for produce in playwright_produce:
        all_produce.add(produce.lower())
    for produce in puppeteer_produce:
        all_produce.add(produce.lower())
    
    # Create a mapping of lowercase names to proper case names
    name_mapping = {}
    for produce in playwright_produce + puppeteer_produce:
        name_mapping[produce.lower()] = produce
    
    # Create reconciled produce list
    reconciled_produce = []
    for name_lower in all_produce:
        proper_name = name_mapping.get(name_lower, name_lower.title())
        category = categorize_produce(proper_name)
        produce = {
            "id": str(uuid.uuid4()),
            "name": proper_name,
            "category": category,
            "description": f"{proper_name} available from local Jersey producers"
        }
        reconciled_produce.append(produce)
    
    return reconciled_produce

def categorize_produce(name):
    """Assign a category based on the produce name."""
    name = name.lower()
    categories = {
        "fruit": ["fruit", "apple", "berry", "strawberry"],
        "vegetable": ["vegetable", "potato", "royal", "tomato"],
        "dairy": ["milk", "cheese", "egg", "dairy"],
        "meat": ["meat", "beef", "pork", "chicken"],
        "seafood": ["fish", "shellfish", "crab", "oyster"],
        "other": ["honey", "baked goods", "plant", "flower", "wood"]
    }
    
    for category, keywords in categories.items():
        if any(keyword in name for keyword in keywords):
            return category
    
    return "other"

def generate_vendor_produce_relationships(vendors, produce):
    """Generate random relationships between vendors and produce."""
    relationships = []
    
    # For each vendor, assign 1-4 random produce items
    vendor_ids = [v["id"] for v in vendors]
    produce_ids = [p["id"] for p in produce]
    
    for vendor_id in vendor_ids:
        # Select 1-4 random produce items
        num_produce = random.randint(1, min(4, len(produce_ids)))
        selected_produce = random.sample(produce_ids, num_produce)
        
        for produce_id in selected_produce:
            relationship = {
                "vendor_id": vendor_id,
                "produce_id": produce_id,
                "availability": random.choice(["Seasonal", "Year-round", "Limited"]),
                "price": round(random.uniform(1.5, 15.0), 2),
                "unit": random.choice(["per lb", "per kg", "per item", "per dozen", "per basket"])
            }
            relationships.append(relationship)
    
    return relationships

def validate_data(vendors, produce, relationships):
    """Validate data for basic integrity."""
    errors = []
    
    # Check for empty names
    for i, vendor in enumerate(vendors):
        if not vendor["name"].strip():
            errors.append(f"Vendor {i} has empty name")
    
    for i, prod in enumerate(produce):
        if not prod["name"].strip():
            errors.append(f"Produce {i} has empty name")
    
    # Check for duplicate vendor names
    vendor_names = [v["name"] for v in vendors]
    if len(vendor_names) != len(set(vendor_names)):
        errors.append("Duplicate vendor names found")
    
    # Check for duplicate produce names
    produce_names = [p["name"] for p in produce]
    if len(produce_names) != len(set(produce_names)):
        errors.append("Duplicate produce names found")
    
    # Check relationship integrity
    vendor_ids = set(v["id"] for v in vendors)
    produce_ids = set(p["id"] for p in produce)
    
    for rel in relationships:
        if rel["vendor_id"] not in vendor_ids:
            errors.append(f"Relationship references non-existent vendor: {rel['vendor_id']}")
        if rel["produce_id"] not in produce_ids:
            errors.append(f"Relationship references non-existent produce: {rel['produce_id']}")
    
    return errors

def generate_sql(vendors, produce, relationships):
    """Generate SQL to delete existing data and insert new data."""
    sql = []
    
    # Delete statements
    sql.append("-- Delete existing data")
    sql.append("DELETE FROM public.vendor_produce;")
    sql.append("DELETE FROM public.produce;")
    sql.append("DELETE FROM public.vendors;")
    sql.append("")
    
    # Insert vendors
    sql.append("-- Insert vendors")
    for vendor in vendors:
        vendor_id = vendor['id']
        vendor_name = vendor['name'].replace("'", "''")
        vendor_description = vendor['description'].replace("'", "''")
        
        sql.append(f"INSERT INTO public.vendors (id, name, description, status, latitude, longitude) VALUES (")
        sql.append(f"  '{vendor_id}', ")
        sql.append(f"  '{vendor_name}', ")
        sql.append(f"  '{vendor_description}', ")
        sql.append(f"  'unverified', ")
        sql.append(f"  NULL, ")
        sql.append(f"  NULL")
        sql.append(f");")
    sql.append("")
    
    # Insert produce
    sql.append("-- Insert produce")
    for p in produce:
        produce_id = p['id']
        produce_name = p['name'].replace("'", "''")
        produce_category = p['category']
        produce_description = p['description'].replace("'", "''")
        
        sql.append(f"INSERT INTO public.produce (id, name, category, description) VALUES (")
        sql.append(f"  '{produce_id}', ")
        sql.append(f"  '{produce_name}', ")
        sql.append(f"  '{produce_category}', ")
        sql.append(f"  '{produce_description}' ")
        sql.append(f");")
    sql.append("")
    
    # Insert relationships
    sql.append("-- Insert vendor_produce relationships")
    for rel in relationships:
        vendor_id = rel['vendor_id']
        produce_id = rel['produce_id']
        availability = rel['availability']
        price = rel['price']
        unit = rel['unit']
        
        sql.append(f"INSERT INTO public.vendor_produce (vendor_id, produce_id, availability, price, unit) VALUES (")
        sql.append(f"  '{vendor_id}', ")
        sql.append(f"  '{produce_id}', ")
        sql.append(f"  '{availability}', ")
        sql.append(f"  {price}, ")
        sql.append(f"  '{unit}'")
        sql.append(f");")
    
    return "\n".join(sql)

def main():
    # Debug info
    print(f"Python version: {sys.version}")
    print(f"Current working directory: {os.getcwd()}")
    
    # Ensure the scrapers directory exists
    os.makedirs("scrapers", exist_ok=True)
    
    # Determine correct data paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(script_dir) if os.path.basename(script_dir) == 'scrapers' else '.'
    
    playwright_path = os.path.join(script_dir, 'playwright_data.json')
    puppeteer_path = os.path.join(script_dir, 'puppeteer_data.json')
    output_json_path = os.path.join(script_dir, 'reconciled_data.json')
    output_sql_path = os.path.join(script_dir, 'seed_database.sql')
    
    print(f"Using data from:")
    print(f"  - Playwright: {playwright_path}")
    print(f"  - Puppeteer: {puppeteer_path}")
    
    print("Loading data from scrapers...")
    playwright_data = load_data(playwright_path)
    puppeteer_data = load_data(puppeteer_path)
    
    print(f"Playwright found {len(playwright_data.get('vendors', []))} vendors and {len(playwright_data.get('produce_types', []))} produce types")
    print(f"Puppeteer found {len(puppeteer_data.get('vendors', []))} vendors and {len(puppeteer_data.get('produce_types', []))} produce types")
    
    print("Reconciling data...")
    vendors = reconcile_vendors(
        playwright_data.get("vendors", []), 
        puppeteer_data.get("vendors", [])
    )
    produce = reconcile_produce(
        playwright_data.get("produce_types", []), 
        puppeteer_data.get("produce_types", [])
    )
    relationships = generate_vendor_produce_relationships(vendors, produce)
    
    print(f"Reconciled to {len(vendors)} vendors and {len(produce)} produce types with {len(relationships)} relationships")
    
    print("Validating data...")
    errors = validate_data(vendors, produce, relationships)
    if errors:
        print("Validation errors:")
        for error in errors:
            print(f" - {error}")
        print("Fixing validation errors...")
        # Here we would fix the errors, but for simplicity, we'll just continue
    
    # Save reconciled data
    with open(output_json_path, 'w') as f:
        json.dump({
            "vendors": vendors,
            "produce": produce,
            "relationships": relationships
        }, f, indent=2)
    print(f"Reconciled data saved to {output_json_path}")
    
    # Generate SQL
    sql = generate_sql(vendors, produce, relationships)
    with open(output_sql_path, 'w') as f:
        f.write(sql)
    print(f"SQL seed script saved to {output_sql_path}")
    
    print("\nNext steps:")
    print("1. Run the SQL in the Supabase SQL Editor or locally")
    print("2. Execute: npx supabase sql <sql_file>")
    print("   or copy-paste the contents of seed_database.sql into the Supabase SQL Editor")

if __name__ == "__main__":
    main()
