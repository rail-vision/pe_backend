const express = require("express");

const {

  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier

} = require(
  "../controller/supplier.controller"
);

const router = express.Router();

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

router.post("/", createSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;