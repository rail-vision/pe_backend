const Joi = require('joi');

const expenseSchema = Joi.object({

    expense_transaction_id: Joi.string()
        .required(),

    expense_destination: Joi.string()
        .min(2)
        .max(255)
        .required(),

    expense_destination_type: Joi.string()
        .required(),

    expense_type: Joi.string()
        .required(),

    expense_currency: Joi.string()
        .length(3)
        .required(),

    expense_amount: Joi.number()
        .positive()
        .required(),

    expense_date: Joi.date(),

    expense_frequency: Joi.string(),

    recurring_expense_start_date: Joi.date(),

    recurring_expense_frequency_months: Joi.number()
        .integer()
        .min(1),

    recurring_expense_period_years: Joi.number()
        .integer()
        .min(1),

    percentage_tax_applied: Joi.number()
        .min(0)
        .max(100),

    supplier_invoice_date: Joi.date(),

    payment_terms_days: Joi.number()
        .integer()
        .min(0),

    tds_percentage: Joi.number()
        .min(0)
        .max(100),

    payment_mode: Joi.string()

});

module.exports = expenseSchema;