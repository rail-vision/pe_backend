const { insertDynamicData } = require("../services/dynamic.service");

/*INSERT DYNAMIC DATA*/
const insert = async (req, res) => {
  try {
    const { tableName } = req.params

    if (!tableName) {
      return res.status(400).json({ success: false, message: "tableName is required" })
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Request body cannot be empty" })
    }

    const result = await insertDynamicData(tableName, req.body)

    res.status(201).json({ success: true, data: result })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { insert }