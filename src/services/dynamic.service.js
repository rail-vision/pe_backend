const prisma = require("../config/prisma"); // ✅ fixed import path

/*CREATE DYNAMIC TABLE*/
const createTable = async ({ tableName, fields }) => {

  // Validate inputs
  if (!tableName || typeof tableName !== "string") {
    throw new Error("tableName is required and must be a string")
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error("fields must be a non-empty array")
  }

  //Whitelist allowed SQL types to prevent injection
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
    CREATE TABLE IF NOT EXISTS "${tableName}" (
      id SERIAL PRIMARY KEY,
      ${columns},
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await prisma.$executeRawUnsafe(query)

  return { message: `Table "${tableName}" created successfully` }
}

/*INSERT DYNAMIC DATA*/
const insertDynamicData = async (tableName, data) => {

  if (!tableName || typeof tableName !== "string") {
    throw new Error("tableName is required")
  }

  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    throw new Error("data must be a non-empty object")
  }

  const keys   = Object.keys(data)
  const values = Object.values(data)

  // Parameterized placeholders → $1, $2, $3...
  const columns     = keys.map(k => `"${k}"`).join(", ")
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")

  const query = `
    INSERT INTO "${tableName}" (${columns})
    VALUES (${placeholders})
    RETURNING *
  `

  // prisma.$queryRawUnsafe with params — safe parameterized insert
  const result = await prisma.$queryRawUnsafe(query, ...values)

  return {
    message: "Data inserted successfully",
    data:    result[0] ?? null
  }
}

module.exports = { createTable, insertDynamicData }