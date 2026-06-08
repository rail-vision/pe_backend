const prisma = require("../prisma/client");

const createTable = async ({ templateName, fields }) => {

  const columns = fields
    .map(field => `"${field.name}" ${field.type}`)
    .join(",");

  const query = `
    CREATE TABLE IF NOT EXISTS "${templateName}" (

      id SERIAL PRIMARY KEY,

      ${columns},

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
  `;

  await prisma.$executeRawUnsafe(query);

  return {
    message: `Table ${templateName} created successfully`
  };

};

module.exports = {
  createTable
};