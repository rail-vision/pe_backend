const prisma = require('../config/prisma');

const supplierSchema = require('../validators/supplierValidator');


// GET ALL SUPPLIERS
const getAllSuppliers = async (req, res) => {

    try {

        const suppliers = await prisma.supplier.findMany();

        res.status(200).json(suppliers);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// GET SUPPLIER BY ID
const getSupplierById = async (req, res) => {

    try {

        const { id } = req.params;

        const supplier = await prisma.supplier.findUnique({

            where: {
                supplier_id: id
            }

        });

        if (!supplier) {

            return res.status(404).json({
                message: "Supplier not found"
            });

        }

        res.status(200).json(supplier);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};



// CREATE SUPPLIER
const createSupplier = async (req, res) => {

    try {

        // VALIDATION
        const { error } = supplierSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // DUPLICATE SUPPLIER CODE
        const existingSupplierCode = await prisma.supplier.findFirst({

            where: {

                supplier_code: req.body.supplier_code

            }

        });

        if (existingSupplierCode) {

            return res.status(400).json({

                message: 'Supplier code already exists'

            });

        }

        // DUPLICATE EMAIL
        const existingSupplierEmail = await prisma.supplier.findFirst({

            where: {

                supplier_email: req.body.supplier_email

            }

        });

        if (existingSupplierEmail) {

            return res.status(400).json({

                message: 'Supplier email already exists'

            });

        }

        // CREATE RECORD
        const newSupplier = await prisma.supplier.create({

            data: req.body

        });

        res.status(201).json(newSupplier);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// UPDATE SUPPLIER
const updateSupplier = async (req, res) => {

    try {

        const { id } = req.params;

        // VALIDATION
        const { error } = supplierSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK RECORD EXISTS
        const existingSupplier = await prisma.supplier.findUnique({

            where: {
                supplier_id: id
            }

        });

        if (!existingSupplier) {

            return res.status(404).json({

                message: "Supplier not found"

            });

        }

        // DUPLICATE SUPPLIER CODE
        const duplicateCode = await prisma.supplier.findFirst({

            where: {

                supplier_code: req.body.supplier_code,

                NOT: {
                    supplier_id: id
                }

            }

        });

        if (duplicateCode) {

            return res.status(400).json({

                message: 'Supplier code already exists'

            });

        }

        // DUPLICATE EMAIL
        const duplicateEmail = await prisma.supplier.findFirst({

            where: {

                supplier_email: req.body.supplier_email,

                NOT: {
                    supplier_id: id
                }

            }

        });

        if (duplicateEmail) {

            return res.status(400).json({

                message: 'Supplier email already exists'

            });

        }

        // UPDATE RECORD
        const updatedSupplier = await prisma.supplier.update({

            where: {
                supplier_id: id
            },

            data: req.body

        });

        res.status(200).json(updatedSupplier);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};

// DELETE SUPPLIER
const deleteSupplier = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.supplier.delete({

            where: {
                supplier_id: id
            }

        });

        res.status(200).json({
            message: "Supplier deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {

    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier

};