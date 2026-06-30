<<<<<<< HEAD
const {
  insertDynamicData
} = require("../services/dynamic.service");

const insert = async (
  req,
  res
) => {

  try {

    const { tableName } =
      req.params;

    const result =
      await insertDynamicData(
        tableName,
        req.body
      );

    return res.status(201).json({

      success: true,

      data: result

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  insert
};
=======
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
>>>>>>> 073cb674c90ff3ebe1e65f446f1ea93023ef87f3
