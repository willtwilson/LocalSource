-- AlterTable
ALTER TABLE "SubmittedVendor" ADD COLUMN     "location" geometry(Point, 4326);

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "location" geometry(Point, 4326);
