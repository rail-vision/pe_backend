const { z } = require("zod");

const supplierSchema = z.object({

  supplier_code: z.string().optional(),

  supplier_type: z.string().optional(),

  supplier_description: z.string().optional(),

  supplier_certifications: z.string().optional(),

  supplier_organisation_size: z.string().optional(),

  supplier_turnover_currency: z.string().optional(),

  supplier_turnover: z.coerce.number().optional(),

  supplier_turnover_year:
    z.coerce.number().int().optional(),

  supplier_employees_for_turnover_year:
    z.coerce.number().int().optional(),

  supplier_blacklisted:
    z.boolean().optional(),

  supplier_blacklist_date:
    z.string().optional(),

  supplier_headquarter_country:
    z.string().optional(),

  supplier_headquarter_city:
    z.string().optional(),

  supplier_local_address:
    z.string().optional(),

  supplier_pincode:
    z.string().optional(),

  supplier_email:
    z.string().email().optional(),

  supplier_country_code:
    z.string().optional(),

  supplier_telephone:
    z.string().optional(),

  supplier_linkedin:
    z.string().optional(),

  supplier_website:
    z.string().optional(),

  supplier_references:
    z.string().optional()

});

module.exports = supplierSchema;