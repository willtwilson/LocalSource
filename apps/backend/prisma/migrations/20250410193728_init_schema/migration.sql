-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hours" JSONB,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "photos" JSONB,
    "paymentMethods" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VendorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorTypeRelation" (
    "vendorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "VendorTypeRelation_pkey" PRIMARY KEY ("vendorId","typeId")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "userId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("userId","vendorId")
);

-- CreateTable
CREATE TABLE "LowStockReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "comment" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LowStockReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedVendor" (
    "id" SERIAL NOT NULL,
    "submitterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmittedVendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_ownerId_key" ON "Vendor"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorType_name_key" ON "VendorType"("name");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorTypeRelation" ADD CONSTRAINT "VendorTypeRelation_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorTypeRelation" ADD CONSTRAINT "VendorTypeRelation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VendorType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowStockReport" ADD CONSTRAINT "LowStockReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowStockReport" ADD CONSTRAINT "LowStockReport_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedVendor" ADD CONSTRAINT "SubmittedVendor_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
