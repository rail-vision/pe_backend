const Joi = require("joi");

const activitySchema = Joi.object({

    activity_name: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.empty": "Activity name is required",
            "any.required": "Activity name is required"
        }),

    activity_description: Joi.string()
        .allow("", null),

    related_module: Joi.string()
        .valid(
            "income",
            "expense",
            "supplier",
            "inventory",
            "data_asset"
        )
        .required()
        .messages({
            "any.only": "Invalid module selected"
        }),

    related_record_id: Joi.string()
        .max(100)
        .required()
        .messages({
            "string.empty": "Related record ID is required"
        }),

    activity_owner: Joi.string()
        .max(255)
        .required()
        .messages({
            "string.empty": "Activity owner is required"
        }),

    activity_status: Joi.string()
        .valid(
            "Planned",
            "In Progress",
            "Completed",
            "Delayed",
            "Cancelled"
        )
        .required()
        .messages({
            "any.only": "Invalid activity status"
        }),

    start_date: Joi.date()
        .required(),

    target_completion_date: Joi.date()
        .greater(Joi.ref("start_date"))
        .required()
        .messages({
            "date.greater":
                "Target completion date must be after start date"
        }),

    actual_completion_date: Joi.date()
        .allow(null),

    target_quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

    actual_quantity: Joi.number()
        .integer()
        .min(0)
        .required(),

    efficiency_percentage: Joi.number()
        .min(0)
        .max(100)
        .optional(),

    remarks: Joi.string()
        .allow("", null)

});

module.exports = activitySchema;