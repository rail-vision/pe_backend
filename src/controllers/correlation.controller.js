const correlationService = require("../services/correlation.service");

/*
|--------------------------------------------------------------------------
| ASSET CORRELATION
| POST /api/correlation/run
|--------------------------------------------------------------------------
*/
const runCorrelation = async (req, res) => {
  try {
    const { variables } = req.body

    if (!variables) {
      return res.status(400).json({
        success: false,
        message: "variables field is required"
      })
    }

    const result = await correlationService.run({ variables })

    return res.status(200).json({
      success: true,
      data:    result
    })

  } catch (err) {
    console.error("[runCorrelation]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message  // ✅ consistent "message" key
    })
  }
}

/*
|--------------------------------------------------------------------------
| PEOPLE CORRELATION
| POST /api/correlation/people/run
|--------------------------------------------------------------------------
*/
const runPeopleCorrelation = async (req, res) => {
  try {
    const { variables } = req.body

    if (!variables) {
      return res.status(400).json({
        success: false,
        message: "variables field is required"
      })
    }

    const result = await correlationService.runPeople({ variables })

    return res.status(200).json({
      success: true,
      data:    result
    })

  } catch (err) {
    console.error("[runPeopleCorrelation]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

/*
|--------------------------------------------------------------------------
| UPLOAD CORRELATION
| POST /api/correlation/upload/run
|--------------------------------------------------------------------------
*/
const runUploadCorrelation = async (req, res) => {
  try {
    const { variables, rows } = req.body

    if (!variables) {
      return res.status(400).json({
        success: false,
        message: "variables field is required"
      })
    }

    if (!rows) {
      return res.status(400).json({
        success: false,
        message: "rows field is required"
      })
    }

    const result = correlationService.runUpload({ variables, rows })

    return res.status(200).json({
      success: true,
      data:    result
    })

  } catch (err) {
    console.error("[runUploadCorrelation]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { runCorrelation, runPeopleCorrelation, runUploadCorrelation }