const distributionService =
require("../services/distribution.service");

const generateDistribution =
async (req, res, next) => {

  try {

    const result =
      await distributionService.generate(
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

  generateDistribution

};