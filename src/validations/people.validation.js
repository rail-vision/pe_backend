const { z } = require("zod");

const peopleSchema = z.object({
  personId:               z.string().optional(),
  employeeCode:           z.string().optional(),
  personName:             z.string(),
  personStatus:           z.enum(["FULL_TIME", "PART_TIME"]),
  designation:            z.string(),
  designationDescription: z.string().optional().default(""),
  workStatus:             z.enum(["ACTIVE", "NON_ACTIVE"]),
  personAddress:          z.string(),
  country:                z.string(),
  functionalUnit:         z.string(),
  startDate:              z.coerce.date(),
  workEmail:              z.string(),
  personalEmail:          z.string().optional().default(""),
  workPhone:              z.string(),
  expertise:              z.string(),
  workPeriod:             z.enum(["DAY_ONLY", "NIGHT_ONLY", "FLEXIBLE"]),
  driversLicense:         z.boolean(),
  assetId:                z.string().optional(),
});

module.exports = peopleSchema;