const pptService = require("../services/ppt.service");

/*GENERATE PPT*/
const generatePPT = async (req, res) => {
  try {
    const {
      title,
      author,
      slides,
      includeDate
    } = req.body

    const result = await pptService.generatePPT({
      title:       title       || "Pearl Analytics Report",
      author:      author      || "Pearl",
      slides:      slides      || [],
      includeDate: includeDate !== false
    })

    return res.status(200).json({
      success: true,
      data:    result
    })

  } catch (err) {
    console.error("[generatePPT]", err.message)
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { generatePPT }