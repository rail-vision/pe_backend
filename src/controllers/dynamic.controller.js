const {
  insertDynamicData
} = require("../services/dynamic.service");

const insert = async (req, res) => {

  try {

    const { tableName } = req.params;

    const result = await insertDynamicData(
      tableName,
      req.body
    );

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

module.exports = {
  insert
};