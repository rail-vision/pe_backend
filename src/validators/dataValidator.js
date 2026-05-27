const Joi = require('joi');

const dataSchema = Joi.object({

    data_type: Joi.string()
        .required(),

    data_status: Joi.string()
        .required(),

    data_redundancy: Joi.string(),

    data_storage_medium: Joi.string(),

    encryption_used: Joi.string(),

    data_behind_firewall: Joi.string(),

    data_content: Joi.string(),

    data_confidentiality_score: Joi.number()
        .integer()
        .min(1)
        .max(10),

    data_activity: Joi.string()
        .required(),

    data_owner: Joi.string()
        .required(),

    data_users: Joi.string(),

    data_creation_month: Joi.number()
        .integer()
        .min(1)
        .max(12),

    data_creation_year: Joi.number()
        .integer(),

    data_frequency_type: Joi.string(),

    data_start_month: Joi.number()
        .integer()
        .min(1)
        .max(12),

    data_start_year: Joi.number()
        .integer(),

    data_frequency_interval: Joi.string(),

    data_currency_years: Joi.number()
        .integer()
        .min(0),

    ip_data: Joi.boolean(),

    data_retention_years: Joi.number()
        .integer()
        .min(0),

    recurring_data_size_gb: Joi.number()
        .positive(),

    non_recurring_data_size_gb: Joi.number()
        .positive()

});

module.exports = dataSchema;