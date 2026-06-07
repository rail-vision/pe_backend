const { z } = require("zod");

const inventorySchema = z.object({

  item_number: z.string().min(1),

  inventory_name: z.string().min(2),

  inventory_description: z.string().optional(),

  division_name: z.string().optional(),

  subdivision_name: z.string().optional(),

  inventory_owner: z.string().optional(),

  quantity: z.number().int().min(0),

  estimated_lead_time_days: z.number().int().min(0).optional(),

  inventory_price: z.number().nonnegative().optional(),

  inventory_currency: z.string().optional(),

  supplier_name: z.string().optional(),

  supplier_id: z.string().optional(),

  inventory_category: z.string().optional(),

  inventory_status: z.string().optional(),

  inventory_type: z.string().optional(),

  inventory_location: z.string().optional(),

  inventory_storage_type: z.string().optional(),

  inventory_purchase_date: z.string().optional(),

  inventory_expiry_date: z.string().optional(),

  inventory_condition: z.string().optional(),

  inventory_serial_number: z.string().optional(),

  inventory_barcode: z.string().optional(),

  inventory_reorder_level: z.number().int().optional(),

  inventory_maximum_stock: z.number().int().optional(),

  inventory_minimum_stock: z.number().int().optional(),

  inventory_unit: z.string().optional(),

  inventory_usage_frequency: z.string().optional()

});

module.exports = {
  inventorySchema
};