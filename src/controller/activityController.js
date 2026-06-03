const prisma = require('../config/prisma');
const activitySchema = require('../validators/activityValidator');

// GET ALL ACTIVITIES
const getAllActivities = async (req, res) => {

    try {

        const activities = await prisma.activity.findMany();

        res.status(200).json(activities);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// GET ACTIVITY BY ID
const getActivityById = async (req, res) => {

    try {

        const { id } = req.params;

        const activity = await prisma.activity.findUnique({

            where: {
                activity_id: id
            }

        });

        if (!activity) {

            return res.status(404).json({
                message: "Activity not found"
            });

        }

        res.status(200).json(activity);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// CREATE ACTIVITY
const createActivity = async (req, res) => {

    try {

        const { error } = activitySchema.validate(req.body);

        if (error) {

            return res.status(400).json({
                error: error.details[0].message
            });

        }

        const data = req.body;

        // AUTO CALCULATE EFFICIENCY
        if (
            data.target_quantity &&
            data.actual_quantity
        ) {

            data.efficiency_percentage =
                (data.actual_quantity / data.target_quantity) * 100;

        }

        const newActivity = await prisma.activity.create({

            data

        });

        res.status(201).json(newActivity);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// UPDATE ACTIVITY
const updateActivity = async (req, res) => {

    try {

        const { id } = req.params;

        const existingActivity = await prisma.activity.findUnique({

            where: {
                activity_id: id
            }

        });

        if (!existingActivity) {

            return res.status(404).json({
                message: "Activity not found"
            });

        }

        const data = req.body;

        // AUTO CALCULATE EFFICIENCY
        if (
            data.target_quantity &&
            data.actual_quantity
        ) {

            data.efficiency_percentage =
                (data.actual_quantity / data.target_quantity) * 100;

        }

        const updatedActivity = await prisma.activity.update({

            where: {
                activity_id: id
            },

            data

        });

        res.status(200).json(updatedActivity);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// DELETE ACTIVITY
const deleteActivity = async (req, res) => {

    try {

        const { id } = req.params;

        const existingActivity = await prisma.activity.findUnique({

            where: {
                activity_id: id
            }

        });

        if (!existingActivity) {

            return res.status(404).json({
                message: "Activity not found"
            });

        }

        await prisma.activity.delete({

            where: {
                activity_id: id
            }

        });

        res.status(200).json({
            message: "Activity deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {

    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity

};