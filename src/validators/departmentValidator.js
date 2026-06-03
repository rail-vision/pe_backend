const Joi = require("joi");

const departmentSchema = Joi.object({

    department_name: Joi.string()
        .required()
        .messages({
            "string.empty": "Department name is required"
        }),

    department_head: Joi.string()
        .allow("", null),

    department_description: Joi.string()
        .allow("", null),

    department_status: Joi.string()
        .valid("Active", "Inactive")
        .default("Active"),

    department_location: Joi.string()
        .allow("", null)

});

module.exports = departmentSchema;