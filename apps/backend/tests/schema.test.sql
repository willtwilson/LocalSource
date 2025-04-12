-- Test vendor creation and spatial query
DO $$
DECLARE
    vendor_id UUID;
    vendor_type_id UUID;
    test_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
    -- Test vendor creation
    INSERT INTO vendor (name, description, location)
    VALUES ('Test Vendor', 'Test Description', ST_SetSRID(ST_MakePoint(-2.13, 49.21), 4326)::geography)
    RETURNING id INTO vendor_id;
    
    ASSERT EXISTS (SELECT 1 FROM vendor WHERE id = vendor_id), 
        'Vendor should be created';

    -- Test vendor type creation and relationship
    INSERT INTO vendor_type (name, description)
    VALUES ('Test Type', 'Test Type Description')
    RETURNING id INTO vendor_type_id;

    INSERT INTO vendor_vendor_type (vendor_id, vendor_type_id)
    VALUES (vendor_id, vendor_type_id);

    ASSERT EXISTS (
        SELECT 1 
        FROM vendor_vendor_type 
        WHERE vendor_id = vendor_id 
        AND vendor_type_id = vendor_type_id
    ), 'Vendor-VendorType relationship should be created';

    -- Test spatial query
    ASSERT EXISTS (
        SELECT 1 
        FROM vendor 
        WHERE ST_DWithin(
            location::geography, 
            ST_SetSRID(ST_MakePoint(-2.13, 49.21), 4326)::geography,
            5000  -- 5km radius
        )
    ), 'Spatial query should find vendor within 5km';

    -- Test favourite creation
    INSERT INTO favourite (user_id, vendor_id)
    VALUES (test_user_id, vendor_id);

    ASSERT EXISTS (
        SELECT 1 
        FROM favourite 
        WHERE user_id = test_user_id 
        AND vendor_id = vendor_id
    ), 'Favourite should be created';

    -- Test low stock report
    INSERT INTO low_stock_report (user_id, vendor_id, product_name)
    VALUES (test_user_id, vendor_id, 'Test Product');

    ASSERT EXISTS (
        SELECT 1 
        FROM low_stock_report 
        WHERE user_id = test_user_id 
        AND vendor_id = vendor_id
    ), 'Low stock report should be created';

    -- Test submitted vendor
    INSERT INTO submitted_vendor (
        name, 
        description, 
        location, 
        submitted_by
    )
    VALUES (
        'Test Submitted Vendor',
        'Test Description',
        ST_SetSRID(ST_MakePoint(-2.13, 49.21), 4326)::geography,
        test_user_id
    );

    ASSERT EXISTS (
        SELECT 1 
        FROM submitted_vendor 
        WHERE submitted_by = test_user_id
    ), 'Submitted vendor should be created';

    -- Test cleanup
    DELETE FROM favourite WHERE user_id = test_user_id;
    DELETE FROM low_stock_report WHERE user_id = test_user_id;
    DELETE FROM vendor_vendor_type WHERE vendor_id = vendor_id;
    DELETE FROM vendor WHERE id = vendor_id;
    DELETE FROM vendor_type WHERE id = vendor_type_id;
    DELETE FROM submitted_vendor WHERE submitted_by = test_user_id;

    RAISE NOTICE 'All tests passed successfully';
END;
$$; 