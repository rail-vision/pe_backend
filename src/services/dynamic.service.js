const prisma = require("../prisma/client");

const createTable = async ({ tableName }) => {

  const query = `
    CREATE TABLE IF NOT EXISTS "${tableName}" (

      id SERIAL PRIMARY KEY,

      name VARCHAR(255),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
  `;

  await prisma.$executeRawUnsafe(query);

  return {
    message: `Table ${tableName} created successfully`
  };

};

module.exports = {
  createTable
};