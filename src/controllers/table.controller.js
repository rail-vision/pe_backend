const {
  createTable
} = require("../services/dynamic.service");

const createDynamicTable =
async (req, res) => {

  try {

    const result =
      await createTable(req.body);

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
  createDynamicTable
};