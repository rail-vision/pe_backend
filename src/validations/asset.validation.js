const { z } = require("zod");

const assetSchema = z.object({
  assetId:   z.string().optional(),
  assetCode: z.string(),
  ownerId:   z.string(),
  assetName: z.string(),
  assetDescription: z.string().optional().default(""),

  purchaseDate:  z.coerce.date(),
  assetCurrency: z.string().optional().default("USD"),
  purchaseValue: z.number(),
  currentValue:  z.number(),
  depreciation:  z.number(),

  assetLife:             z.number().optional().default(0),
  assetLiquidityLevel:   z.number().optional().default(0),
  annualAssetUsageLevel: z.number().optional().default(0),

  assetManufacturer:        z.string().optional().default(""),
  assetManufacturingCountry:z.string().optional().default(""),
  assetWarrantyPeriod:      z.number().optional().default(0),

  assetMaintenanceContract:    z.coerce.boolean().optional().default(false),
  assetMaintenanceContractor:  z.string().optional(),
  assetAnnualMaintenanceCost:  z.number().optional(),

  expectedMeanTimeBetweenFailure: z.number().optional().default(0),

  assetCategory:   z.string().optional().default(""),
  assetDimensions: z.string().optional().default(""),
  assetWeight:     z.string().optional().default(""),
  assetLocationGPS:     z.string().optional().default(""),
  assetLocationAddress: z.string().optional().default(""),
});

module.exports = assetSchema;