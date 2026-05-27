const prisma = require('../config/prisma');

const dataSchema = require('../validators/dataValidator');

// GET ALL DATA
const getAllData = async (req, res) => {

    try {

        const data = await prisma.dataAsset.findMany();

        res.status(200).json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// GET DATA BY ID
const getDataById = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await prisma.dataAsset.findUnique({

            where: {
                data_id: id
            }

        });

        if (!data) {

            return res.status(404).json({
                message: "Data not found"
            });

        }

        res.status(200).json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// CREATE DATA
const createData = async (req, res) => {

    try {

        // VALIDATION
        const { error } = dataSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // DUPLICATE CHECK
        const existingData = await prisma.dataAsset.findFirst({

            where: {

                data_activity: req.body.data_activity

            }

        });

        if (existingData) {

            return res.status(400).json({

                message: 'Data activity already exists'

            });

        }

        // CREATE RECORD
        const newData = await prisma.dataAsset.create({

            data: req.body

        });

        res.status(201).json(newData);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// UPDATE DATA
const updateData = async (req, res) => {

    try {

        const { id } = req.params;

        // VALIDATION
        const { error } = dataSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK RECORD EXISTS
        const existingData = await prisma.dataAsset.findUnique({

            where: {
                data_id: id
            }

        });

        if (!existingData) {

            return res.status(404).json({

                message: "Data not found"

            });

        }

        // DUPLICATE CHECK
        const duplicateData = await prisma.dataAsset.findFirst({

            where: {

                data_activity: req.body.data_activity,

                NOT: {
                    data_id: id
                }

            }

        });

        if (duplicateData) {

            return res.status(400).json({

                message: 'Data activity already exists'

            });

        }

        // UPDATE RECORD
        const updatedData = await prisma.dataAsset.update({

            where: {
                data_id: id
            },

            data: req.body

        });

        res.status(200).json(updatedData);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};

// DELETE DATA
const deleteData = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.dataAsset.delete({

            where: {
                data_id: id
            }

        });

        res.status(200).json({
            message: "Data deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {

    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData

};