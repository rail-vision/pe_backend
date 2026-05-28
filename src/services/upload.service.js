const prisma = require("../config/prisma");

const assetSchema = require("../validations/asset.validation");
const peopleSchema = require("../validations/people.validation");

const processUpload = async (module, rows) => {

  let schema;
  let model;

  switch (module) {

    case "assets":
      schema = assetSchema;
      model = prisma.asset;
      break;

    case "people":
      schema = peopleSchema;
      model = prisma.people;
      break;

    default:
      throw new Error("Invalid module");

  }

  const validRows = [];
  const errors = [];

  for (let i = 0; i < rows.length; i++) {

    // clone row
    const row = { ...rows[i] };

    // FIX DATE
    if (row.purchaseDate) {
      row.purchaseDate = new Date(row.purchaseDate);
    }

    const validation = schema.safeParse(row);

    if (!validation.success) {

      console.log(validation.error);

      const firstError = validation.error.issues[0];

      errors.push({
        row: i + 1,
        field: firstError.path[0],
        message: firstError.message
      });

      continue;

    }

    validRows.push(validation.data);

  }

if (validRows.length > 0) {

  await model.createMany({
    data: validRows,
    skipDuplicates: true
  });

}

  return {
    importedRows: validRows.length,
    failedRows: errors.length,
    skippedRows: 0,
    errors
  };

};

module.exports = {
  processUpload
};