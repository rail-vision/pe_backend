const express = require('express');

const router = express.Router();

const {

    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier

} = require('../controller/supplierController');


// GET ALL
router.get('/', getAllSuppliers);


// GET BY ID
router.get('/:id', getSupplierById);


// CREATE
router.post('/', createSupplier);


// UPDATE
router.put('/:id', updateSupplier);


// DELETE
router.delete('/:id', deleteSupplier);


module.exports = router;