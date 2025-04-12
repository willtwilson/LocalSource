-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create core tables
CREATE TABLE vendor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT) NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    owner_user_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vendor_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE vendor_vendor_type (
    vendor_id UUID REFERENCES vendor(id) ON DELETE CASCADE,
    vendor_type_id UUID REFERENCES vendor_type(id) ON DELETE CASCADE,
    PRIMARY KEY (vendor_id, vendor_type_id)
);

-- Create secondary tables
CREATE TABLE favourite (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL REFERENCES vendor(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, vendor_id)
);

CREATE TABLE low_stock_report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL REFERENCES vendor(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

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

-- Create trigger for updated_at
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

-- Create indexes
CREATE INDEX idx_vendor_location ON vendor USING GIST (location);
CREATE INDEX idx_favourite_user_id ON favourite(user_id);
CREATE INDEX idx_favourite_vendor_id ON favourite(vendor_id);
CREATE INDEX idx_lowstockreport_vendor_id ON low_stock_report(vendor_id);
CREATE INDEX idx_lowstockreport_status ON low_stock_report(status);
CREATE INDEX idx_submittedvendor_status ON submitted_vendor(status);
CREATE INDEX idx_submittedvendor_submitted_by ON submitted_vendor(submitted_by);

-- Enable RLS
ALTER TABLE vendor ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_vendor_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE favourite ENABLE ROW LEVEL SECURITY;
ALTER TABLE low_stock_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE submitted_vendor ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Vendors are viewable by everyone" 
    ON vendor FOR SELECT 
    USING (true);

CREATE POLICY "Vendors can be updated by owner" 
    ON vendor FOR UPDATE 
    USING (auth.uid() = owner_user_id);

CREATE POLICY "VendorTypes are viewable by everyone" 
    ON vendor_type FOR SELECT 
    USING (true);

CREATE POLICY "Vendor_VendorType relationships are viewable by everyone" 
    ON vendor_vendor_type FOR SELECT 
    USING (true);

CREATE POLICY "Users can view own favourites" 
    ON favourite FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favourites" 
    ON favourite FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favourites" 
    ON favourite FOR DELETE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reports" 
    ON low_stock_report FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create reports" 
    ON low_stock_report FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendor owners can view their reports" 
    ON low_stock_report FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM vendor v 
        WHERE v.id = vendor_id 
        AND v.owner_user_id = auth.uid()
    ));

CREATE POLICY "Users can view own submissions" 
    ON submitted_vendor FOR SELECT 
    USING (auth.uid() = submitted_by);

CREATE POLICY "Users can create submissions" 
    ON submitted_vendor FOR INSERT 
    WITH CHECK (auth.uid() = submitted_by);

-- Create helper functions
CREATE OR REPLACE FUNCTION find_nearby_vendors(
    lat double precision,
    long double precision,
    radius_meters double precision DEFAULT 5000,
    limit_count integer DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    distance double precision,
    location GEOGRAPHY,
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    vendor_types jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH nearby_vendors AS (
        SELECT 
            v.*,
            ST_Distance(
                v.location::geography,
                ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography
            ) as distance
        FROM vendor v
        WHERE ST_DWithin(
            v.location::geography,
            ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography,
            radius_meters
        )
    ),
    vendor_types_agg AS (
        SELECT 
            vv.vendor_id,
            jsonb_agg(
                jsonb_build_object(
                    'id', vt.id,
                    'name', vt.name,
                    'description', vt.description
                )
            ) as vendor_types
        FROM vendor_vendor_type vv
        JOIN vendor_type vt ON vt.id = vv.vendor_type_id
        GROUP BY vv.vendor_id
    )
    SELECT 
        nv.id,
        nv.name,
        nv.description,
        nv.distance,
        nv.location,
        nv.contact_email,
        nv.contact_phone,
        nv.website_url,
        nv.created_at,
        nv.updated_at,
        COALESCE(vta.vendor_types, '[]'::jsonb) as vendor_types
    FROM nearby_vendors nv
    LEFT JOIN vendor_types_agg vta ON vta.vendor_id = nv.id
    ORDER BY distance
    LIMIT limit_count;
END;
$$;

CREATE OR REPLACE FUNCTION get_vendor_details(vendor_id UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    location GEOGRAPHY,
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    vendor_types jsonb,
    low_stock_reports jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH vendor_types_agg AS (
        SELECT 
            vv.vendor_id,
            jsonb_agg(
                jsonb_build_object(
                    'id', vt.id,
                    'name', vt.name,
                    'description', vt.description
                )
            ) as vendor_types
        FROM vendor_vendor_type vv
        JOIN vendor_type vt ON vt.id = vv.vendor_type_id
        WHERE vv.vendor_id = vendor_id
        GROUP BY vv.vendor_id
    ),
    low_stock_agg AS (
        SELECT 
            vendor_id,
            jsonb_agg(
                jsonb_build_object(
                    'id', id,
                    'product_name', product_name,
                    'description', description,
                    'created_at', created_at,
                    'status', status
                )
            ) as low_stock_reports
        FROM low_stock_report
        WHERE vendor_id = vendor_id
        AND created_at >= NOW() - INTERVAL '7 days'
        GROUP BY vendor_id
    )
    SELECT 
        v.id,
        v.name,
        v.description,
        v.location,
        v.contact_email,
        v.contact_phone,
        v.website_url,
        v.created_at,
        v.updated_at,
        COALESCE(vta.vendor_types, '[]'::jsonb) as vendor_types,
        COALESCE(lsa.low_stock_reports, '[]'::jsonb) as low_stock_reports
    FROM vendor v
    LEFT JOIN vendor_types_agg vta ON vta.vendor_id = v.id
    LEFT JOIN low_stock_agg lsa ON lsa.vendor_id = v.id
    WHERE v.id = vendor_id;
END;
$$;

-- Add initial vendor types
INSERT INTO vendor_type (id, name, description) VALUES
    (uuid_generate_v4(), 'Hedge Veg', 'Local produce sold from hedgerows and honesty boxes'),
    (uuid_generate_v4(), 'Farm Shop', 'Farm-based retail shop selling local produce'),
    (uuid_generate_v4(), 'Market Stall', 'Vendor operating at local markets'),
    (uuid_generate_v4(), 'Home Producer', 'Home-based food or craft producer'),
    (uuid_generate_v4(), 'Local Shop', 'Small local retail shop'); 