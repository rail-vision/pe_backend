const outlierService =
require("../services/outlier.service");

const runAssetOutlier =
async (req, res) => {

  try {

    const result =
      await outlierService.runAssetOutlier(
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
const runPeopleOutlier =
async (req, res) => {

  try {

    const result =
      await outlierService.runPeopleOutlier(
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
const runUploadOutlier =
async (req, res) => {

  try {

    const result =
      await outlierService.runUploadOutlier(
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
const runFinanceOutlier =
async (req, res) => {

  try {

    const result =
      await outlierService.runFinanceOutlier(
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
  runAssetOutlier,
  runPeopleOutlier,
  runUploadOutlier,
  runFinanceOutlier
};