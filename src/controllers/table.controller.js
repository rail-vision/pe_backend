const {
  createTable
} = require("../services/dynamic.service");

<<<<<<< HEAD
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

=======
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
>>>>>>> 073cb674c90ff3ebe1e65f446f1ea93023ef87f3
    });

  }

};

module.exports = {
  createDynamicTable
};