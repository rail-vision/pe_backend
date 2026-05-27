const Joi = require('joi');

const incomeSchema = Joi.object({

    income_transaction_id: Joi.string()
        .required(),

    income_source: Joi.string()
        .min(2)
        .max(255)
        .required(),

    income_source_type: Joi.string()
        .required(),

    income_type: Joi.string()
        .required(),

    income_currency: Joi.string()
        .length(3)
        .required(),

    income_amount: Joi.number()
        .positive()
        .required(),

    income_date: Joi.date(),

    income_frequency: Joi.string(),

    recurring_income_start_date: Joi.date(),

    recurring_income_frequency_months: Joi.number()
        .integer()
        .min(1),

    recurring_income_period_years: Joi.number()
        .integer()
        .min(1),

    percentage_tax_applied: Joi.number()
        .min(0)
        .max(100),

    invoice_date: Joi.date(),

    payment_terms_days: Joi.number()
        .integer()
        .min(0),

    tds_percentage: Joi.number()
        .min(0)
        .max(100)

});

module.exports = incomeSchema;