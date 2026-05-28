const { z } = require("zod");

const peopleSchema = z.object({

  personId: z.string().min(1),

  employeeCode: z.string().optional(),

  personName: z.string().min(3),

  personStatus: z.enum([
    "FULL_TIME",
    "PART_TIME"
  ]),

  designation: z.string(),

  designationDescription: z.string().optional(),

  workStatus: z.enum([
    "ACTIVE",
    "NON_ACTIVE"
  ]),

  personAddress: z.string(),

  country: z.string(),

  functionalUnit: z.string(),

  startDate: z.string(),

  workEmail: z.string().email(),

  personalEmail: z.string().email().optional(),

  workPhone: z.string(),

  expertise: z.string(),

  workPeriod: z.enum([
    "DAY_ONLY",
    "NIGHT_ONLY",
    "FLEXIBLE"
  ]),

  driversLicense: z.boolean()

});

module.exports = peopleSchema;