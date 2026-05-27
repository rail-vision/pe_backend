const express = require('express');

const router = express.Router();

const {

    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory

} = require('../controller/inventoryController');


// GET ALL
router.get('/', getAllInventory);


// GET BY ID
router.get('/:id', getInventoryById);


// CREATE
router.post('/', createInventory);


// UPDATE
router.put('/:id', updateInventory);


// DELETE
router.delete('/:id', deleteInventory);


module.exports = router;