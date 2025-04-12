-- Function to find vendors within a specified radius
CREATE OR REPLACE FUNCTION find_vendors_within_distance(
  lat double precision,
  lng double precision,
  distance_meters double precision,
  vendor_type_id uuid DEFAULT NULL,
  verified_only boolean DEFAULT false
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  location geometry(Point, 4326),
  vendor_type_id uuid,
  is_verified boolean,
  distance_meters double precision
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.name,
    v.description,
    v.location::geometry(Point, 4326),
    v.vendor_type_id,
    v.is_verified,
    ST_Distance(
      v.location::geography,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    ) as distance_meters
  FROM vendors v
  WHERE 
    ST_DWithin(
      v.location::geography,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
      distance_meters
    )
    AND (vendor_type_id IS NULL OR v.vendor_type_id = find_vendors_within_distance.vendor_type_id)
    AND (NOT verified_only OR v.is_verified = true)
  ORDER BY distance_meters ASC;
END;
$$;

-- Function to find vendors within a bounding box
CREATE OR REPLACE FUNCTION find_vendors_in_bounds(
  min_lat double precision,
  min_lng double precision,
  max_lat double precision,
  max_lng double precision,
  vendor_type_id uuid DEFAULT NULL,
  verified_only boolean DEFAULT false
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  location geometry(Point, 4326),
  vendor_type_id uuid,
  is_verified boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.name,
    v.description,
    v.location::geometry(Point, 4326),
    v.vendor_type_id,
    v.is_verified
  FROM vendors v
  WHERE 
    v.location && ST_MakeEnvelope(min_lng, min_lat, max_lng, max_lat, 4326)
    AND (vendor_type_id IS NULL OR v.vendor_type_id = find_vendors_in_bounds.vendor_type_id)
    AND (NOT verified_only OR v.is_verified = true);
END;
$$;

-- Function to cluster nearby vendors
CREATE OR REPLACE FUNCTION cluster_vendors(
  zoom_level integer,
  bounds_json json
)
RETURNS TABLE (
  cluster_id bigint,
  center_point geometry(Point, 4326),
  vendor_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cluster_radius double precision;
  bounds geometry;
BEGIN
  -- Calculate cluster radius based on zoom level
  cluster_radius := 100.0 * pow(2, (20 - zoom_level));
  
  -- Parse bounds from JSON
  bounds := ST_MakeEnvelope(
    (bounds_json->>'minLng')::float,
    (bounds_json->>'minLat')::float,
    (bounds_json->>'maxLng')::float,
    (bounds_json->>'maxLat')::float,
    4326
  );
  
  RETURN QUERY
  WITH clusters AS (
    SELECT 
      ST_ClusterDBSCAN(location::geometry, cluster_radius, 1) OVER () as cid,
      location
    FROM vendors
    WHERE location && bounds
  )
  SELECT 
    cid as cluster_id,
    ST_Centroid(ST_Collect(location)) as center_point,
    COUNT(*) as vendor_count
  FROM clusters
  GROUP BY cid;
END;
$$;

-- Create indexes for spatial queries if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'vendors' 
    AND indexname = 'vendors_location_gist_idx'
  ) THEN
    CREATE INDEX vendors_location_gist_idx ON vendors USING GIST (location);
  END IF;
END $$; 