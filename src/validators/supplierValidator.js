const Joi = require('joi');

const supplierSchema = Joi.object({

    supplier_code: Joi.string()
        .required(),

    supplier_type: Joi.string()
        .required(),

    supplier_description: Joi.string(),

    supplier_certifications: Joi.string(),

    supplier_organisation_size: Joi.string(),

    supplier_turnover_currency: Joi.string()
        .length(3),

    supplier_turnover: Joi.number()
        .positive(),

    supplier_turnover_year: Joi.number()
        .integer(),

    supplier_employees_for_turnover_year: Joi.number()
        .integer()
        .min(0),

    supplier_blacklisted: Joi.boolean(),

    supplier_blacklist_date: Joi.date(),

    supplier_headquarter_country: Joi.string(),

    supplier_headquarter_city: Joi.string(),

    supplier_local_address: Joi.string(),

    supplier_pincode: Joi.string(),

    supplier_email: Joi.string()
        .email()
        .required(),

    supplier_country_code: Joi.string(),

    supplier_telephone: Joi.string(),

    supplier_linkedin: Joi.string(),

    supplier_website: Joi.string(),

    supplier_references: Joi.string()

});

module.exports = supplierSchema;