const supplierService =
require("../services/supplier.service");

const 
  supplierSchema
 = require("../validations/supplier.validation");

/* GET ALL */

const getSuppliers = async (req, res) => {

  try {

    const suppliers =
      await supplierService.getAllSuppliers();

    return res.status(200).json({

      success: true,

      data: suppliers

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/* GET SINGLE */

const getSupplierById = async (
  req,
  res
) => {

  try {

    const supplier =
      await supplierService.getSupplierById(
        req.params.id
      );

    if (!supplier) {

      return res.status(404).json({

        success: false,

        message: "Supplier not found"

      });

    }

    return res.status(200).json({

      success: true,

      data: supplier

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/* CREATE */

const createSupplier = async (
  req,
  res
) => {

  try {

    supplierSchema.parse(req.body);

    const supplier =
      await supplierService.createSupplier(
        req.body
      );

    return res.status(201).json({

      success: true,

      data: supplier

    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

/* UPDATE */

const updateSupplier = async (
  req,
  res
) => {

  try {

    supplierSchema
      .partial()
      .parse(req.body);

    const supplier =
      await supplierService.updateSupplier(
        req.params.id,
        req.body
      );

    return res.status(200).json({

      success: true,

      data: supplier

    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

/* DELETE */

const deleteSupplier = async (
  req,
  res
) => {

  try {

    await supplierService.deleteSupplier(
      req.params.id
    );

    return res.status(200).json({

      success: true,

      message:
        "Supplier deleted successfully"

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier

};