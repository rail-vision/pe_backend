const prisma = require("../config/prisma"); 

/*CREATE TABLE FROM TEMPLATE*/
const createTable = async ({ templateName, fields }) => {

  if (!templateName || typeof templateName !== "string") {
    throw new Error("templateName is required")
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error("fields must be a non-empty array")
  }

  const ALLOWED_TYPES = [
    "TEXT", "VARCHAR(255)", "VARCHAR(100)", "VARCHAR(50)",
    "INTEGER", "INT", "BIGINT", "FLOAT", "DECIMAL", "NUMERIC",
    "BOOLEAN", "DATE", "TIMESTAMP", "JSONB", "UUID"
  ]

  const columns = fields.map(field => {
    if (!field.name || typeof field.name !== "string") {
      throw new Error(`Invalid field name: ${field.name}`)
    }
    const type = field.type?.toUpperCase() || "TEXT"
    if (!ALLOWED_TYPES.includes(type)) {
      throw new Error(`Invalid field type: ${field.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`)
    }
    return `"${field.name}" ${type}`
  }).join(",\n      ")

  const query = `
    CREATE TABLE IF NOT EXISTS "${templateName}" (
      id SERIAL PRIMARY KEY,
      ${columns},
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await prisma.$executeRawUnsafe(query)

  return { message: `Table "${templateName}" created successfully` }
}

module.exports = { createTable }