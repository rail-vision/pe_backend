const prisma = require("../config/prisma");
const departmentSchema = require("../validators/departmentValidator");

// GET ALL
const getAllDepartments = async (req, res) => {

    try {

        const departments =
            await prisma.department.findMany();

        res.status(200).json(departments);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// GET BY ID
const getDepartmentById = async (req, res) => {

    try {

        const { id } = req.params;

        const department =
            await prisma.department.findUnique({

                where: {
                    department_id: id
                }

            });

        if (!department) {

            return res.status(404).json({
                error: "Department not found"
            });

        }

        res.status(200).json(department);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// CREATE
const createDepartment = async (req, res) => {

    try {

        const { error } =
            departmentSchema.validate(req.body);

        if (error) {

            return res.status(400).json({
                error: error.details[0].message
            });

        }

        const existingDepartment =
            await prisma.department.findUnique({

                where: {
                    department_name:
                    req.body.department_name
                }

            });

        if (existingDepartment) {

            return res.status(400).json({
                error:
                "Department already exists"
            });

        }

        const newDepartment =
            await prisma.department.create({

                data: req.body

            });

        res.status(201).json(newDepartment);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// UPDATE
const updateDepartment = async (req, res) => {

    try {

        const { id } = req.params;

        const existingDepartment =
            await prisma.department.findUnique({

                where: {
                    department_id: id
                }

            });

        if (!existingDepartment) {

            return res.status(404).json({
                error: "Department not found"
            });

        }

        const updatedDepartment =
            await prisma.department.update({

                where: {
                    department_id: id
                },

                data: req.body

            });

        res.status(200).json(updatedDepartment);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// DELETE
const deleteDepartment = async (req, res) => {

    try {

        const { id } = req.params;

        const existingDepartment =
            await prisma.department.findUnique({

                where: {
                    department_id: id
                }

            });

        if (!existingDepartment) {

            return res.status(404).json({
                error: "Department not found"
            });

        }

        await prisma.department.delete({

            where: {
                department_id: id
            }

        });

        res.status(200).json({
            message:
            "Department deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {

    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment

};