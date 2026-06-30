const prisma = require("../config/prisma");
const pearson = require("../utils/pearson");

const runFinanceCorrelation = async ({
  variables
}) => {

  const incomeData =
    await prisma.income.findMany({
      select: variables.reduce(
        (obj, field) => {
          obj[field] = true;
          return obj;
        },
        {}
      )
    });

  const matrix = [];

  for (let i = 0; i < variables.length; i++) {

    matrix[i] = [];

    for (let j = 0; j < variables.length; j++) {

      const x =
        incomeData.map(row =>
          Number(row[variables[i]])
        );

      const y =
        incomeData.map(row =>
          Number(row[variables[j]])
        );

      matrix[i][j] =
        pearson(x, y);

    }

  }

  return {
    labels: variables,
    matrix
  };

};

module.exports = {
  runFinanceCorrelation
};