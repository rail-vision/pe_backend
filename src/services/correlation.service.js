const prisma = require("../prisma/client");
const pearson = require("../utils/pearson");

const calculateCorrelation = (data, variables) => {
  const matrix = [];

  for (let i = 0; i < variables.length; i++) {
    matrix[i] = [];

    for (let j = 0; j < variables.length; j++) {

      const x = data.map(
        row => Number(row[variables[i]])
      );

      const y = data.map(
        row => Number(row[variables[j]])
      );

      matrix[i][j] = pearson(x, y);
    }
  }

  return {
    labels: variables,
    matrix
  };
};

const run = async ({ variables }) => {

  const data = await prisma.asset.findMany({
    select: variables.reduce((obj, field) => {
      obj[field] = true;
      return obj;
    }, {})
  });

  return calculateCorrelation(data, variables);
};

const runPeople = async ({ variables }) => {

  const data = await prisma.people.findMany({
    select: variables.reduce((obj, field) => {
      obj[field] = true;
      return obj;
    }, {})
  });

  return calculateCorrelation(data, variables);
};
const runUpload = async ({
  variables,
  rows
}) => {

  const matrix = [];

  for (let i = 0; i < variables.length; i++) {

    matrix[i] = [];

    for (let j = 0; j < variables.length; j++) {

      const x = rows.map(
        row => Number(row[variables[i]])
      );

      const y = rows.map(
        row => Number(row[variables[j]])
      );

      matrix[i][j] = pearson(x, y);

    }

  }

  return {
    labels: variables,
    matrix
  };

};

module.exports = {
  run,
  runPeople,
  runUpload
};