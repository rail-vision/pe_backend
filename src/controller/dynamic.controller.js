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