const express = require('express');

const router = express.Router();

const {

    getAllExpense,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense

} = require('../controller/expenseController');


router.get('/', getAllExpense);

router.get('/:id', getExpenseById);

router.post('/', createExpense);

router.put('/:id', updateExpense);

router.delete('/:id', deleteExpense);


module.exports = router;