-- SQL to import vendor data
-- Generated at 2025-04-12T15:06:59.941609

BEGIN;

-- Clean existing data if needed
DELETE FROM public.vendor_produce;
DELETE FROM public.produce;
DELETE FROM public.vendors;

-- Insert 13 produce types
INSERT INTO public.produce (id, name, category, description)
VALUES ('cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Baked Goods', 'Other', 'Baked Goods available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Other';
INSERT INTO public.produce (id, name, category, description)
VALUES ('07b90b81-496c-4219-b6b7-e08fd906200d', 'Eggs', 'Dairy', 'Eggs available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Dairy';
INSERT INTO public.produce (id, name, category, description)
VALUES ('2dfd41ee-027c-417e-80c7-6b91497e6958', 'Fish', 'Seafood', 'Fish available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Seafood';
INSERT INTO public.produce (id, name, category, description)
VALUES ('06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Flowers', 'Plants', 'Flowers available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Plants';
INSERT INTO public.produce (id, name, category, description)
VALUES ('16ad8b18-7e23-4dc0-8472-5928c744173c', 'Fruit', 'Fruit', 'Fruit available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Fruit';
INSERT INTO public.produce (id, name, category, description)
VALUES ('7dd8e7fb-ec7b-417d-a569-aaca8a6329a2', 'Honey', 'Other', 'Honey available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Other';
INSERT INTO public.produce (id, name, category, description)
VALUES ('1886997d-6a77-41e4-a10f-9182443d36fe', 'Jersey Royals', 'Vegetable', 'Jersey Royals available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Vegetable';
INSERT INTO public.produce (id, name, category, description)
VALUES ('3fc57e10-0aee-405b-a59f-7a670c911068', 'Meat', 'Meat', 'Meat available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Meat';
INSERT INTO public.produce (id, name, category, description)
VALUES ('322faeb1-a984-4eb5-940f-34905c084196', 'Milk', 'Dairy', 'Milk available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Dairy';
INSERT INTO public.produce (id, name, category, description)
VALUES ('933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Plants', 'Plants', 'Plants available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Plants';
INSERT INTO public.produce (id, name, category, description)
VALUES ('80784785-9f1c-4ada-a2da-3a3e0c562859', 'Shellfish', 'Seafood', 'Shellfish available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Seafood';
INSERT INTO public.produce (id, name, category, description)
VALUES ('a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Vegetables', 'Vegetable', 'Vegetables available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Vegetable';
INSERT INTO public.produce (id, name, category, description)
VALUES ('7b69db2a-7523-45e8-b224-204439e48e4b', 'Wood', 'Other', 'Wood available from local Jersey producers')
ON CONFLICT (name) DO UPDATE SET category = 'Other';

-- Insert 91 vendors
INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', 'Master Farms St Brelade', 'Roadside stall located on Master Farms St Brelade in St Brelade, offering vegetables, jersey royals, and flowers.', 'Master Farms St Brelade', 49.1822, -2.1951, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Master Farms St Brelade',
  description = 'Roadside stall located on Master Farms St Brelade in St Brelade, offering vegetables, jersey royals, and flowers.',
  address = 'Master Farms St Brelade',
  latitude = 49.1822,
  longitude = -2.1951,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', 'Route du Francfief', 'Roadside stall located on Route du Francfief in St Brelade, offering plants, eggs, and flowers. Cash only.', 'Route du Francfief', 49.18658857981889, -2.1762310229487394, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Route du Francfief',
  description = 'Roadside stall located on Route du Francfief in St Brelade, offering plants, eggs, and flowers. Cash only.',
  address = 'Route du Francfief',
  latitude = 49.18658857981889,
  longitude = -2.1762310229487394,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('cf1e7cf1-b603-4848-af4c-9c6ce1802209', 'La Rue des Landes Eggs', 'Roadside stall located on La Rue des Landes Eggs in St Peter, offering eggs.', 'La Rue des Landes Eggs', 49.2025, -2.1762, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue des Landes Eggs',
  description = 'Roadside stall located on La Rue des Landes Eggs in St Peter, offering eggs.',
  address = 'La Rue des Landes Eggs',
  latitude = 49.2025,
  longitude = -2.1762,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', 'Warren Farm Noirmont', 'Roadside stall located on Warren Farm Noirmont in St Brelade, offering vegetables, eggs, jersey royals, and plants. Cash only.', 'Warren Farm Noirmont', 49.1741, -2.1876, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Warren Farm Noirmont',
  description = 'Roadside stall located on Warren Farm Noirmont in St Brelade, offering vegetables, eggs, jersey royals, and plants. Cash only.',
  address = 'Warren Farm Noirmont',
  latitude = 49.1741,
  longitude = -2.1876,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('f4a7d76a-c6a3-4a9c-865e-b25524ccc354', 'Rue de la Preterie', 'Roadside stall located on Rue de la Preterie in St Ouen, offering fruit, vegetables, and jersey royals. Cash only.', 'Rue de la Preterie', 49.21749586984657, -2.22708817539159, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue de la Preterie',
  description = 'Roadside stall located on Rue de la Preterie in St Ouen, offering fruit, vegetables, and jersey royals. Cash only.',
  address = 'Rue de la Preterie',
  latitude = 49.21749586984657,
  longitude = -2.22708817539159,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('07586513-6d1a-4d7a-bf1d-e0f2f98de9cb', '9 Le Mont de Ste Marie', 'Roadside stall located on 9 Le Mont de Ste Marie in St Mary, offering wood. Cash only.', '9 Le Mont de Ste Marie', 49.2487097445703, -2.134351385538686, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = '9 Le Mont de Ste Marie',
  description = 'Roadside stall located on 9 Le Mont de Ste Marie in St Mary, offering wood. Cash only.',
  address = '9 Le Mont de Ste Marie',
  latitude = 49.2487097445703,
  longitude = -2.134351385538686,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('8c15be4a-8935-42fe-8ed7-68b782e1ba60', 'La Dimerie', 'Roadside stall located on La Dimerie in St Mary, offering eggs.', 'La Dimerie', 49.24977323083377, -2.131117382037948, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Dimerie',
  description = 'Roadside stall located on La Dimerie in St Mary, offering eggs.',
  address = 'La Dimerie',
  latitude = 49.24977323083377,
  longitude = -2.131117382037948,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('9197e5ea-0f24-4a07-af23-97b7a2a71596', 'Rue du Petit l''Aleval', 'Roadside stall located on Rue du Petit l''Aleval in St Peter, offering vegetables, plants, and flowers.', 'Rue du Petit l''Aleval', 49.202366375185896, -2.1732351070528306, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue du Petit l''Aleval',
  description = 'Roadside stall located on Rue du Petit l''Aleval in St Peter, offering vegetables, plants, and flowers.',
  address = 'Rue du Petit l''Aleval',
  latitude = 49.202366375185896,
  longitude = -2.1732351070528306,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('0acf50bb-a019-4724-a463-cd58cc18a045', 'La Rue à Georges', 'Roadside stall located on La Rue à Georges in St Mary, offering plants, fruit, and flowers. Cash only.', 'La Rue à Georges', 49.237684108340616, -2.133094273047078, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue à Georges',
  description = 'Roadside stall located on La Rue à Georges in St Mary, offering plants, fruit, and flowers. Cash only.',
  address = 'La Rue à Georges',
  latitude = 49.237684108340616,
  longitude = -2.133094273047078,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('adb49316-8d56-4390-a2d3-710859272912', 'Le Mont de la Barcelone', 'Roadside stall located on Le Mont de la Barcelone in St John, offering vegetables, jersey royals, and wood. Cash only.', 'Le Mont de la Barcelone', 49.23598166635172, -2.1123670044157072, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Le Mont de la Barcelone',
  description = 'Roadside stall located on Le Mont de la Barcelone in St John, offering vegetables, jersey royals, and wood. Cash only.',
  address = 'Le Mont de la Barcelone',
  latitude = 49.23598166635172,
  longitude = -2.1123670044157072,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('d0add1bf-fabc-4b4c-9afb-c0e1eb249e22', 'Rue du Cerf', 'Roadside stall located on Rue du Cerf in St John, offering vegetables, jersey royals, and flowers.', 'Rue du Cerf', 49.23910667074029, -2.1116207920428876, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue du Cerf',
  description = 'Roadside stall located on Rue du Cerf in St John, offering vegetables, jersey royals, and flowers.',
  address = 'Rue du Cerf',
  latitude = 49.23910667074029,
  longitude = -2.1116207920428876,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('4fa42303-3ac8-4790-bcab-58061c7a1203', 'La Rue de Bel Air', 'Roadside stall located on La Rue de Bel Air in St Mary, offering vegetables.', 'La Rue de Bel Air', 49.23848498483172, -2.134005579793297, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue de Bel Air',
  description = 'Roadside stall located on La Rue de Bel Air in St Mary, offering vegetables.',
  address = 'La Rue de Bel Air',
  latitude = 49.23848498483172,
  longitude = -2.134005579793297,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', 'Cooks Farm Shop', 'Local vendor in St Lawrence offering plants, vegetables, jersey royals, honey, and flowers.', NULL, 49.23, -2.0592, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Cooks Farm Shop',
  description = 'Local vendor in St Lawrence offering plants, vegetables, jersey royals, honey, and flowers.',
  latitude = 49.23,
  longitude = -2.0592,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('ce6e955f-f6c6-4c18-8205-3311b372bc5d', 'Farm Fields', 'Local vendor in St Lawrence offering eggs and fruit. Cash only.', NULL, 49.19954161398688, -2.135974095745397, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Farm Fields',
  description = 'Local vendor in St Lawrence offering eggs and fruit. Cash only.',
  latitude = 49.19954161398688,
  longitude = -2.135974095745397,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('90313fc6-c433-4562-92c3-09194e1eeae3', 'La Fraide Rue', 'Roadside stall located on La Fraide Rue in St Lawrence, offering fruit.', 'La Fraide Rue', 49.19010318716047, -2.150410240708361, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Fraide Rue',
  description = 'Roadside stall located on La Fraide Rue in St Lawrence, offering fruit.',
  address = 'La Fraide Rue',
  latitude = 49.19010318716047,
  longitude = -2.150410240708361,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('20edefb2-38f8-4079-bcec-3bd09f99980b', 'Pottage Farm', 'Local vendor in St Lawrence offering eggs.', NULL, 49.2521, -2.1949, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Pottage Farm',
  description = 'Local vendor in St Lawrence offering eggs.',
  latitude = 49.2521,
  longitude = -2.1949,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('41e1aadc-4ae2-4b01-94a0-7622485fa634', 'Farm Fresh Organic', 'Local vendor in St Lawrence offering vegetables, jersey royals, and flowers. Organically grown. Cash only.', NULL, 49.204, -2.0257, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Farm Fresh Organic',
  description = 'Local vendor in St Lawrence offering vegetables, jersey royals, and flowers. Organically grown. Cash only.',
  latitude = 49.204,
  longitude = -2.0257,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('6fed20a4-4e66-4fc0-a59f-83fe4929642d', 'Scoop Organic Farm Shop', 'Local vendor in St Lawrence offering vegetables, baked goods, and fruit. Organically grown. Accepts cashless payments.', NULL, 49.2372, -2.1111, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Scoop Organic Farm Shop',
  description = 'Local vendor in St Lawrence offering vegetables, baked goods, and fruit. Organically grown. Accepts cashless payments.',
  latitude = 49.2372,
  longitude = -2.1111,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('1fbf1c6b-58d6-4771-bde7-99c5ea175e8b', 'B&G Growers', 'Local vendor in St Lawrence offering vegetables and jersey royals. Cash only.', NULL, 49.19187768729304, -2.1425812995140823, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'B&G Growers',
  description = 'Local vendor in St Lawrence offering vegetables and jersey royals. Cash only.',
  latitude = 49.19187768729304,
  longitude = -2.1425812995140823,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c1d57623-ceda-43ba-a4eb-3adec6b93573', 'The Strawberry Farm', 'Local vendor in St Lawrence offering vegetables, fruit, and flowers.', NULL, 49.1991, -2.1702, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Strawberry Farm',
  description = 'Local vendor in St Lawrence offering vegetables, fruit, and flowers.',
  latitude = 49.1991,
  longitude = -2.1702,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('4967cbc5-8fc5-4e00-9f9f-da5dfa04a4df', 'Le Marinel Farm', 'Roadside stall located on Le Marinel Farm in St John, offering vegetables, fruit, plants, and flowers. Cash only.', 'Le Marinel Farm', 49.24958646383744, -2.109343852358238, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Le Marinel Farm',
  description = 'Roadside stall located on Le Marinel Farm in St John, offering vegetables, fruit, plants, and flowers. Cash only.',
  address = 'Le Marinel Farm',
  latitude = 49.24958646383744,
  longitude = -2.109343852358238,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('0eaf81ea-3eb4-413c-88ac-2786f05223f6', 'La Rue des Servais', 'Roadside stall located on La Rue des Servais in St John, offering plants.', 'La Rue des Servais', 49.235302174811146, -2.1116752034449244, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue des Servais',
  description = 'Roadside stall located on La Rue des Servais in St John, offering plants.',
  address = 'La Rue des Servais',
  latitude = 49.235302174811146,
  longitude = -2.1116752034449244,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c41b5e14-d5e2-492f-bb4d-b2e4abd9773f', 'Le Chasse', 'Roadside stall located on Le Chasse in St John, offering vegetables, eggs, and fruit.', 'Le Chasse', 49.249487379207096, -2.107749766909068, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Le Chasse',
  description = 'Roadside stall located on Le Chasse in St John, offering vegetables, eggs, and fruit.',
  address = 'Le Chasse',
  latitude = 49.249487379207096,
  longitude = -2.107749766909068,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('35675bcc-8a25-4d0b-918c-d405a131cfc5', 'La Croiserie', 'Roadside stall located on La Croiserie in Trinity, offering vegetables and eggs.', 'La Croiserie', 49.21909439930459, -2.065556439244601, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Croiserie',
  description = 'Roadside stall located on La Croiserie in Trinity, offering vegetables and eggs.',
  address = 'La Croiserie',
  latitude = 49.21909439930459,
  longitude = -2.065556439244601,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('6d47ec0e-d871-4ec3-9d22-291cc527c514', 'Rue du Pont', 'Roadside stall located on Rue du Pont in Trinity, offering vegetables.', 'Rue du Pont', 49.228815993448336, -2.0586951532424416, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue du Pont',
  description = 'Roadside stall located on Rue du Pont in Trinity, offering vegetables.',
  address = 'Rue du Pont',
  latitude = 49.228815993448336,
  longitude = -2.0586951532424416,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('1579b9be-0a4e-4c55-b847-3499947f65d0', 'Fungi Delicti', 'Local vendor in Trinity offering vegetables, eggs, and fruit. Cash only.', NULL, 49.2393, -2.1342, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Fungi Delicti',
  description = 'Local vendor in Trinity offering vegetables, eggs, and fruit. Cash only.',
  latitude = 49.2393,
  longitude = -2.1342,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c5433cd4-1b79-45c7-a0d7-a19346d34041', 'Grande Route de Rozel', 'Roadside stall located on Grande Route de Rozel in St Martin, offering vegetables. Cash only.', 'Grande Route de Rozel', 49.20747604312218, -2.017374849061043, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Grande Route de Rozel',
  description = 'Roadside stall located on Grande Route de Rozel in St Martin, offering vegetables. Cash only.',
  address = 'Grande Route de Rozel',
  latitude = 49.20747604312218,
  longitude = -2.017374849061043,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('a9792f29-40e3-42b0-8de5-7114aeaa84a1', 'Anne Port', 'Local vendor in Unknown offering vegetables.', NULL, 49.1997864456493, -2.1218619532721315, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Anne Port',
  description = 'Local vendor in Unknown offering vegetables.',
  latitude = 49.1997864456493,
  longitude = -2.1218619532721315,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('5852ea1e-627b-40d2-883a-ccbd3dc07091', 'Anneville Organic Farm Stall', 'Roadside stall located on Anneville Organic Farm Stall in St Martin, offering vegetables, baked goods, and fruit. Organically grown. Accepts cashless payments.', 'Anneville Organic Farm Stall', 49.1812, -2.0472, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Anneville Organic Farm Stall',
  description = 'Roadside stall located on Anneville Organic Farm Stall in St Martin, offering vegetables, baked goods, and fruit. Organically grown. Accepts cashless payments.',
  address = 'Anneville Organic Farm Stall',
  latitude = 49.1812,
  longitude = -2.0472,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('774f46af-5c3f-4ba3-846d-657e1dc63b9c', 'Route de la Hougue Bie', 'Roadside stall located on Route de la Hougue Bie in St Saviour, offering vegetables and plants.', 'Route de la Hougue Bie', 49.19043776103125, -2.0833031121876515, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Route de la Hougue Bie',
  description = 'Roadside stall located on Route de la Hougue Bie in St Saviour, offering vegetables and plants.',
  address = 'Route de la Hougue Bie',
  latitude = 49.19043776103125,
  longitude = -2.0833031121876515,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('95ec3448-4597-4004-b3a7-a48617609d0a', 'Jersey Oyster', 'Local vendor in Grouville offering vegetables, jersey royals, shellfish, and fish. Cash only.', NULL, 49.1786, -2.0531, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jersey Oyster',
  description = 'Local vendor in Grouville offering vegetables, jersey royals, shellfish, and fish. Cash only.',
  latitude = 49.1786,
  longitude = -2.0531,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('dfd9cb9a-1a95-47dc-aa64-8bd754f96b41', '1828 Rue des Nouettes', 'Roadside stall located on 1828 Rue des Nouettes in St Clement, offering vegetables.', '1828 Rue des Nouettes', 49.178239974354995, -2.046274797113732, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = '1828 Rue des Nouettes',
  description = 'Roadside stall located on 1828 Rue des Nouettes in St Clement, offering vegetables.',
  address = '1828 Rue des Nouettes',
  latitude = 49.178239974354995,
  longitude = -2.046274797113732,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('67142dc9-adb6-4b0f-9187-0959023ca678', '55 Clos du Corvez', 'Local vendor in St Clement offering eggs. Cash only.', NULL, 49.17534621050765, -2.0333353796518465, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = '55 Clos du Corvez',
  description = 'Local vendor in St Clement offering eggs. Cash only.',
  latitude = 49.17534621050765,
  longitude = -2.0333353796518465,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('e09c6458-9b68-47f2-8e45-420b2bd8216d', 'Boulivot de Haut', 'Local vendor in Grouville offering vegetables.', NULL, 49.186110229027676, -2.0475616778318164, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Boulivot de Haut',
  description = 'Local vendor in Grouville offering vegetables.',
  latitude = 49.186110229027676,
  longitude = -2.0475616778318164,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('73e376e1-e1b2-4e98-82fe-eb303ec8dc45', 'Rue Saint-Julien', 'Roadside stall located on Rue Saint-Julien in St Martin, offering vegetables and jersey royals.', 'Rue Saint-Julien', 49.20613072824446, -2.0169908277334017, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue Saint-Julien',
  description = 'Roadside stall located on Rue Saint-Julien in St Martin, offering vegetables and jersey royals.',
  address = 'Rue Saint-Julien',
  latitude = 49.20613072824446,
  longitude = -2.0169908277334017,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('e9e51cfe-1ac4-49c8-b2a6-95495f86ea26', 'Rue des Buttes', 'Roadside stall located on Rue des Buttes in St Martin, offering vegetables, eggs, and wood.', 'Rue des Buttes', 49.20570679684713, -2.017029485666029, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue des Buttes',
  description = 'Roadside stall located on Rue des Buttes in St Martin, offering vegetables, eggs, and wood.',
  address = 'Rue des Buttes',
  latitude = 49.20570679684713,
  longitude = -2.017029485666029,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', 'Holme Grown Farmshop', 'Local vendor in Grouville offering vegetables, milk, baked goods, eggs, fruit, and meat.', NULL, 49.2265, -2.1772, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Holme Grown Farmshop',
  description = 'Local vendor in Grouville offering vegetables, milk, baked goods, eggs, fruit, and meat.',
  latitude = 49.2265,
  longitude = -2.1772,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c5da55ec-0c62-4172-856c-f400068eeec4', 'Lucas Bros Farmshop', 'Local vendor in St Brelade offering vegetables, baked goods, fruit, and eggs.', NULL, 49.2185, -2.0637, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Lucas Bros Farmshop',
  description = 'Local vendor in St Brelade offering vegetables, baked goods, fruit, and eggs.',
  latitude = 49.2185,
  longitude = -2.0637,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('fa6bad83-4736-48e2-b4b5-b13254e81b33', 'Woodside Farmshop', 'Local vendor in Trinity offering wood. Accepts cashless payments.', NULL, 49.1989, -2.1358, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Woodside Farmshop',
  description = 'Local vendor in Trinity offering wood. Accepts cashless payments.',
  latitude = 49.1989,
  longitude = -2.1358,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('1d743a1d-4f1d-4b24-a2fe-a3e0ca26a052', 'Rondels Farmshop', 'Local vendor in Trinity offering local produce. Accepts cashless payments.', NULL, 49.2372, -2.1111, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rondels Farmshop',
  description = 'Local vendor in Trinity offering local produce. Accepts cashless payments.',
  latitude = 49.2372,
  longitude = -2.1111,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('fd743b02-0521-474f-8438-97c67aec13c5', 'The Organic Shop', 'Local vendor in St Saviour offering vegetables, baked goods, fruit, and eggs. Organically grown. Accepts cashless payments.', NULL, 49.1831, -2.1047, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Organic Shop',
  description = 'Local vendor in St Saviour offering vegetables, baked goods, fruit, and eggs. Organically grown. Accepts cashless payments.',
  latitude = 49.1831,
  longitude = -2.1047,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('8d84f995-3311-4530-8fcf-df426c97236c', 'Manor Farm', 'Local vendor in St Ouen offering vegetables.', NULL, 49.238, -2.1328, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Manor Farm',
  description = 'Local vendor in St Ouen offering vegetables.',
  latitude = 49.238,
  longitude = -2.1328,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('09310fef-e485-420b-9825-67de507d8f46', 'Rue des Geonnais', 'Roadside stall located on Rue des Geonnais in St Ouen, offering eggs.', 'Rue des Geonnais', 49.253618679077825, -2.1945045088155855, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue des Geonnais',
  description = 'Roadside stall located on Rue des Geonnais in St Ouen, offering eggs.',
  address = 'Rue des Geonnais',
  latitude = 49.253618679077825,
  longitude = -2.1945045088155855,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('4acf568a-e951-4c19-a804-5e8e3f2aec6c', 'Route du Port', 'Roadside stall located on Route du Port in St Peter, offering fruit, vegetables, and jersey royals.', 'Route du Port', 49.19864520763638, -2.1694911065918694, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Route du Port',
  description = 'Roadside stall located on Route du Port in St Peter, offering fruit, vegetables, and jersey royals.',
  address = 'Route du Port',
  latitude = 49.19864520763638,
  longitude = -2.1694911065918694,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('35f52d9f-0df0-4541-b60a-01561607030c', 'Le Braye', 'Roadside stall located on Le Braye in St Brelade, offering vegetables and jersey royals.', 'Le Braye', 49.18093191272904, -2.195962099654953, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Le Braye',
  description = 'Roadside stall located on Le Braye in St Brelade, offering vegetables and jersey royals.',
  address = 'Le Braye',
  latitude = 49.18093191272904,
  longitude = -2.195962099654953,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('1ac44f0e-652e-4131-b961-1382ad22d0d0', 'Rock View', 'Local vendor in St Ouen offering vegetables and jersey royals.', NULL, 49.2493, -2.1086, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rock View',
  description = 'Local vendor in St Ouen offering vegetables and jersey royals.',
  latitude = 49.2493,
  longitude = -2.1086,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c463aa83-ae58-4bb4-b407-fa78ae7c0d15', 'Ruette des Mannaies', 'Roadside stall located on Ruette des Mannaies in St Ouen, offering vegetables and jersey royals. Cash only.', 'Ruette des Mannaies', 49.224901190818755, -2.1787939607806885, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Ruette des Mannaies',
  description = 'Roadside stall located on Ruette des Mannaies in St Ouen, offering vegetables and jersey royals. Cash only.',
  address = 'Ruette des Mannaies',
  latitude = 49.224901190818755,
  longitude = -2.1787939607806885,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('9888e122-6c5f-4cbf-9a30-4795a3a3c68b', 'La Route de Saint-Jean', 'Roadside stall located on La Route de Saint-Jean in St John, offering plants.', 'La Route de Saint-Jean', 49.24321433851953, -2.1018419532358537, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Route de Saint-Jean',
  description = 'Roadside stall located on La Route de Saint-Jean in St John, offering plants.',
  address = 'La Route de Saint-Jean',
  latitude = 49.24321433851953,
  longitude = -2.1018419532358537,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('a299ed9a-1219-46fd-a9c8-ed400449c1ff', 'La Rue des Landes', 'Roadside stall located on La Rue des Landes in St John, offering vegetables, wood, and flowers. Organically grown. Accepts cashless payments.', 'La Rue des Landes', 49.2025, -2.1762, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Rue des Landes',
  description = 'Roadside stall located on La Rue des Landes in St John, offering vegetables, wood, and flowers. Organically grown. Accepts cashless payments.',
  address = 'La Rue des Landes',
  latitude = 49.2025,
  longitude = -2.1762,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('337704c7-a0a7-4e5e-b57e-e9c47bbae8dd', 'Jersey Royals', 'Local vendor in St Ouen offering vegetables and jersey royals. Cash only.', NULL, 49.2193, -2.2259, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jersey Royals',
  description = 'Local vendor in St Ouen offering vegetables and jersey royals. Cash only.',
  latitude = 49.2193,
  longitude = -2.2259,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('82c9a36d-4b4d-4689-b146-8fa07a15028b', 'Homefield Farmshop', 'Local vendor in St Clement offering honey. Organically grown. Accepts cashless payments.', NULL, 49.2019, -2.1739, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Homefield Farmshop',
  description = 'Local vendor in St Clement offering honey. Organically grown. Accepts cashless payments.',
  latitude = 49.2019,
  longitude = -2.1739,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('74965c17-333f-48bf-8366-0ce29c3019ee', 'Rue de Fliquet', 'Roadside stall located on Rue de Fliquet in St Martin, offering vegetables, jersey royals, and plants. Organically grown. Accepts cashless payments.', 'Rue de Fliquet', 49.197437978190166, -2.0197722976782413, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue de Fliquet',
  description = 'Roadside stall located on Rue de Fliquet in St Martin, offering vegetables, jersey royals, and plants. Organically grown. Accepts cashless payments.',
  address = 'Rue de Fliquet',
  latitude = 49.197437978190166,
  longitude = -2.0197722976782413,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('37489dc8-3407-4025-824e-33eaacf265cc', 'Farmer Richard', 'Local vendor in St Helier offering vegetables. Organically grown. Accepts cashless payments.', NULL, 49.208, -2.1954, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Farmer Richard',
  description = 'Local vendor in St Helier offering vegetables. Organically grown. Accepts cashless payments.',
  latitude = 49.208,
  longitude = -2.1954,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c23c6694-d7a3-402f-ab9f-fa8639743f76', 'Me and the Farmer by John Hackett', 'Local vendor in St Brelade offering baked goods, jersey royals, and meat. Organically grown. Accepts cashless payments.', NULL, 49.1869, -2.1772, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Me and the Farmer by John Hackett',
  description = 'Local vendor in St Brelade offering baked goods, jersey royals, and meat. Organically grown. Accepts cashless payments.',
  latitude = 49.1869,
  longitude = -2.1772,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('91f0796e-f5d9-44da-b226-25f43e939983', 'Ferndale Farm', 'Roadside stall located on Ferndale Farm in St Peter, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.', 'Ferndale Farm', 49.2416, -2.1034, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Ferndale Farm',
  description = 'Roadside stall located on Ferndale Farm in St Peter, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.',
  address = 'Ferndale Farm',
  latitude = 49.2416,
  longitude = -2.1034,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('4e65ec8b-c80d-42ce-8c07-fdbb4bd56267', 'Labey Farm', 'Roadside stall located on Labey Farm in St Ouen, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.', 'Labey Farm', 49.1813, -2.0477, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Labey Farm',
  description = 'Roadside stall located on Labey Farm in St Ouen, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.',
  address = 'Labey Farm',
  latitude = 49.1813,
  longitude = -2.0477,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('e700c46f-3483-4b4b-a8a0-c98e576e88a2', 'Route des Millais', 'Roadside stall located on Route des Millais in St Ouen, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.', 'Route des Millais', 49.22538648496874, -2.1759108077916043, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Route des Millais',
  description = 'Roadside stall located on Route des Millais in St Ouen, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.',
  address = 'Route des Millais',
  latitude = 49.22538648496874,
  longitude = -2.1759108077916043,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('cf57a3e1-74b3-408a-9a35-1354aa2201c7', 'Vallee des vaux', 'Roadside stall located on Vallee des vaux in St Helier, offering vegetables and plants. Organically grown. Accepts cashless payments.', 'Vallee des vaux', 49.18454628193969, -2.104588849802009, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Vallee des vaux',
  description = 'Roadside stall located on Vallee des vaux in St Helier, offering vegetables and plants. Organically grown. Accepts cashless payments.',
  address = 'Vallee des vaux',
  latitude = 49.18454628193969,
  longitude = -2.104588849802009,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('d4a1e961-af12-4fa9-87ac-229d8d72e30f', 'The Jersey Potato Shack', 'Local vendor in St Helier offering fruit, vegetables, and jersey royals. Organically grown. Accepts cashless payments.', NULL, 49.1822, -2.1943, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Jersey Potato Shack',
  description = 'Local vendor in St Helier offering fruit, vegetables, and jersey royals. Organically grown. Accepts cashless payments.',
  latitude = 49.1822,
  longitude = -2.1943,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('8d9ac9fe-632d-4dc6-ab6d-6840201c0780', 'Petit Menage Farm', 'Local vendor in St Saviour offering vegetables, eggs, and wood. Organically grown. Accepts cashless payments.', NULL, 49.2265, -2.1772, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Petit Menage Farm',
  description = 'Local vendor in St Saviour offering vegetables, eggs, and wood. Organically grown. Accepts cashless payments.',
  latitude = 49.2265,
  longitude = -2.1772,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('bda532f4-6094-4488-b43c-c47999f0bd1b', 'Cluckingham Palace', 'Roadside stall located on Cluckingham Palace in St Saviour, offering eggs. Organically grown. Accepts cashless payments.', 'Cluckingham Palace', 49.2416, -2.1034, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Cluckingham Palace',
  description = 'Roadside stall located on Cluckingham Palace in St Saviour, offering eggs. Organically grown. Accepts cashless payments.',
  address = 'Cluckingham Palace',
  latitude = 49.2416,
  longitude = -2.1034,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('6644b116-8e74-44d9-9a92-995a5044e167', 'Meleches Farm', 'Roadside stall located on Meleches Farm in St Helier, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.', 'Meleches Farm', 49.2416, -2.1034, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Meleches Farm',
  description = 'Roadside stall located on Meleches Farm in St Helier, offering vegetables and jersey royals. Organically grown. Accepts cashless payments.',
  address = 'Meleches Farm',
  latitude = 49.2416,
  longitude = -2.1034,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('52e3a650-a3e4-40f5-a7b3-a870834621ac', 'Jersey Wonders by Babs', 'Local vendor in Grouville offering baked goods. Organically grown. Accepts cashless payments.', NULL, 49.1835, -2.106, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jersey Wonders by Babs',
  description = 'Local vendor in Grouville offering baked goods. Organically grown. Accepts cashless payments.',
  latitude = 49.1835,
  longitude = -2.106,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('2e2cd4bb-25e7-46a4-a7a6-a0ea634191a6', 'Rue des Cateaux', 'Roadside stall located on Rue des Cateaux in Trinity, offering vegetables, eggs, and fruit. Organically grown. Accepts cashless payments.', 'Rue des Cateaux', 49.228813544152175, -2.0588352957444394, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Rue des Cateaux',
  description = 'Roadside stall located on Rue des Cateaux in Trinity, offering vegetables, eggs, and fruit. Organically grown. Accepts cashless payments.',
  address = 'Rue des Cateaux',
  latitude = 49.228813544152175,
  longitude = -2.0588352957444394,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('9ac198f6-6f00-486c-8500-8b0f77e871d7', 'La route des hetres', 'Roadside stall located on La route des hetres in St Peter, offering fruit, vegetables, and jersey royals. Organically grown. Accepts cashless payments.', 'La route des hetres', 49.197808179552844, -2.168786358786755, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La route des hetres',
  description = 'Roadside stall located on La route des hetres in St Peter, offering fruit, vegetables, and jersey royals. Organically grown. Accepts cashless payments.',
  address = 'La route des hetres',
  latitude = 49.197808179552844,
  longitude = -2.168786358786755,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('8eab8f4c-5121-41a5-8e74-2501a937df83', 'Master Farms Grouville', 'Roadside stall located on Master Farms Grouville in Grouville, offering vegetables, jersey royals, and flowers. Organically grown. Accepts cashless payments.', 'Master Farms Grouville', 49.1813, -2.0477, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Master Farms Grouville',
  description = 'Roadside stall located on Master Farms Grouville in Grouville, offering vegetables, jersey royals, and flowers. Organically grown. Accepts cashless payments.',
  address = 'Master Farms Grouville',
  latitude = 49.1813,
  longitude = -2.0477,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('7fccef7a-80e1-4e21-b9f1-f3237daea23b', 'Master Farms Trinity', 'Local vendor in Trinity offering vegetables, jersey royals, and flowers. Organically grown. Accepts cashless payments.', NULL, 49.2297, -2.0592, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Master Farms Trinity',
  description = 'Local vendor in Trinity offering vegetables, jersey royals, and flowers. Organically grown. Accepts cashless payments.',
  latitude = 49.2297,
  longitude = -2.0592,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('4c5ce3b6-1f51-4c50-96f7-765bdb62608c', 'La Tacheron ''Bake Box''', 'Roadside stall located on La Tacheron ''Bake Box'' in Trinity, offering baked goods. Organically grown. Accepts cashless payments.', 'La Tacheron ''Bake Box''', 49.2185, -2.0637, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La Tacheron ''Bake Box''',
  description = 'Roadside stall located on La Tacheron ''Bake Box'' in Trinity, offering baked goods. Organically grown. Accepts cashless payments.',
  address = 'La Tacheron ''Bake Box''',
  latitude = 49.2185,
  longitude = -2.0637,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('10b7188c-18e6-4d43-8656-68c249c2f80f', 'Bessie''s biscuits & cupcakes', 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.', NULL, 49.1843, -2.1003, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Bessie''s biscuits & cupcakes',
  description = 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.',
  latitude = 49.1843,
  longitude = -2.1003,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('a9c9b766-72be-489e-af64-5c471c1500da', 'Chemin des Monts Plants', 'Roadside stall located on Chemin des Monts Plants in St Ouen, offering plants. Organically grown. Accepts cashless payments.', 'Chemin des Monts Plants', 49.21865908049534, -2.224447030121218, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Chemin des Monts Plants',
  description = 'Roadside stall located on Chemin des Monts Plants in St Ouen, offering plants. Organically grown. Accepts cashless payments.',
  address = 'Chemin des Monts Plants',
  latitude = 49.21865908049534,
  longitude = -2.224447030121218,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('beb76b77-e402-45db-bb41-4256cf348220', 'The Cake Box', 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.', NULL, 49.1891, -2.1495, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Cake Box',
  description = 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.',
  latitude = 49.1891,
  longitude = -2.1495,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('066cc27a-8eef-4536-965d-496948f3f69a', 'Daisy’s Country Bakes', 'Local vendor in St Lawrence offering plants, baked goods, and flowers. Organically grown. Accepts cashless payments.', NULL, 49.19068729416652, -2.1484889268517113, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Daisy’s Country Bakes',
  description = 'Local vendor in St Lawrence offering plants, baked goods, and flowers. Organically grown. Accepts cashless payments.',
  latitude = 49.19068729416652,
  longitude = -2.1484889268517113,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('7b00964b-3ec4-4422-afff-6537990a3446', 'The Wonder Stall', 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.', NULL, 49.1946, -2.0733, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Wonder Stall',
  description = 'Local vendor in St Martin offering baked goods. Organically grown. Accepts cashless payments.',
  latitude = 49.1946,
  longitude = -2.0733,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('b04a6161-7792-4c00-83da-fc6e6d31a619', 'Westies Dairy Free Cakes', 'Local vendor in St Peter offering vegetables, baked goods, and milk. Organically grown. Accepts cashless payments.', NULL, 49.2019, -2.1739, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Westies Dairy Free Cakes',
  description = 'Local vendor in St Peter offering vegetables, baked goods, and milk. Organically grown. Accepts cashless payments.',
  latitude = 49.2019,
  longitude = -2.1739,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('30bace09-42f4-4238-8502-f7523721ac78', 'The Ranch Honesty Box', 'Local vendor in St Peter offering vegetables and fruit. Organically grown. Accepts cashless payments.', NULL, 49.208, -2.1954, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Ranch Honesty Box',
  description = 'Local vendor in St Peter offering vegetables and fruit. Organically grown. Accepts cashless payments.',
  latitude = 49.208,
  longitude = -2.1954,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('cf49a3f2-469e-4d7f-8669-f06ef9d8b249', 'The Easter Eggers of Oakvale', 'Roadside stall located on The Easter Eggers of Oakvale in St Saviour, offering eggs. Organically grown. Accepts cashless payments.', 'The Easter Eggers of Oakvale', 49.23, -2.0592, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Easter Eggers of Oakvale',
  description = 'Roadside stall located on The Easter Eggers of Oakvale in St Saviour, offering eggs. Organically grown. Accepts cashless payments.',
  address = 'The Easter Eggers of Oakvale',
  latitude = 49.23,
  longitude = -2.0592,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('d3721792-29ee-4911-aebb-6c8f239621f1', 'Little Bird Bakes', 'Roadside stall located on Little Bird Bakes in St Martin, offering baked goods. Organically grown. Accepts cashless payments.', 'Little Bird Bakes', 49.1909, -2.143, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Little Bird Bakes',
  description = 'Roadside stall located on Little Bird Bakes in St Martin, offering baked goods. Organically grown. Accepts cashless payments.',
  address = 'Little Bird Bakes',
  latitude = 49.1909,
  longitude = -2.143,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('c4803099-853c-4e12-a49a-79db24b423d2', 'Crabs Direct', 'Local vendor in St Clement offering meat, shellfish, and fish. Organically grown. Accepts cashless payments.', NULL, 49.1786, -2.0531, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Crabs Direct',
  description = 'Local vendor in St Clement offering meat, shellfish, and fish. Organically grown. Accepts cashless payments.',
  latitude = 49.1786,
  longitude = -2.0531,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('a1169378-ffca-4a9e-8311-a6a569cc1f6e', 'Jade-S Fisheries - St. Aubins', 'Local vendor in St Brelade offering shellfish and fish. Organically grown. Accepts cashless payments.', NULL, 49.1871, -2.1666, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jade-S Fisheries - St. Aubins',
  description = 'Local vendor in St Brelade offering shellfish and fish. Organically grown. Accepts cashless payments.',
  latitude = 49.1871,
  longitude = -2.1666,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('f9251fe5-5769-428f-a248-7bf8d44fab7f', 'Jade-S Fisheries - Long Beach', 'Local vendor in Grouville offering shellfish and fish. Organically grown. Accepts cashless payments.', NULL, 49.1786, -2.0531, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jade-S Fisheries - Long Beach',
  description = 'Local vendor in Grouville offering shellfish and fish. Organically grown. Accepts cashless payments.',
  latitude = 49.1786,
  longitude = -2.0531,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('21e89c59-52d6-4f44-94ed-8c3d8acf30b8', 'Jade-S Fisheries - St Ouen Community Centre', 'Local vendor in St Ouen offering shellfish and fish. Organically grown. Accepts cashless payments.', NULL, 49.2265, -2.1772, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jade-S Fisheries - St Ouen Community Centre',
  description = 'Local vendor in St Ouen offering shellfish and fish. Organically grown. Accepts cashless payments.',
  latitude = 49.2265,
  longitude = -2.1772,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('d5759253-ba69-4c3a-bd8a-c059d2f459f5', 'G and H Agriculture', 'Local vendor in St Peter offering vegetables, eggs, and jersey royals. Organically grown. Accepts cashless payments.', NULL, 49.2193, -2.2259, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'G and H Agriculture',
  description = 'Local vendor in St Peter offering vegetables, eggs, and jersey royals. Organically grown. Accepts cashless payments.',
  latitude = 49.2193,
  longitude = -2.2259,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('e94caa1e-857d-438b-9b78-11ec250692b0', 'The Succulents'' Lady', 'Providing succulents of different varieties in specially chosen containers, making features of both elements. Plus other plants when available. Also includes Macrame hangers etc on occasion.', NULL, 49.174958540103745, -2.0588892146205953, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Succulents'' Lady',
  description = 'Providing succulents of different varieties in specially chosen containers, making features of both elements. Plus other plants when available. Also includes Macrame hangers etc on occasion.',
  latitude = 49.174958540103745,
  longitude = -2.0588892146205953,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('08e05991-6581-4eef-858a-fb4c23cce6c5', 'La crete shellfish', 'Roadside stall located on La crete shellfish in St Clement, offering shellfish and fish. Organically grown. Accepts cashless payments.', 'La crete shellfish', 49.204, -2.0257, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'La crete shellfish',
  description = 'Roadside stall located on La crete shellfish in St Clement, offering shellfish and fish. Organically grown. Accepts cashless payments.',
  address = 'La crete shellfish',
  latitude = 49.204,
  longitude = -2.0257,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('71e21679-2955-466b-a59b-cfebc2fd62d6', 'Playful Paws Honesty Box', 'Roadside stall located on Playful Paws Honesty Box in St Ouen, offering local produce. Organically grown. Accepts cashless payments.', 'Playful Paws Honesty Box', 49.23, -2.0592, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Playful Paws Honesty Box',
  description = 'Roadside stall located on Playful Paws Honesty Box in St Ouen, offering local produce. Organically grown. Accepts cashless payments.',
  address = 'Playful Paws Honesty Box',
  latitude = 49.23,
  longitude = -2.0592,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('b96beb5c-4708-44d1-a4f9-1d34f622a3ac', 'Plemont Royals', 'Roadside stall located on Plemont Royals in St Ouen, offering jersey royals. Organically grown. Accepts cashless payments.', 'Plemont Royals', 49.2521, -2.1949, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Plemont Royals',
  description = 'Roadside stall located on Plemont Royals in St Ouen, offering jersey royals. Organically grown. Accepts cashless payments.',
  address = 'Plemont Royals',
  latitude = 49.2521,
  longitude = -2.1949,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('060c9903-beb3-4204-bab9-b006da1ce5a7', 'Sunshine Stall', 'Local vendor in St Peter offering vegetables. Organically grown. Accepts cashless payments.', NULL, 49.19960353738149, -2.1698249032406003, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Sunshine Stall',
  description = 'Local vendor in St Peter offering vegetables. Organically grown. Accepts cashless payments.',
  latitude = 49.19960353738149,
  longitude = -2.1698249032406003,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('95be8fe3-8586-4ac6-8f6f-ce127c787dac', 'Hamptonne Farm', 'Local vendor in St Lawrence offering eggs. Organically grown. Accepts cashless payments.', NULL, 49.2307, -2.1237, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Hamptonne Farm',
  description = 'Local vendor in St Lawrence offering eggs. Organically grown. Accepts cashless payments.',
  latitude = 49.2307,
  longitude = -2.1237,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('3bd6073f-6695-45a2-bfca-de04822d2c15', 'The Salvation Army Honesty Box', 'Local vendor in St Martin offering jersey royals. Organically grown. Accepts cashless payments.', NULL, 49.1843, -2.1003, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'The Salvation Army Honesty Box',
  description = 'Local vendor in St Martin offering jersey royals. Organically grown. Accepts cashless payments.',
  latitude = 49.1843,
  longitude = -2.1003,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('0a3e8c2b-fbf5-492e-b4c9-adcbad8411fc', 'Bramble', 'Roadside stall located on Bramble in St Mary, offering vegetables, plants, and flowers. Organically grown. Accepts cashless payments.', 'Bramble', 49.24078715660217, -2.1342425769397035, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Bramble',
  description = 'Roadside stall located on Bramble in St Mary, offering vegetables, plants, and flowers. Organically grown. Accepts cashless payments.',
  address = 'Bramble',
  latitude = 49.24078715660217,
  longitude = -2.1342425769397035,
  updated_at = NOW();

INSERT INTO public.vendors (id, name, description, address, latitude, longitude, status)
VALUES ('1cbf7617-d7e6-417f-9911-457167c92324', 'Acorn Honesty Box', 'Local vendor in Unknown offering jersey royals. Organically grown. Accepts cashless payments.', NULL, 49.1931, -2.0743, 'unverified')
ON CONFLICT (id) DO UPDATE SET
  name = 'Acorn Honesty Box',
  description = 'Local vendor in Unknown offering jersey royals. Organically grown. Accepts cashless payments.',
  latitude = 49.1931,
  longitude = -2.0743,
  updated_at = NOW();

-- Insert vendor-produce relationships
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a694d4d4-3e07-4d5b-b932-f6c23dfca0fe', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('57788f40-1041-47e3-a3ad-3dc681072ec9', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('cf1e7cf1-b603-4848-af4c-9c6ce1802209', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ad5b48d4-ac03-481d-9053-c3dc403dbdc2', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('f4a7d76a-c6a3-4a9c-865e-b25524ccc354', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('f4a7d76a-c6a3-4a9c-865e-b25524ccc354', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('f4a7d76a-c6a3-4a9c-865e-b25524ccc354', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('07586513-6d1a-4d7a-bf1d-e0f2f98de9cb', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8c15be4a-8935-42fe-8ed7-68b782e1ba60', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9197e5ea-0f24-4a07-af23-97b7a2a71596', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9197e5ea-0f24-4a07-af23-97b7a2a71596', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9197e5ea-0f24-4a07-af23-97b7a2a71596', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0acf50bb-a019-4724-a463-cd58cc18a045', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0acf50bb-a019-4724-a463-cd58cc18a045', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0acf50bb-a019-4724-a463-cd58cc18a045', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('adb49316-8d56-4390-a2d3-710859272912', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('adb49316-8d56-4390-a2d3-710859272912', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('adb49316-8d56-4390-a2d3-710859272912', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d0add1bf-fabc-4b4c-9afb-c0e1eb249e22', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d0add1bf-fabc-4b4c-9afb-c0e1eb249e22', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d0add1bf-fabc-4b4c-9afb-c0e1eb249e22', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4fa42303-3ac8-4790-bcab-58061c7a1203', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', '7dd8e7fb-ec7b-417d-a569-aaca8a6329a2', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5818180e-20d5-4ff8-a968-eee20776e963', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ce6e955f-f6c6-4c18-8205-3311b372bc5d', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('ce6e955f-f6c6-4c18-8205-3311b372bc5d', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('90313fc6-c433-4562-92c3-09194e1eeae3', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('20edefb2-38f8-4079-bcec-3bd09f99980b', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('41e1aadc-4ae2-4b01-94a0-7622485fa634', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('41e1aadc-4ae2-4b01-94a0-7622485fa634', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('41e1aadc-4ae2-4b01-94a0-7622485fa634', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6fed20a4-4e66-4fc0-a59f-83fe4929642d', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6fed20a4-4e66-4fc0-a59f-83fe4929642d', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6fed20a4-4e66-4fc0-a59f-83fe4929642d', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1fbf1c6b-58d6-4771-bde7-99c5ea175e8b', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1fbf1c6b-58d6-4771-bde7-99c5ea175e8b', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c1d57623-ceda-43ba-a4eb-3adec6b93573', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c1d57623-ceda-43ba-a4eb-3adec6b93573', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c1d57623-ceda-43ba-a4eb-3adec6b93573', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4967cbc5-8fc5-4e00-9f9f-da5dfa04a4df', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4967cbc5-8fc5-4e00-9f9f-da5dfa04a4df', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4967cbc5-8fc5-4e00-9f9f-da5dfa04a4df', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4967cbc5-8fc5-4e00-9f9f-da5dfa04a4df', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0eaf81ea-3eb4-413c-88ac-2786f05223f6', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c41b5e14-d5e2-492f-bb4d-b2e4abd9773f', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c41b5e14-d5e2-492f-bb4d-b2e4abd9773f', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c41b5e14-d5e2-492f-bb4d-b2e4abd9773f', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('35675bcc-8a25-4d0b-918c-d405a131cfc5', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('35675bcc-8a25-4d0b-918c-d405a131cfc5', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6d47ec0e-d871-4ec3-9d22-291cc527c514', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1579b9be-0a4e-4c55-b847-3499947f65d0', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1579b9be-0a4e-4c55-b847-3499947f65d0', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1579b9be-0a4e-4c55-b847-3499947f65d0', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c5433cd4-1b79-45c7-a0d7-a19346d34041', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a9792f29-40e3-42b0-8de5-7114aeaa84a1', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5852ea1e-627b-40d2-883a-ccbd3dc07091', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5852ea1e-627b-40d2-883a-ccbd3dc07091', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('5852ea1e-627b-40d2-883a-ccbd3dc07091', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('774f46af-5c3f-4ba3-846d-657e1dc63b9c', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('774f46af-5c3f-4ba3-846d-657e1dc63b9c', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('95ec3448-4597-4004-b3a7-a48617609d0a', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('95ec3448-4597-4004-b3a7-a48617609d0a', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('95ec3448-4597-4004-b3a7-a48617609d0a', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('95ec3448-4597-4004-b3a7-a48617609d0a', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('dfd9cb9a-1a95-47dc-aa64-8bd754f96b41', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('67142dc9-adb6-4b0f-9187-0959023ca678', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e09c6458-9b68-47f2-8e45-420b2bd8216d', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('73e376e1-e1b2-4e98-82fe-eb303ec8dc45', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('73e376e1-e1b2-4e98-82fe-eb303ec8dc45', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e9e51cfe-1ac4-49c8-b2a6-95495f86ea26', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e9e51cfe-1ac4-49c8-b2a6-95495f86ea26', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e9e51cfe-1ac4-49c8-b2a6-95495f86ea26', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', '322faeb1-a984-4eb5-940f-34905c084196', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('562a2759-8eb3-4f6b-b320-e61bb8c689d8', '3fc57e10-0aee-405b-a59f-7a670c911068', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c5da55ec-0c62-4172-856c-f400068eeec4', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c5da55ec-0c62-4172-856c-f400068eeec4', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c5da55ec-0c62-4172-856c-f400068eeec4', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c5da55ec-0c62-4172-856c-f400068eeec4', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('fa6bad83-4736-48e2-b4b5-b13254e81b33', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('fd743b02-0521-474f-8438-97c67aec13c5', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('fd743b02-0521-474f-8438-97c67aec13c5', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('fd743b02-0521-474f-8438-97c67aec13c5', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('fd743b02-0521-474f-8438-97c67aec13c5', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8d84f995-3311-4530-8fcf-df426c97236c', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('09310fef-e485-420b-9825-67de507d8f46', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4acf568a-e951-4c19-a804-5e8e3f2aec6c', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4acf568a-e951-4c19-a804-5e8e3f2aec6c', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4acf568a-e951-4c19-a804-5e8e3f2aec6c', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('35f52d9f-0df0-4541-b60a-01561607030c', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('35f52d9f-0df0-4541-b60a-01561607030c', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1ac44f0e-652e-4131-b961-1382ad22d0d0', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1ac44f0e-652e-4131-b961-1382ad22d0d0', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c463aa83-ae58-4bb4-b407-fa78ae7c0d15', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c463aa83-ae58-4bb4-b407-fa78ae7c0d15', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9888e122-6c5f-4cbf-9a30-4795a3a3c68b', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a299ed9a-1219-46fd-a9c8-ed400449c1ff', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a299ed9a-1219-46fd-a9c8-ed400449c1ff', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a299ed9a-1219-46fd-a9c8-ed400449c1ff', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('337704c7-a0a7-4e5e-b57e-e9c47bbae8dd', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('337704c7-a0a7-4e5e-b57e-e9c47bbae8dd', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('82c9a36d-4b4d-4689-b146-8fa07a15028b', '7dd8e7fb-ec7b-417d-a569-aaca8a6329a2', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('74965c17-333f-48bf-8366-0ce29c3019ee', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('74965c17-333f-48bf-8366-0ce29c3019ee', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('74965c17-333f-48bf-8366-0ce29c3019ee', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('37489dc8-3407-4025-824e-33eaacf265cc', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c23c6694-d7a3-402f-ab9f-fa8639743f76', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c23c6694-d7a3-402f-ab9f-fa8639743f76', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c23c6694-d7a3-402f-ab9f-fa8639743f76', '3fc57e10-0aee-405b-a59f-7a670c911068', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('91f0796e-f5d9-44da-b226-25f43e939983', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('91f0796e-f5d9-44da-b226-25f43e939983', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4e65ec8b-c80d-42ce-8c07-fdbb4bd56267', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4e65ec8b-c80d-42ce-8c07-fdbb4bd56267', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e700c46f-3483-4b4b-a8a0-c98e576e88a2', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e700c46f-3483-4b4b-a8a0-c98e576e88a2', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('cf57a3e1-74b3-408a-9a35-1354aa2201c7', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('cf57a3e1-74b3-408a-9a35-1354aa2201c7', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d4a1e961-af12-4fa9-87ac-229d8d72e30f', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d4a1e961-af12-4fa9-87ac-229d8d72e30f', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d4a1e961-af12-4fa9-87ac-229d8d72e30f', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8d9ac9fe-632d-4dc6-ab6d-6840201c0780', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8d9ac9fe-632d-4dc6-ab6d-6840201c0780', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8d9ac9fe-632d-4dc6-ab6d-6840201c0780', '7b69db2a-7523-45e8-b224-204439e48e4b', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('bda532f4-6094-4488-b43c-c47999f0bd1b', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6644b116-8e74-44d9-9a92-995a5044e167', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('6644b116-8e74-44d9-9a92-995a5044e167', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('52e3a650-a3e4-40f5-a7b3-a870834621ac', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('2e2cd4bb-25e7-46a4-a7a6-a0ea634191a6', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('2e2cd4bb-25e7-46a4-a7a6-a0ea634191a6', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('2e2cd4bb-25e7-46a4-a7a6-a0ea634191a6', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9ac198f6-6f00-486c-8500-8b0f77e871d7', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9ac198f6-6f00-486c-8500-8b0f77e871d7', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('9ac198f6-6f00-486c-8500-8b0f77e871d7', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8eab8f4c-5121-41a5-8e74-2501a937df83', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8eab8f4c-5121-41a5-8e74-2501a937df83', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('8eab8f4c-5121-41a5-8e74-2501a937df83', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('7fccef7a-80e1-4e21-b9f1-f3237daea23b', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('7fccef7a-80e1-4e21-b9f1-f3237daea23b', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('7fccef7a-80e1-4e21-b9f1-f3237daea23b', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('4c5ce3b6-1f51-4c50-96f7-765bdb62608c', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('10b7188c-18e6-4d43-8656-68c249c2f80f', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a9c9b766-72be-489e-af64-5c471c1500da', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('beb76b77-e402-45db-bb41-4256cf348220', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('066cc27a-8eef-4536-965d-496948f3f69a', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('066cc27a-8eef-4536-965d-496948f3f69a', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('066cc27a-8eef-4536-965d-496948f3f69a', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('7b00964b-3ec4-4422-afff-6537990a3446', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('b04a6161-7792-4c00-83da-fc6e6d31a619', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('b04a6161-7792-4c00-83da-fc6e6d31a619', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('b04a6161-7792-4c00-83da-fc6e6d31a619', '322faeb1-a984-4eb5-940f-34905c084196', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('30bace09-42f4-4238-8502-f7523721ac78', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('30bace09-42f4-4238-8502-f7523721ac78', '16ad8b18-7e23-4dc0-8472-5928c744173c', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('cf49a3f2-469e-4d7f-8669-f06ef9d8b249', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d3721792-29ee-4911-aebb-6c8f239621f1', 'cc572a63-9bf7-4dd2-b81a-780291a934d8', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c4803099-853c-4e12-a49a-79db24b423d2', '3fc57e10-0aee-405b-a59f-7a670c911068', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c4803099-853c-4e12-a49a-79db24b423d2', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('c4803099-853c-4e12-a49a-79db24b423d2', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a1169378-ffca-4a9e-8311-a6a569cc1f6e', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('a1169378-ffca-4a9e-8311-a6a569cc1f6e', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('f9251fe5-5769-428f-a248-7bf8d44fab7f', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('f9251fe5-5769-428f-a248-7bf8d44fab7f', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('21e89c59-52d6-4f44-94ed-8c3d8acf30b8', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('21e89c59-52d6-4f44-94ed-8c3d8acf30b8', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d5759253-ba69-4c3a-bd8a-c059d2f459f5', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d5759253-ba69-4c3a-bd8a-c059d2f459f5', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('d5759253-ba69-4c3a-bd8a-c059d2f459f5', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('e94caa1e-857d-438b-9b78-11ec250692b0', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('08e05991-6581-4eef-858a-fb4c23cce6c5', '80784785-9f1c-4ada-a2da-3a3e0c562859', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('08e05991-6581-4eef-858a-fb4c23cce6c5', '2dfd41ee-027c-417e-80c7-6b91497e6958', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('b96beb5c-4708-44d1-a4f9-1d34f622a3ac', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('060c9903-beb3-4204-bab9-b006da1ce5a7', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('95be8fe3-8586-4ac6-8f6f-ce127c787dac', '07b90b81-496c-4219-b6b7-e08fd906200d', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('3bd6073f-6695-45a2-bfca-de04822d2c15', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0a3e8c2b-fbf5-492e-b4c9-adcbad8411fc', 'a03a0c30-aac4-4b6f-9fa6-50789c268338', 'Limited')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Limited',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0a3e8c2b-fbf5-492e-b4c9-adcbad8411fc', '933a9cf7-2b11-4788-bea8-0237fec5a23e', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('0a3e8c2b-fbf5-492e-b4c9-adcbad8411fc', '06591b18-d8c7-449b-9f2f-e65a425e7d1f', 'Year-round')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Year-round',
  updated_at = NOW();
INSERT INTO public.vendor_produce (vendor_id, produce_id, availability)
VALUES ('1cbf7617-d7e6-417f-9911-457167c92324', '1886997d-6a77-41e4-a10f-9182443d36fe', 'Seasonal')
ON CONFLICT (vendor_id, produce_id) DO UPDATE SET
  availability = 'Seasonal',
  updated_at = NOW();

COMMIT;