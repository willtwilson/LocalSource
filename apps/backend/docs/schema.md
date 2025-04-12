# LocalSource Database Schema

## Tables

### vendor
- `id` (UUID, PK): Unique identifier
- `name` (TEXT): Vendor name
- `description` (TEXT): Optional description
- `location` (GEOGRAPHY(POINT)): Geospatial location
- `contact_email` (TEXT): Optional contact email
- `contact_phone` (TEXT): Optional contact phone
- `website_url` (TEXT): Optional website URL
- `created_at` (TIMESTAMPTZ): Creation timestamp
- `updated_at` (TIMESTAMPTZ): Last update timestamp

### vendor_type
- `id` (UUID, PK): Unique identifier
- `name` (TEXT): Type name (unique)
- `description` (TEXT): Optional description

### vendor_vendor_type
- `vendor_id` (UUID, FK): Reference to vendor
- `vendor_type_id` (UUID, FK): Reference to vendor_type
- Primary Key: (vendor_id, vendor_type_id)

### favourite
- `id` (UUID, PK): Unique identifier
- `user_id` (UUID): Reference to auth.users
- `vendor_id` (UUID, FK): Reference to vendor
- `created_at` (TIMESTAMPTZ): Creation timestamp
- Unique constraint on (user_id, vendor_id)

### low_stock_report
- `id` (UUID, PK): Unique identifier
- `user_id` (UUID): Reference to auth.users
- `vendor_id` (UUID, FK): Reference to vendor
- `product_name` (TEXT): Name of low stock product
- `description` (TEXT): Optional details
- `created_at` (TIMESTAMPTZ): Creation timestamp
- `status` (TEXT): Report status (default: 'pending')

### submitted_vendor
- `id` (UUID, PK): Unique identifier
- `name` (TEXT): Vendor name
- `description` (TEXT): Optional description
- `location` (GEOGRAPHY(POINT)): Geospatial location
- `contact_email` (TEXT): Optional contact email
- `contact_phone` (TEXT): Optional contact phone
- `website_url` (TEXT): Optional website URL
- `submitted_by` (UUID): Reference to auth.users
- `status` (TEXT): Submission status (default: 'pending')
- `created_at` (TIMESTAMPTZ): Creation timestamp

## Indexes

### Spatial Indexes
- `idx_vendor_location`: GIST index on vendor.location

### Performance Indexes
- `idx_favourite_user_id`: On favourite.user_id
- `idx_favourite_vendor_id`: On favourite.vendor_id
- `idx_lowstockreport_vendor_id`: On low_stock_report.vendor_id
- `idx_lowstockreport_status`: On low_stock_report.status
- `idx_submittedvendor_status`: On submitted_vendor.status
- `idx_submittedvendor_submitted_by`: On submitted_vendor.submitted_by

## Helper Functions

### find_nearby_vendors
```sql
find_nearby_vendors(
    lat double precision,
    long double precision,
    radius_meters double precision DEFAULT 5000,
    limit_count integer DEFAULT 50
) RETURNS TABLE
```
Finds vendors within a specified radius of a point, ordered by distance.

### get_vendor_details
```sql
get_vendor_details(vendor_id UUID) RETURNS TABLE
```
Gets detailed vendor information including types and recent low stock reports.

## Row Level Security Policies

### vendor
- SELECT: Everyone can view
- UPDATE: Only owner can update

### vendor_type
- SELECT: Everyone can view

### vendor_vendor_type
- SELECT: Everyone can view

### favourite
- SELECT: Users can view own favourites
- INSERT: Users can create own favourites
- DELETE: Users can delete own favourites

### low_stock_report
- SELECT: Users can view own reports
- INSERT: Users can create reports
- SELECT: Vendor owners can view their reports

### submitted_vendor
- SELECT: Users can view own submissions
- INSERT: Users can create submissions

## Usage Examples

### Find Nearby Vendors
```sql
SELECT * FROM find_nearby_vendors(-2.13, 49.21, 5000);
```

### Get Vendor Details with Types
```sql
SELECT * FROM get_vendor_details('vendor-uuid');
```

### Add Favourite
```sql
INSERT INTO favourite (user_id, vendor_id)
VALUES ('user-uuid', 'vendor-uuid');
```

### Report Low Stock
```sql
INSERT INTO low_stock_report (user_id, vendor_id, product_name, description)
VALUES ('user-uuid', 'vendor-uuid', 'Fresh Eggs', 'Only 2 boxes left');
```

### Submit New Vendor
```sql
INSERT INTO submitted_vendor (name, location, submitted_by)
VALUES (
    'Farm Fresh Produce',
    ST_SetSRID(ST_MakePoint(-2.13, 49.21), 4326)::geography,
    'user-uuid'
);
``` 