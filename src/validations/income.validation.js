const { z } = require("zod");

const incomeSchema = z.object({

  income_transaction_id: z.string().optional(),

  income_source: z.string().optional(),

  income_source_type: z.string().optional(),

  income_type: z.string().optional(),

  income_currency: z.string().optional(),

  income_amount: z.coerce.number().optional(),

  income_date: z.string().optional(),

  income_frequency: z.string().optional(),

  recurring_income_start_date: z.string().optional(),

  recurring_income_frequency_months:
    z.coerce.number().int().optional(),

  recurring_income_period_years:
    z.coerce.number().int().optional(),

  percentage_tax_applied:
    z.coerce.number().optional(),

  invoice_date: z.string().optional(),

  payment_terms_days:
    z.coerce.number().int().optional(),

  tds_percentage:
    z.coerce.number().optional()

});

module.exports = {
  incomeSchema
};