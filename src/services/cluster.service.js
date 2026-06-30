const prisma = require("../config/prisma");

const MODULE_MAP = {
  income: prisma.income,
  expense: prisma.expense,
  supplier: prisma.supplier,
  inventory: prisma.inventory,
  activity: prisma.activity,
  department: prisma.department,
  data_asset: prisma.dataAsset,
  asset: prisma.asset,
  people: prisma.people
};

const runCluster = async ({
  module,
  variables
}) => {

  const model = MODULE_MAP[module];

  if (!model) {
    throw new Error(`Invalid module: ${module}`);
  }

  const records = await model.findMany({
    select: variables.reduce(
      (obj, field) => {
        obj[field] = true;
        return obj;
      },
      {}
    )
  });

  const dataset = records.map(record =>
    variables.map(field =>
      Number(record[field]) || 0
    )
  );

  // Temporary cluster assignment
  const clusters = dataset.map(
    (row, index) => ({
      record: index + 1,
      cluster: index % 3
    })
  );

  return {
    module,
    labels: variables,
    totalRecords: dataset.length,
    clusters
  };
};

module.exports = {
  runCluster
};