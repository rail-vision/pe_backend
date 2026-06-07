const { z } = require("zod");

const dataSchema = z.object({

  data_type: z.string().optional(),

  data_status: z.string().optional(),

  data_redundancy: z.string().optional(),

  data_storage_medium: z.string().optional(),

  encryption_used: z.string().optional(),

  data_behind_firewall: z.string().optional(),

  data_content: z.string().optional(),

  data_confidentiality_score:
    z.coerce.number().int().optional(),

  data_activity: z.string().optional(),

  data_owner: z.string().optional(),

  data_users: z.string().optional(),

  data_creation_month:
    z.coerce.number().int().min(1).max(12).optional(),

  data_creation_year:
    z.coerce.number().int().optional(),

  data_frequency_type:
    z.string().optional(),

  data_frequency_interval:
    z.string().optional(),

  data_start_date:
    z.string().optional(),

  data_currency_years:
    z.coerce.number().int().optional(),

  ip_data:
    z.boolean().optional(),

  data_retention_years:
    z.coerce.number().int().optional(),

  recurring_data_size_gb:
    z.coerce.number().optional(),

  non_recurring_data_size_gb:
    z.coerce.number().optional()

});

module.exports = dataSchema;