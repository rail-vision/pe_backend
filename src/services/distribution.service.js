const prisma =
require("../prisma/client");

const generate =
async ({
  variable,
  sigma = 2
}) => {

  const rows =
    await prisma.people.findMany();

  const values =
    rows
      .map(
        r =>
          Number(
            r[variable]
          )
      )
      .filter(
        v =>
          !isNaN(v)
      );

  if (
    values.length < 2
  ) {

    throw new Error(
      "Not enough data"
    );

  }

  const mean =
    values.reduce(
      (a,b)=>a+b,
      0
    ) /
    values.length;

  const variance =
    values.reduce(
      (sum,v)=>
        sum +
        Math.pow(
          v-mean,
          2
        ),
      0
    ) /
    values.length;

  const stdDev =
    Math.sqrt(
      variance
    );

  const outliers =
    rows
      .map(row => {

        const value =
          Number(
            row[variable]
          );

        const zScore =
          (value-mean)
          /
          stdDev;

        return {

          personName:
            row.personName,

          value,

          zScore

        };

      })
      .filter(
        row =>
          Math.abs(
            row.zScore
          ) > sigma
      );

  return {

    chartType:
      "distribution",

    variable,

    mean,

    stdDev,

    sigma,

    outliers

  };

};

module.exports = {

  generate

};