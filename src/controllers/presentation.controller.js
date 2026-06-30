<<<<<<< HEAD
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
=======
const pptService = require("../services/ppt.service");

/*GENERATE PPT*/
const generatePPT = async (req, res) => {
  try {
    const {
      title,
      author,
      slides,
      includeDate
    } = req.body

    const result = await pptService.generatePPT({
      title:       title       || "Pearl Analytics Report",
      author:      author      || "Pearl",
      slides:      slides      || [],
      includeDate: includeDate !== false
    })

    return res.status(200).json({
      success: true,
      data:    result
    })

  } catch (err) {
    console.error("[generatePPT]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { generatePPT }
>>>>>>> 073cb674c90ff3ebe1e65f446f1ea93023ef87f3
