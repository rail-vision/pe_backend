const prisma = require('../config/prisma');

const inventorySchema = require('../validators/inventoryValidator');


// GET ALL INVENTORY
const getAllInventory = async (req, res) => {

    try {

        const inventory = await prisma.inventory.findMany();

        res.status(200).json(inventory);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// GET INVENTORY BY ID
const getInventoryById = async (req, res) => {

    try {

        const { id } = req.params;

        const inventory = await prisma.inventory.findUnique({

            where: {
                inventory_id: id
            }

        });

        if (!inventory) {

            return res.status(404).json({

                message: "Inventory not found"

            });

        }

        res.status(200).json(inventory);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// CREATE INVENTORY
const createInventory = async (req, res) => {

    try {

        // VALIDATION
        const { error } = inventorySchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // DUPLICATE ITEM NUMBER
        const existingItem = await prisma.inventory.findFirst({

            where: {

                item_number: req.body.item_number

            }

        });

        if (existingItem) {

            return res.status(400).json({

                message: 'Item number already exists'

            });

        }

        // DUPLICATE SERIAL NUMBER
        if (req.body.inventory_serial_number) {

            const existingSerial = await prisma.inventory.findFirst({

                where: {

                    inventory_serial_number:
                        req.body.inventory_serial_number

                }

            });

            if (existingSerial) {

                return res.status(400).json({

                    message: 'Inventory serial number already exists'

                });

            }

        }

        // DUPLICATE BARCODE
        if (req.body.inventory_barcode) {

            const existingBarcode = await prisma.inventory.findFirst({

                where: {

                    inventory_barcode:
                        req.body.inventory_barcode

                }

            });

            if (existingBarcode) {

                return res.status(400).json({

                    message: 'Inventory barcode already exists'

                });

            }

        }

        // CREATE RECORD
        const newInventory = await prisma.inventory.create({

            data: req.body

        });

        res.status(201).json(newInventory);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// UPDATE INVENTORY
const updateInventory = async (req, res) => {

    try {

        const { id } = req.params;

        // VALIDATION
        const { error } = inventorySchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                error: error.details[0].message

            });

        }

        // CHECK RECORD EXISTS
        const existingInventory = await prisma.inventory.findUnique({

            where: {
                inventory_id: id
            }

        });

        if (!existingInventory) {

            return res.status(404).json({

                message: "Inventory not found"

            });

        }

        // DUPLICATE ITEM NUMBER
        const duplicateItem = await prisma.inventory.findFirst({

            where: {

                item_number: req.body.item_number,

                NOT: {
                    inventory_id: id
                }

            }

        });

        if (duplicateItem) {

            return res.status(400).json({

                message: 'Item number already exists'

            });

        }

        // DUPLICATE SERIAL NUMBER
        if (req.body.inventory_serial_number) {

            const duplicateSerial = await prisma.inventory.findFirst({

                where: {

                    inventory_serial_number:
                        req.body.inventory_serial_number,

                    NOT: {
                        inventory_id: id
                    }

                }

            });

            if (duplicateSerial) {

                return res.status(400).json({

                    message:
                        'Inventory serial number already exists'

                });

            }

        }

        // DUPLICATE BARCODE
        if (req.body.inventory_barcode) {

            const duplicateBarcode = await prisma.inventory.findFirst({

                where: {

                    inventory_barcode:
                        req.body.inventory_barcode,

                    NOT: {
                        inventory_id: id
                    }

                }

            });

            if (duplicateBarcode) {

                return res.status(400).json({

                    message:
                        'Inventory barcode already exists'

                });

            }

        }

        // UPDATE RECORD
        const updatedInventory = await prisma.inventory.update({

            where: {
                inventory_id: id
            },

            data: req.body

        });

        res.status(200).json(updatedInventory);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// DELETE INVENTORY
const deleteInventory = async (req, res) => {

    try {

        const { id } = req.params;

        // CHECK RECORD EXISTS
        const existingInventory = await prisma.inventory.findUnique({

            where: {
                inventory_id: id
            }

        });

        if (!existingInventory) {

            return res.status(404).json({

                message: "Inventory not found"

            });

        }

        // DELETE RECORD
        await prisma.inventory.delete({

            where: {
                inventory_id: id
            }

        });

        res.status(200).json({

            message: "Inventory deleted successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


module.exports = {

    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory

};