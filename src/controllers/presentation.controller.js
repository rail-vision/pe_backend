const presentationService = require("../services/presentation.service");
console.log("Presentation Controller Loaded");
/*
CREATE PRESENTATION
*/

const createPresentation = async (req, res) => {

    try {

        const result =
            await presentationService.createPresentation(req.body);

        return res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

/*
GET ALL PRESENTATIONS
*/

const getPresentations = async (req, res) => {

    try {

        const result =
            await presentationService.getPresentations();

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

/*
GET PRESENTATION BY ID
*/

const getPresentationById = async (req, res) => {

    try {

        const result =
            await presentationService.getPresentationById(
                req.params.presentationId
            );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

/*
UPDATE PRESENTATION
*/

const updatePresentation = async (req, res) => {

    try {

        const result =
            await presentationService.updatePresentation(
                req.params.presentationId,
                req.body
            );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

/*
DELETE PRESENTATION
*/

const deletePresentation = async (req, res) => {

    try {

        await presentationService.deletePresentation(
            req.params.presentationId
        );

        return res.status(200).json({
            success: true,
            message: "Presentation deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

module.exports = {

    createPresentation,

    getPresentations,

    getPresentationById,

    updatePresentation,

    deletePresentation

};