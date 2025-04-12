-- Create Favourite table
CREATE TABLE favourite (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL REFERENCES vendor(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, vendor_id)
);

-- Create LowStockReport table
CREATE TABLE low_stock_report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL REFERENCES vendor(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

-- Create SubmittedVendor table
CREATE TABLE submitted_vendor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT) NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    submitted_by UUID NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_favourite_user_id ON favourite(user_id);
CREATE INDEX idx_favourite_vendor_id ON favourite(vendor_id);
CREATE INDEX idx_lowstockreport_vendor_id ON low_stock_report(vendor_id);
CREATE INDEX idx_lowstockreport_status ON low_stock_report(status);
CREATE INDEX idx_submittedvendor_status ON submitted_vendor(status);
CREATE INDEX idx_submittedvendor_submitted_by ON submitted_vendor(submitted_by); 