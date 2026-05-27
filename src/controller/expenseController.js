const prisma = require('../config/prisma');

const expenseSchema = require('../validators/expenseValidator');

// GET ALL EXPENSE
const getAllExpense = async (req, res) => {

    try {

        const expense = await prisma.expense.findMany();

        res.status(200).json(expense);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// GET EXPENSE BY ID
const getExpenseById = async (req, res) => {

    try {

        const { id } = req.params;

        const expense = await prisma.expense.findUnique({

            where: {
                expense_id: id
            }

        });

        if (!expense) {

            return res.status(404).json({
                message: "Expense not found"
            });

        }

        res.status(200).json(expense);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// CREATE EXPENSE
const createExpense = async (req, res) => {

    try {

        // VALIDATION
        const { error } = expenseSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // DUPLICATE CHECK
        const existingExpense = await prisma.expense.findUnique({

            where: {

                expense_transaction_id: req.body.expense_transaction_id

            }

        });

        if (existingExpense) {

            return res.status(400).json({

                message: 'Expense transaction already exists'

            });

        }

        // CREATE RECORD
        const newExpense = await prisma.expense.create({

            data: req.body

        });

        res.status(201).json(newExpense);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// UPDATE EXPENSE
const updateExpense = async (req, res) => {

    try {

        const { id } = req.params;

        // VALIDATION
        const { error } = expenseSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK RECORD EXISTS
        const existingExpense = await prisma.expense.findFirst({

    where: {

        expense_transaction_id: req.body.expense_transaction_id

    }

});

        if (!existingExpense) {

            return res.status(404).json({

                message: "Expense not found"

            });

        }

        // DUPLICATE CHECK
        const duplicateExpense = await prisma.expense.findFirst({

            where: {

                expense_transaction_id: req.body.expense_transaction_id,

                NOT: {
                    expense_id: id
                }

            }

        });

        if (duplicateExpense) {

            return res.status(400).json({

                message: 'Expense transaction already exists'

            });

        }

        // UPDATE RECORD
        const updatedExpense = await prisma.expense.update({

            where: {
                expense_id: id
            },

            data: req.body

        });

        res.status(200).json(updatedExpense);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {

    try {

        const { id } = req.params;

        const existingExpense = await prisma.expense.findUnique({

            where: {
                expense_id: id
            }

        });

        if (!existingExpense) {

            return res.status(404).json({
                message: "Expense not found"
            });

        }

        await prisma.expense.delete({

            where: {
                expense_id: id
            }

        });

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {

    getAllExpense,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense

};