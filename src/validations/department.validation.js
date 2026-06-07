const { z } = require("zod");

const departmentSchema = z.object({

  department_name:
    z.string().min(1),

  department_head:
    z.string().optional(),

  department_description:
    z.string().optional(),

  department_status:
    z.string().optional(),

  department_location:
    z.string().optional()

});

module.exports = departmentSchema;