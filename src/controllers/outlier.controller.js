const outlierService = require("../services/outlier.service");

/*ASSET OUTLIER|POST /api/outlier/assets/run*/
const runAssetOutlier = async (req, res) => {
  try {
    const { variable, sigma } = req.body

    if (!variable) {
      return res.status(400).json({
        success: false,
        message: "variable is required"
      })
    }

    const result = await outlierService.runAssetOutlier({
      variable,
      sigma: sigma ?? 3
    })

    return res.status(200).json({ success: true, data: result })

  } catch (err) {
    console.error("[runAssetOutlier]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

/*PEOPLE OUTLIER|POST /api/outlier/people/run*/
const runPeopleOutlier = async (req, res) => {
  try {
    const { variable, sigma } = req.body

    if (!variable) {
      return res.status(400).json({
        success: false,
        message: "variable is required"
      })
    }

    const result = await outlierService.runPeopleOutlier({
      variable,
      sigma: sigma ?? 3
    })

    return res.status(200).json({ success: true, data: result })

  } catch (err) {
    console.error("[runPeopleOutlier]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

/*UPLOAD OUTLIER|POST /api/outlier/upload/run*/
const runUploadOutlier = async (req, res) => {
  try {
    const { variable, sigma, rows } = req.body

    if (!variable) {
      return res.status(400).json({
        success: false,
        message: "variable is required"
      })
    }

    if (!rows) {
      return res.status(400).json({
        success: false,
        message: "rows is required"
      })
    }

    const result = outlierService.runUploadOutlier({
      variable,
      sigma: sigma ?? 3,
      rows
    })

    return res.status(200).json({ success: true, data: result })

  } catch (err) {
    console.error("[runUploadOutlier]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { runAssetOutlier, runPeopleOutlier, runUploadOutlier }