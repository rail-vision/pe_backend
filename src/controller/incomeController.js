const prisma = require('../config/prisma');

const incomeSchema = require('../validators/incomeValidator');

// GET ALL INCOME
const getAllIncome = async (req, res) => {

    try {

        const income = await prisma.income.findMany();

        res.status(200).json(income);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    getAllIncome
};

const getIncomeById = async (req, res) => {

    try {

        const { id } = req.params;

        const income = await prisma.income.findUnique({

            where: {
                income_id: id
            }

        });

        if (!income) {

            return res.status(404).json({
                message: "Income not found"
            });

        }

        res.status(200).json(income);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// CREATE INCOME

const createIncome = async (req, res) => {

    try {

        // VALIDATION
        const { error } = incomeSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK DUPLICATE TRANSACTION ID
        const existingIncome = await prisma.income.findUnique({

            where: {

                income_transaction_id: req.body.income_transaction_id

            }

        });

        if (existingIncome) {

            return res.status(400).json({

                message: 'Income transaction already exists'

            });

        }

        // CREATE RECORD
        const newIncome = await prisma.income.create({

            data: req.body

        });

        res.status(201).json(newIncome);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};

// UPDATE INCOME
const updateIncome = async (req, res) => {

    try {

        const { id } = req.params;

        // VALIDATION
        const { error } = incomeSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK RECORD EXISTS
        const existingIncome = await prisma.income.findUnique({

            where: {
                income_id: id
            }

        });

        if (!existingIncome) {

            return res.status(404).json({

                message: "Income not found"

            });

        }

        // DUPLICATE TRANSACTION CHECK
        const duplicateTransaction = await prisma.income.findFirst({

            where: {

                income_transaction_id: req.body.income_transaction_id,

                NOT: {
                    income_id: id
                }

            }

        });

        if (duplicateTransaction) {

            return res.status(400).json({

                message: 'Income transaction already exists'

            });

        }

        // UPDATE RECORD
        const updatedIncome = await prisma.income.update({

            where: {
                income_id: id
            },

            data: req.body

        });

        res.status(200).json(updatedIncome);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};

// DELETE INCOME
const deleteIncome = async (req, res) => {

    try {

        const { id } = req.params;

        // CHECK IF RECORD EXISTS
        const existingIncome = await prisma.income.findUnique({

            where: {
                income_id: id
            }

        });

        // IF NOT FOUND
        if (!existingIncome) {

            return res.status(404).json({
                message: "Income not found"
            });

        }

        // DELETE RECORD
        await prisma.income.delete({

            where: {
                income_id: id
            }

        });

        // SUCCESS RESPONSE
        res.status(200).json({
            message: "Income deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {

    getAllIncome,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome

};