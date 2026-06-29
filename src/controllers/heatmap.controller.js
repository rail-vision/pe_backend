const heatmapService =
require("../services/heatmap.service");

const generateHeatmap =
async (req, res, next) => {

  try {

    const result =
      await heatmapService.generateHeatmap(
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

  generateHeatmap

};