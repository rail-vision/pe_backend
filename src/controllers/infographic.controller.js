const infographicService = require("../services/infographic.service");

/*
|--------------------------------------------------------------------------
| GENERATE CHART
| POST /api/infographics/generate
|--------------------------------------------------------------------------
*/
const generateChart = async (req, res) => {
  try {
    const { module, chartType, xAxis, yAxis, limit } = req.body

    if (!module || !chartType || !xAxis || !yAxis) {
      return res.status(400).json({
        success: false,
        message: "module, chartType, xAxis and yAxis are required"
      })
    }

    const result = await infographicService.generate({
      module, chartType, xAxis, yAxis, limit
    })

    return res.status(200).json({ success: true, data: result })

  } catch (err) {
    console.error("[generateChart]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

/*
|--------------------------------------------------------------------------
| GET ALLOWED OPTIONS
| GET /api/infographics/options
| Returns allowed modules, chart types, axes for frontend dropdowns
|--------------------------------------------------------------------------
*/
const getOptions = (req, res) => {
  const { ALLOWED_MODULES, ALLOWED_CHART_TYPES, MODULE_CONFIG } = infographicService

  const options = ALLOWED_MODULES.reduce((obj, mod) => {
    obj[mod] = {
      labelFields: MODULE_CONFIG[mod].labelFields,
      valueFields: MODULE_CONFIG[mod].valueFields
    }
    return obj
  }, {})

  return res.status(200).json({
    success: true,
    data: {
      modules:    ALLOWED_MODULES,
      chartTypes: ALLOWED_CHART_TYPES,
      fields:     options
    }
  })
}

module.exports = { generateChart, getOptions }