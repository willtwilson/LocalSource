-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vendors table
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    parish TEXT,
    description TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    organic BOOLEAN DEFAULT false,
    cashless_payment BOOLEAN,
    produce_types TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Create policies for vendors table
-- Allow anyone to read vendors
CREATE POLICY "Allow public read access to vendors" 
ON public.vendors 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert vendors
CREATE POLICY "Allow authenticated users to insert vendors" 
ON public.vendors 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to update any vendor (since we don't track ownership)
CREATE POLICY "Allow authenticated users to update vendors" 
ON public.vendors 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS vendors_parish_idx ON public.vendors (parish);
CREATE INDEX IF NOT EXISTS vendors_status_idx ON public.vendors (status);
CREATE INDEX IF NOT EXISTS vendors_location_idx ON public.vendors USING gist (
  ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Add comments for documentation
COMMENT ON TABLE public.vendors IS 'Stores information about local produce vendors';
COMMENT ON COLUMN public.vendors.id IS 'Unique identifier for the vendor';
COMMENT ON COLUMN public.vendors.name IS 'Name of the vendor';
COMMENT ON COLUMN public.vendors.parish IS 'Parish where the vendor is located';
COMMENT ON COLUMN public.vendors.description IS 'Description of the vendor';
COMMENT ON COLUMN public.vendors.latitude IS 'Latitude coordinate';
COMMENT ON COLUMN public.vendors.longitude IS 'Longitude coordinate';
COMMENT ON COLUMN public.vendors.organic IS 'Whether the vendor sells organic produce';
COMMENT ON COLUMN public.vendors.cashless_payment IS 'Whether the vendor accepts cashless payments';
COMMENT ON COLUMN public.vendors.produce_types IS 'Types of produce sold by the vendor';
COMMENT ON COLUMN public.vendors.status IS 'Status of the vendor (active, inactive, pending)';
COMMENT ON COLUMN public.vendors.created_at IS 'When the vendor was created';
COMMENT ON COLUMN public.vendors.updated_at IS 'When the vendor was last updated'; 