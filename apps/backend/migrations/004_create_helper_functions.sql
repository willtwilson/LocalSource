-- Function to find nearby vendors within a radius
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

-- Function to get vendor details including types
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