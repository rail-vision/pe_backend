const prisma = require("../config/prisma");

/* CREATE TABLE */

const createTable = async ({
  tableName,
  fields
}) => {

  const columns = fields
    .map(field =>
      `"${field.name}" ${field.type}`
    )
    .join(",");

  const query = `
    CREATE TABLE IF NOT EXISTS "${tableName}" (

      id SERIAL PRIMARY KEY,

      ${columns},

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
  `;

  await prisma.$executeRawUnsafe(query);

  return {
    message: `${tableName} created successfully`
  };

};

/* INSERT DATA */

const insertDynamicData = async (
  tableName,
  data
) => {

  const columns = Object.keys(data)
    .map(key => `"${key}"`)
    .join(",");

  const values = Object.values(data)
    .map(value => `'${value}'`)
    .join(",");

  const query = `
    INSERT INTO "${tableName}"
    (${columns})
    VALUES (${values})
  `;

  await prisma.$executeRawUnsafe(query);

  return {
    message: "Data inserted successfully"
  };

};

module.exports = {

  createTable,
  insertDynamicData

};