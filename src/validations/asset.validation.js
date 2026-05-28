const { z } = require("zod");

const assetSchema = z.object({

  assetCode: z.string(),

  ownerId: z.string(),

  assetName: z.string(),

  assetDescription: z.string(),

  purchaseDate: z.string(),

  assetCurrency: z.string(),

  purchaseValue: z.number(),

  currentValue: z.number(),

  depreciation: z.number(),

  assetLife: z.number(),

  assetLiquidityLevel: z.number(),

  annualAssetUsageLevel: z.number(),

  assetManufacturer: z.string(),

  assetManufacturingCountry: z.string(),

  assetWarrantyPeriod: z.number(),

  assetMaintenanceContract: z.boolean(),

  assetMaintenanceContractor: z.string().optional(),

  assetAnnualMaintenanceCost: z.number().optional(),

  expectedMeanTimeBetweenFailure: z.number(),

  assetCategory: z.string(),

  assetDimensions: z.string(),

  assetWeight: z.string(),

  assetLocationGPS: z.string(),

  assetLocationAddress: z.string()

});

module.exports = assetSchema;