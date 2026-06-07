const prisma = require("../config/prisma");

/* GET ALL */

const getAllExpenses = async () => {

  return await prisma.expense.findMany();

};

/* GET SINGLE */

const getExpenseById = async (id) => {

  return await prisma.expense.findUnique({

    where: {
      expense_id: id
    }

  });

};

/* CREATE */

const createExpense = async (data) => {

  if (data.expense_transaction_id) {

    const existingExpense =
      await prisma.expense.findUnique({

        where: {
          expense_transaction_id:
            data.expense_transaction_id
        }

      });

    if (existingExpense) {

      throw new Error(
        "Expense Transaction ID already exists"
      );

    }

  }

  return await prisma.expense.create({

    data: {

      ...data,

      expense_date:
        data.expense_date
          ? new Date(data.expense_date)
          : null,

      recurring_expense_start_date:
        data.recurring_expense_start_date
          ? new Date(
              data.recurring_expense_start_date
            )
          : null,

      supplier_invoice_date:
        data.supplier_invoice_date
          ? new Date(
              data.supplier_invoice_date
            )
          : null

    }

  });

};

/* UPDATE */

const updateExpense = async (
  id,
  data
) => {

  const existingExpense =
    await prisma.expense.findUnique({

      where: {
        expense_id: id
      }

    });

  if (!existingExpense) {

    throw new Error(
      `Expense ${id} not found`
    );

  }

  return await prisma.expense.update({

    where: {
      expense_id: id
    },

    data: {

      ...data,

      expense_date:
        data.expense_date
          ? new Date(data.expense_date)
          : undefined,

      recurring_expense_start_date:
        data.recurring_expense_start_date
          ? new Date(
              data.recurring_expense_start_date
            )
          : undefined,

      supplier_invoice_date:
        data.supplier_invoice_date
          ? new Date(
              data.supplier_invoice_date
            )
          : undefined

    }

  });

};

/* DELETE */

const deleteExpense = async (id) => {

  return await prisma.expense.delete({

    where: {
      expense_id: id
    }

  });

};

module.exports = {

  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense

};