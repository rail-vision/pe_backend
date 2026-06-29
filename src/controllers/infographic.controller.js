const infographicService =
require("../services/infographic.service");

const generateChart =
async (req, res, next) => {

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

    next(error);

  }

};

module.exports = {

  generateChart

};