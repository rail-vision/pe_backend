const express = require('express');

const router = express.Router();

const {

    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData

} = require('../controller/dataController');


// GET ALL
router.get('/', getAllData);


// GET BY ID
router.get('/:id', getDataById);


// CREATE
router.post('/', createData);


// UPDATE
router.put('/:id', updateData);


// DELETE
router.delete('/:id', deleteData);


module.exports = router;