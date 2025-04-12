-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Vendor table
CREATE TABLE vendor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT) NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create VendorType table
CREATE TABLE vendor_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Create junction table Vendor_VendorType
CREATE TABLE vendor_vendor_type (
    vendor_id UUID REFERENCES vendor(id) ON DELETE CASCADE,
    vendor_type_id UUID REFERENCES vendor_type(id) ON DELETE CASCADE,
    PRIMARY KEY (vendor_id, vendor_type_id)
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vendor_updated_at
    BEFORE UPDATE ON vendor
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create spatial index on vendor location
CREATE INDEX idx_vendor_location ON vendor USING GIST (location);

-- Add basic vendor types
INSERT INTO vendor_type (id, name, description) VALUES
    (uuid_generate_v4(), 'Hedge Veg', 'Local produce sold from hedgerows and honesty boxes'),
    (uuid_generate_v4(), 'Farm Shop', 'Farm-based retail shop selling local produce'),
    (uuid_generate_v4(), 'Market Stall', 'Vendor operating at local markets'),
    (uuid_generate_v4(), 'Home Producer', 'Home-based food or craft producer'),
    (uuid_generate_v4(), 'Local Shop', 'Small local retail shop'); 