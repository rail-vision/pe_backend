const pptService =
require("../services/ppt.service");

const generatePPT =
async (req, res, next) => {

  try {

    const filePath =
      await pptService.generatePPT();

    return res.status(200).json({

      success: true,

      file: filePath

    });

  } catch (error) {

    next(error);

  }

};

module.exports = {

  generatePPT

};