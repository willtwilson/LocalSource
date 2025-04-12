-- Vendor RLS policies for LocalSource

-- Enable RLS on vendors table
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Create policy for vendors to manage their own records
CREATE POLICY vendor_self_management
ON vendors
FOR ALL
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

-- Create policy for users to view approved vendors
CREATE POLICY vendor_view_approved
ON vendors
FOR SELECT
USING (status = 'approved');

-- Create policy for admins to manage all vendors
CREATE POLICY vendor_admin_management
ON vendors
FOR ALL
USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
));

-- Enable RLS on vendor_photos table
ALTER TABLE vendor_photos ENABLE ROW LEVEL SECURITY;

-- Create policy for vendors to manage their own photos
CREATE POLICY vendor_photos_self_management
ON vendor_photos
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = vendor_photos.vendor_id
        AND vendors.owner_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = vendor_photos.vendor_id
        AND vendors.owner_user_id = auth.uid()
    )
);

-- Create policy for users to view photos of approved vendors
CREATE POLICY vendor_photos_view_approved
ON vendor_photos
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = vendor_photos.vendor_id
        AND vendors.status = 'approved'
    )
);

-- Create policy for admins to manage all vendor photos
CREATE POLICY vendor_photos_admin_management
ON vendor_photos
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Enable RLS on operating_hours table
ALTER TABLE operating_hours ENABLE ROW LEVEL SECURITY;

-- Create policy for vendors to manage their own operating hours
CREATE POLICY operating_hours_self_management
ON operating_hours
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = operating_hours.vendor_id
        AND vendors.owner_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = operating_hours.vendor_id
        AND vendors.owner_user_id = auth.uid()
    )
);

-- Create policy for users to view operating hours of approved vendors
CREATE POLICY operating_hours_view_approved
ON operating_hours
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM vendors
        WHERE vendors.id = operating_hours.vendor_id
        AND vendors.status = 'approved'
    )
);

-- Create policy for admins to manage all operating hours
CREATE POLICY operating_hours_admin_management
ON operating_hours
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Function to check if user is a vendor
CREATE OR REPLACE FUNCTION is_vendor()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM vendors
        WHERE owner_user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 