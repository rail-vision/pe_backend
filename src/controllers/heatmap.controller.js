const heatmapService =
require("../services/heatmap.service");

const generateHeatmap =
async (req,res) => {

  try {

    const result =
      await heatmapService.generateHeatmap(
        req.body
      );

    return res.status(200).json({
      success:true,
      data:result
    });

  }

  catch(error){

    return res.status(500).json({
      success:false,
      error:error.message
    });

  }

};

module.exports = {
  generateHeatmap
};