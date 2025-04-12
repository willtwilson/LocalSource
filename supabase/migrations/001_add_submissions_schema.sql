-- Schema for User Submitted Vendor Data and Low Stock Reports

-- 1. Submissions Table
-- Stores the main data for vendor submissions pending review
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- e.g., pending, approved, rejected
  vendor_name TEXT NOT NULL,
  description TEXT,
  vendor_type TEXT, -- Consider linking to vendor_types table later if needed
  contact_phone TEXT,
  contact_email TEXT,
  operating_hours TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  -- Consider adding a PostGIS point field later for geospatial queries
  -- location GEOGRAPHY(Point, 4326),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);

-- Enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (adjust as needed)
-- Authenticated users can insert their own submissions
CREATE POLICY "Allow authenticated users to insert submissions" ON public.submissions
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can view their own submissions
CREATE POLICY "Allow users to view their own submissions" ON public.submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can do anything (define admin role check as needed, e.g., via custom claim or function)
-- CREATE POLICY "Allow admin full access" ON public.submissions FOR ALL USING (is_admin()); 


-- 2. Submission Photos Table
-- Links uploaded photos to a specific submission
CREATE TABLE public.submission_photos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL, -- For ownership/RLS
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  public_url TEXT NOT NULL, -- Public URL for the photo
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_submission_photos_submission_id ON public.submission_photos(submission_id);
CREATE INDEX idx_submission_photos_user_id ON public.submission_photos(user_id);

-- Enable RLS
ALTER TABLE public.submission_photos ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Authenticated users can insert photos for their submissions
CREATE POLICY "Allow users to insert photos for their submissions" ON public.submission_photos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view photos linked to their submissions
CREATE POLICY "Allow users to view photos for their submissions" ON public.submission_photos
  FOR SELECT
  USING (auth.uid() = user_id);
  
-- Public read access for photos might be needed depending on usage (e.g., admin review)
-- Or admins can view all
-- CREATE POLICY "Allow admin full access" ON public.submission_photos FOR ALL USING (is_admin());


-- 3. Low Stock Reports Table
CREATE TABLE public.low_stock_reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id uuid REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT -- Optional field for user comments or specific products
);

-- Add indexes
CREATE INDEX idx_low_stock_reports_vendor_id ON public.low_stock_reports(vendor_id);
CREATE INDEX idx_low_stock_reports_user_id ON public.low_stock_reports(user_id);
CREATE INDEX idx_low_stock_reports_reported_at ON public.low_stock_reports(reported_at);

-- Enable RLS
ALTER TABLE public.low_stock_reports ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Authenticated users can insert reports
CREATE POLICY "Allow authenticated users to insert reports" ON public.low_stock_reports
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can view their own reports (maybe not necessary?)
-- CREATE POLICY "Allow users to view their own reports" ON public.low_stock_reports
--   FOR SELECT
--   USING (auth.uid() = user_id);

-- Admins can view all reports
-- CREATE POLICY "Allow admin full access" ON public.low_stock_reports FOR ALL USING (is_admin()); 