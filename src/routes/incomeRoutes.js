const express = require('express');

const router = express.Router();

const {

    getAllIncome,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome

} = require('../controller/incomeController');


router.get('/', getAllIncome);

router.get('/:id', getIncomeById);

router.post('/', createIncome);

router.put('/:id', updateIncome);

router.delete('/:id', deleteIncome);


module.exports = router;