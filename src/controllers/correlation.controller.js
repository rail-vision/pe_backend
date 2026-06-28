const correlationService = require("../services/correlation.service");

const runCorrelation = async (req, res) => {

  try {

    const result =
      await correlationService.run(req.body);

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

const runPeopleCorrelation = async (req, res) => {

  try {

    const result =
      await correlationService.runPeople(req.body);

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
const runUploadCorrelation = async (req, res) => {

  try {

    const result =
      await correlationService.runUpload(req.body);

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

module.exports = {
  runCorrelation,
  runPeopleCorrelation,
  runUploadCorrelation
};