const prisma = require("../config/prisma");

/* GET ALL */

const getAllIncome = async () => {

  return await prisma.income.findMany();

};

/* GET SINGLE */

const getIncomeById = async (id) => {

  return await prisma.income.findUnique({

    where: {
      income_id: id
    }

  });

};

/* CREATE */

const createIncome = async (data) => {

  if (data.income_transaction_id) {

    const existingTransaction =
      await prisma.income.findUnique({

        where: {
          income_transaction_id:
            data.income_transaction_id
        }

      });

    if (existingTransaction) {

      throw new Error(
        "Income Transaction ID already exists"
      );

    }

  }

  return await prisma.income.create({

    data: {
      ...data,

      income_date:
        data.income_date
          ? new Date(data.income_date)
          : null,

      recurring_income_start_date:
        data.recurring_income_start_date
          ? new Date(data.recurring_income_start_date)
          : null,

      invoice_date:
        data.invoice_date
          ? new Date(data.invoice_date)
          : null
    }

  });

};

/* UPDATE */

const updateIncome = async (
  id,
  data
) => {

  return await prisma.income.update({

    where: {
      income_id: id
    },

    data: {

      ...data,

      income_date:
        data.income_date
          ? new Date(data.income_date)
          : undefined,

      recurring_income_start_date:
        data.recurring_income_start_date
          ? new Date(data.recurring_income_start_date)
          : undefined,

      invoice_date:
        data.invoice_date
          ? new Date(data.invoice_date)
          : undefined

    }

  });

};

/* DELETE */

const deleteIncome = async (id) => {

  return await prisma.income.delete({

    where: {
      income_id: id
    }

  });

};

module.exports = {

  getAllIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome

};