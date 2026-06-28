const prisma =
require("../prisma/client");

const generate =
async ({
  module,
  chartType,
  xAxis,
  yAxis
}) => {

  let data = [];

  /*
  ==========================
  PEOPLE
  ==========================
  */

  if (
    module === "people"
  ) {

    data =
      await prisma.people.findMany();

  }

  /*
  ==========================
  ASSET
  ==========================
  */

  else if (
    module === "asset"
  ) {

    data =
      await prisma.asset.findMany();

  }

  /*
  ==========================
  FINANCE INCOME
  ==========================
  */

  else if (
    module === "finance-income"
  ) {

    data =
      await prisma.income.findMany();

  }

  /*
  ==========================
  FINANCE EXPENSE
  ==========================
  */

  else if (
    module === "finance-expense"
  ) {

    data =
      await prisma.expense.findMany();

  }

  else {

    throw new Error(
      "Invalid module"
    );

  }

  const labels =
    data.map(
      row => row[xAxis]
    );

  const values =
    data.map(
      row =>
        Number(
          row[yAxis]
        )
    );

  /*
  ==========================
  BAR
  ==========================
  */

  if (
    chartType === "bar"
  ) {

    return {

      chartType,

      dataset: {

        labels,

        values

      }

    };

  }

  /*
  ==========================
  LINE
  ==========================
  */

  if (
    chartType === "line"
  ) {

    return {

      chartType,

      dataset: {

        labels,

        values

      }

    };

  }

  /*
  ==========================
  PIE
  ==========================
  */

  if (
    chartType === "pie"
  ) {

    return {

      chartType,

      dataset: {

        labels,

        values

      }

    };

  }

  /*
  ==========================
  SCATTER
  ==========================
  */

  if (
    chartType === "scatter"
  ) {

    const points =
      labels.map(
        (
          label,
          index
        ) => ({

          x: label,

          y: values[index]

        })
      );

    return {

      chartType,

      dataset: points

    };

  }

  throw new Error(
    "Unsupported chart type"
  );

};

module.exports = {

  generate

};