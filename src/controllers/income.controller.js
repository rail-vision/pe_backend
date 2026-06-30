const incomeService =
require("../services/income.service");

const {
  incomeSchema
} = require("../validations/income.validation");

const getIncome = async (req, res) => {

  try {

    const income =
      await incomeService.getAllIncome();

    return res.status(200).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getIncomeById = async (req, res) => {

  try {

    const income =
      await incomeService.getIncomeById(
        req.params.id
      );

    if (!income) {

      return res.status(404).json({
        success: false,
        message: "Income not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const createIncome = async (req, res) => {

  try {

    incomeSchema.parse(req.body);

    const income =
      await incomeService.createIncome(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const updateIncome = async (req, res) => {

  try {

    incomeSchema.partial().parse(
      req.body
    );

    const income =
      await incomeService.updateIncome(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const deleteIncome = async (req, res) => {

  try {

    await incomeService.deleteIncome(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Income deleted successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {

  getIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome

};