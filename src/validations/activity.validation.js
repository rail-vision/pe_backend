const { z } = require("zod");

const activitySchema = z.object({

  activity_name:
    z.string().min(1),

  activity_description:
    z.string().optional(),

  related_module:
    z.string().optional(),

  related_record_id:
    z.string().optional(),

  activity_owner:
    z.string().optional(),

  activity_status:
    z.string().optional(),

  start_date:
    z.string().optional(),

  target_completion_date:
    z.string().optional(),

  actual_completion_date:
    z.string().optional(),

  target_quantity:
    z.coerce.number().int().optional(),

  actual_quantity:
    z.coerce.number().int().optional(),

  efficiency_percentage:
    z.coerce.number().optional(),

  remarks:
    z.string().optional()

});

module.exports = activitySchema;