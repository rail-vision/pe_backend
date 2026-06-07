const { z } = require("zod");

const expenseSchema = z.object({

  expense_transaction_id: z.string().optional(),

  expense_destination: z.string().optional(),

  expense_destination_type: z.string().optional(),

  expense_type: z.string().optional(),

  expense_currency: z.string().optional(),

  expense_amount:
    z.coerce.number().optional(),

  expense_date:
    z.string().optional(),

  expense_frequency:
    z.string().optional(),

  recurring_expense_start_date:
    z.string().optional(),

  recurring_expense_frequency_months:
    z.coerce.number().int().optional(),

  recurring_expense_period_years:
    z.coerce.number().int().optional(),

  percentage_tax_applied:
    z.coerce.number().optional(),

  supplier_invoice_date:
    z.string().optional(),

  payment_terms_days:
    z.coerce.number().int().optional(),

  tds_percentage:
    z.coerce.number().optional(),

  payment_mode:
    z.string().optional()

});

module.exports = expenseSchema;