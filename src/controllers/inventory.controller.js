const inventoryService =
require("../services/inventory.service");

const {
  inventorySchema
} = require("../validations/inventory.validation");

/* GET ALL */

const getInventory = async (req, res) => {

  try {

    const inventory =
      await inventoryService.getAllInventory();

    res.status(200).json({
      success: true,
      data: inventory
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

/* GET BY ID */

const getInventoryById = async (
  req,
  res
) => {

  try {

    const inventory =
      await inventoryService.getInventoryById(
        req.params.id
      );

    if (!inventory) {

      return res.status(404).json({
        success: false,
        message: "Inventory not found"
      });

    }

    res.status(200).json({
      success: true,
      data: inventory
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

/* CREATE */

const createInventory = async (
  req,
  res
) => {

  try {

    inventorySchema.parse(req.body);

    const inventory =
      await inventoryService.createInventory(
        req.body
      );

    res.status(201).json({
      success: true,
      data: inventory
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

/* UPDATE */

const updateInventory = async (
  req,
  res
) => {

  try {

    inventorySchema
      .partial()
      .parse(req.body);

    const inventory =
      await inventoryService.updateInventory(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: inventory
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

/* DELETE */

const deleteInventory = async (
  req,
  res
) => {

  try {

    await inventoryService.deleteInventory(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
      "Inventory deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {

  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory

};