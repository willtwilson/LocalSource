-- SQL to import vendor data (simplified version)
-- Generated at 2025-04-12T11:51:54.897100

BEGIN;

-- Delete existing data
DELETE FROM public.vendor_produce;
DELETE FROM public.produce;
DELETE FROM public.vendors;

-- Insert 5 produce types
INSERT INTO public.produce (id, name, category, description)
VALUES ('eeaaa9cf-2aff-45d6-9b9e-35f3e2ded99c', 'Baked Goods', 'Other', 'Baked Goods available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Other';

INSERT INTO public.produce (id, name, category, description)
VALUES ('0644be93-7270-4a52-9a6e-3571b389f69a', 'Eggs', 'Dairy', 'Eggs available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Dairy';

INSERT INTO public.produce (id, name, category, description)
VALUES ('5b08af19-4b06-4f96-bfbd-36d417d34a8b', 'Flowers', 'Plants', 'Flowers available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Plants';

INSERT INTO public.produce (id, name, category, description)
VALUES ('8412146c-21ec-4c58-bc9b-528732bb631a', 'Jersey Royals', 'Vegetable', 'Jersey Royals available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Vegetable';

INSERT INTO public.produce (id, name, category, description)
VALUES ('11d605d4-ce7b-43f8-ba0f-84584bc9a0b2', 'Vegetables', 'Vegetable', 'Vegetables available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Vegetable';

-- Insert 5 vendors
INSERT INTO public.vendors (id, name, description, latitude, longitude, status)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', 'Master Farms St Brelade', 'Roadside stall located on Master Farms St Brelade in St Brelade, offering vegetables, jersey royals, and flowers.', 49.1822, -2.1951, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Master Farms St Brelade',
  description = 'Roadside stall located on Master Farms St Brelade in St Brelade, offering vegetables, jersey royals, and flowers.',
  latitude = 49.1822,
  longitude = -2.1951,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, latitude, longitude, status)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', 'Route du Francfief', 'Roadside stall located on Route du Francfief in St Brelade, offering plants, eggs, and flowers. Cash only.', 49.18658857981889, -2.1762310229487394, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Route du Francfief',
  description = 'Roadside stall located on Route du Francfief in St Brelade, offering plants, eggs, and flowers. Cash only.',
  latitude = 49.18658857981889,
  longitude = -2.1762310229487394,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, latitude, longitude, status)
VALUES ('cf1e7cf1-b603-4848-af4c-9c6ce1802209', 'La Rue des Landes Eggs', 'Roadside stall located on La Rue des Landes Eggs in St Peter, offering eggs.', 49.2025, -2.1762, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue des Landes Eggs',
  description = 'Roadside stall located on La Rue des Landes Eggs in St Peter, offering eggs.',
  latitude = 49.2025,
  longitude = -2.1762,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, latitude, longitude, status)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', 'Warren Farm Noirmont', 'Roadside stall located on Warren Farm Noirmont in St Brelade, offering vegetables, eggs, jersey royals, and plants. Cash only.', 49.1741, -2.1876, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Warren Farm Noirmont',
  description = 'Roadside stall located on Warren Farm Noirmont in St Brelade, offering vegetables, eggs, jersey royals, and plants. Cash only.',
  latitude = 49.1741,
  longitude = -2.1876,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, latitude, longitude, status)
VALUES ('f4a7d76a-c6a3-4a9c-865e-b25524ccc354', 'Rue de la Preterie', 'Roadside stall located on Rue de la Preterie in St Ouen, offering fruit, vegetables, and jersey royals. Cash only.', 49.21749586984657, -2.22708817539159, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue de la Preterie',
  description = 'Roadside stall located on Rue de la Preterie in St Ouen, offering fruit, vegetables, and jersey royals. Cash only.',
  latitude = 49.21749586984657,
  longitude = -2.22708817539159,
  updated_at = NOW();

-- Insert vendor-produce relationships
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', '11d605d4-ce7b-43f8-ba0f-84584bc9a0b2', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();

INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', '8412146c-21ec-4c58-bc9b-528732bb631a', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();

INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', '5b08af19-4b06-4f96-bfbd-36d417d34a8b', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();

INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', '0644be93-7270-4a52-9a6e-3571b389f69a', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();

INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', '5b08af19-4b06-4f96-bfbd-36d417d34a8b', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();

INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('cf1e7cf1-b603-4848-af4c-9c6ce1802209', '0644be93-7270-4a52-9a6e-3571b389f69a', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();

COMMIT; 