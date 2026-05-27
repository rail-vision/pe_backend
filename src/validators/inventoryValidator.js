const Joi = require('joi');

const inventorySchema = Joi.object({

    item_number: Joi.string()
        .required(),

    inventory_name: Joi.string()
        .min(2)
        .max(255)
        .required(),

    inventory_description: Joi.string(),

    division_name: Joi.string(),

    subdivision_name: Joi.string(),

    inventory_owner: Joi.string(),

    quantity: Joi.number()
        .integer()
        .min(0)
        .required(),

    estimated_lead_time_days: Joi.number()
        .integer()
        .min(0),

    inventory_price: Joi.number()
        .positive(),

    inventory_currency: Joi.string()
        .length(3),

    supplier_name: Joi.string(),

    supplier_id: Joi.string(),

    inventory_category: Joi.string(),

    inventory_status: Joi.string(),

    inventory_type: Joi.string(),

    inventory_location: Joi.string(),

    inventory_storage_type: Joi.string(),

    inventory_purchase_date: Joi.date(),

    inventory_expiry_date: Joi.date(),

    inventory_condition: Joi.string(),

    inventory_serial_number: Joi.string(),

    inventory_barcode: Joi.string(),

    inventory_reorder_level: Joi.number()
        .integer()
        .min(0),

    inventory_maximum_stock: Joi.number()
        .integer()
        .min(0),

    inventory_minimum_stock: Joi.number()
        .integer()
        .min(0),

    inventory_unit: Joi.string(),

    inventory_usage_frequency: Joi.string()

});

module.exports = inventorySchema;