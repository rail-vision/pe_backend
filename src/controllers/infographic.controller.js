const infographicService =
require("../services/infographic.service");

const generateChart =
async (req, res) => {

  try {

    const result =
      await infographicService.generate(
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

module.exports = {

  generateChart

};