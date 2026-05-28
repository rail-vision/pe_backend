const uploadService = require("../services/upload.service");

const uploadModuleData = async (req, res) => {

  try {

    const { module } = req.params;
    const { rows } = req.body;

    const result = await uploadService.processUpload(
      module,
      rows
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  uploadModuleData
};