const expenseService =
require("../services/expense.service");

const expenseSchema =
require("../validations/expense.validation");

/* GET ALL */

const getExpenses = async (req, res) => {

  try {

    const expenses =
      await expenseService.getAllExpenses();

    return res.status(200).json({

      success: true,
      data: expenses

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

/* GET SINGLE */

const getExpenseById = async (
  req,
  res
) => {

  try {

    const expense =
      await expenseService.getExpenseById(
        req.params.id
      );

    if (!expense) {

      return res.status(404).json({

        success: false,
        message: "Expense not found"

      });

    }

    return res.status(200).json({

      success: true,
      data: expense

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

/* CREATE */

const createExpense = async (
  req,
  res
) => {

  try {

    expenseSchema.parse(req.body);

    const expense =
      await expenseService.createExpense(
        req.body
      );

    return res.status(201).json({

      success: true,
      data: expense

    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({

      success: false,
      message: error.message

    });

  }

};

/* UPDATE */

const updateExpense = async (
  req,
  res
) => {

  try {

    expenseSchema
      .partial()
      .parse(req.body);

    const expense =
      await expenseService.updateExpense(
        req.params.id,
        req.body
      );

    return res.status(200).json({

      success: true,
      data: expense

    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({

      success: false,
      message: error.message

    });

  }

};

/* DELETE */

const deleteExpense = async (
  req,
  res
) => {

  try {

    await expenseService.deleteExpense(
      req.params.id
    );

    return res.status(200).json({

      success: true,
      message:
        "Expense deleted successfully"

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

  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense

};