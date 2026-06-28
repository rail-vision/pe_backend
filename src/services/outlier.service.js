const prisma = require("../prisma/client");

const {
  mean,
  stdDev
} = require("../utils/zscore");

const runAssetOutlier = async ({
  variable,
  sigma = 3
}) => {

  const rows = await prisma.asset.findMany({
    select: {
      id: true,
      assetName: true,
      [variable]: true
    }
  });

  const values = rows
    .map(r => Number(r[variable]))
    .filter(v => !isNaN(v));

  if (values.length < 2) {
    throw new Error(
      "Not enough data for outlier analysis"
    );
  }

  const avg = mean(values);
  const sd = stdDev(values);

  const outliers = rows
    .map(row => {

      const value = Number(row[variable]);

      const zScore =
        (value - avg) / sd;

      return {
        id: row.id,
        assetName: row.assetName,
        value,
        zScore
      };

    })
    .filter(
      row =>
        Math.abs(row.zScore) >= sigma
    );

  return {
    variable,
    sigma,
    mean: avg,
    stdDev: sd,
    totalRows: rows.length,
    outlierCount: outliers.length,
    outliers
  };
};
const runPeopleOutlier = async ({
  variable,
  sigma = 3
}) => {

  const rows = await prisma.people.findMany({
    select: {
      id: true,
      personName: true,
      [variable]: true
    }
  });

  const values = rows
    .map(r => Number(r[variable]))
    .filter(v => !isNaN(v));

  if (values.length < 2) {
    throw new Error(
      "Not enough data for outlier analysis"
    );
  }

  const avg = mean(values);
  const sd = stdDev(values);

  const outliers = rows
    .map(row => {

      const value =
        Number(row[variable]);

      const zScore =
        (value - avg) / sd;

      return {
        id: row.id,
        personName: row.personName,
        value,
        zScore
      };

    })
    .filter(
      row =>
        Math.abs(row.zScore) >= sigma
    );

  return {
    variable,
    sigma,
    mean: avg,
    stdDev: sd,
    totalRows: rows.length,
    outlierCount: outliers.length,
    outliers
  };
};
const runUploadOutlier = ({
  variable,
  sigma = 3,
  rows
}) => {

  const values = rows
    .map(r => Number(r[variable]))
    .filter(v => !isNaN(v));

  if (values.length < 2) {
    throw new Error(
      "Not enough data for outlier analysis"
    );
  }

  const avg = mean(values);
  const sd = stdDev(values);

  const outliers = rows
    .map((row, index) => {

      const value =
        Number(row[variable]);

      const zScore =
        (value - avg) / sd;

      return {
        rowNumber: index + 1,
        value,
        zScore
      };

    })
    .filter(
      row =>
        Math.abs(row.zScore) >= sigma
    );

  return {
    variable,
    sigma,
    mean: avg,
    stdDev: sd,
    totalRows: rows.length,
    outlierCount: outliers.length,
    outliers
  };

};
const runFinanceOutlier = async ({
  variable,
  sigma = 2
}) => {

  const incomeFields = [
    "income_amount",
    "percentage_tax_applied",
    "payment_terms_days",
    "tds_percentage"
  ];

  const expenseFields = [
    "expense_amount",
    "percentage_tax_applied",
    "payment_terms_days",
    "tds_percentage"
  ];

  let data = [];

  if (incomeFields.includes(variable)) {

    data = await prisma.income.findMany({
      select: {
        [variable]: true,
        income_id: true,
        income_source: true
      }
    });

  } else if (expenseFields.includes(variable)) {

    data = await prisma.expense.findMany({
      select: {
        [variable]: true,
        expense_id: true,
        expense_destination: true
      }
    });

  } else {

    throw new Error("Invalid finance variable");

  }

  const values = data
    .map(row => Number(row[variable]))
    .filter(v => !isNaN(v));

  if (values.length < 2) {
    throw new Error(
      "Not enough data for outlier analysis"
    );
  }

  const avg = mean(values);
  const sd = stdDev(values);

  const outliers = data
    .map(row => {

      const value =
        Number(row[variable]);

      const zScore =
        (value - avg) / sd;

      return {
        ...row,
        value,
        zScore
      };

    })
    .filter(
      row =>
        Math.abs(row.zScore) >= sigma
    );

  return {
    variable,
    sigma,
    mean: avg,
    stdDev: sd,
    totalRows: data.length,
    outlierCount: outliers.length,
    outliers
  };

};

module.exports = {
  runAssetOutlier,
  runPeopleOutlier,
  runUploadOutlier,
  runFinanceOutlier
};