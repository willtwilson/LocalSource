-- Enable RLS on all tables
ALTER TABLE vendor ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_vendor_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE favourite ENABLE ROW LEVEL SECURITY;
ALTER TABLE low_stock_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE submitted_vendor ENABLE ROW LEVEL SECURITY;

-- Vendor policies
CREATE POLICY "Vendors are viewable by everyone" 
    ON vendor FOR SELECT 
    USING (true);

CREATE POLICY "Vendors can be updated by owner" 
    ON vendor FOR UPDATE 
    USING (auth.uid() = owner_user_id);

-- VendorType policies
CREATE POLICY "VendorTypes are viewable by everyone" 
    ON vendor_type FOR SELECT 
    USING (true);

-- Vendor_VendorType policies
CREATE POLICY "Vendor_VendorType relationships are viewable by everyone" 
    ON vendor_vendor_type FOR SELECT 
    USING (true);

-- Favourite policies
CREATE POLICY "Users can view own favourites" 
    ON favourite FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favourites" 
    ON favourite FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favourites" 
    ON favourite FOR DELETE 
    USING (auth.uid() = user_id);

-- LowStockReport policies
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

-- SubmittedVendor policies
CREATE POLICY "Users can view own submissions" 
    ON submitted_vendor FOR SELECT 
    USING (auth.uid() = submitted_by);

CREATE POLICY "Users can create submissions" 
    ON submitted_vendor FOR INSERT 
    WITH CHECK (auth.uid() = submitted_by); 