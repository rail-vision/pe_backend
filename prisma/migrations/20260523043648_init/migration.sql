-- CreateTable
CREATE TABLE "Asset" (

    "id" TEXT NOT NULL,

    "assetId" TEXT NOT NULL,

    "assetCode" TEXT NOT NULL,

    "ownerId" TEXT NOT NULL,

    "assetName" TEXT NOT NULL,

    "assetDescription" TEXT NOT NULL,

    "purchaseDate" TIMESTAMP(3) NOT NULL,

    "assetCurrency" TEXT NOT NULL,

    "purchaseValue" DOUBLE PRECISION NOT NULL,

    "currentValue" DOUBLE PRECISION NOT NULL,

    "depreciation" DOUBLE PRECISION NOT NULL,

    "assetLife" INTEGER NOT NULL,

    "assetLiquidityLevel" DOUBLE PRECISION NOT NULL,

    "annualAssetUsageLevel" DOUBLE PRECISION NOT NULL,

    "assetManufacturer" TEXT NOT NULL,

    "assetManufacturingCountry" TEXT NOT NULL,

    "assetWarrantyPeriod" INTEGER NOT NULL,

    "assetMaintenanceContract" BOOLEAN NOT NULL,

    "assetMaintenanceContractor" TEXT,

    "assetAnnualMaintenanceCost" DOUBLE PRECISION,

    "expectedMeanTimeBetweenFailure" DOUBLE PRECISION NOT NULL,

    -- Dynamic Category
    "assetCategory" TEXT NOT NULL,

    "assetDimensions" TEXT NOT NULL,

    "assetWeight" TEXT NOT NULL,

    "assetLocationGPS" TEXT NOT NULL,

    "assetLocationAddress" TEXT NOT NULL,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_assetId_key"
ON "Asset"("assetId");