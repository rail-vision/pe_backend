const {
  createTable
} = require("../services/dynamic.service");

const createDynamicTable = async (req, res) => {

  try {

    const result = await createTable(req.body);

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
  createDynamicTable
};