const prisma  = require("../config/prisma"); // ✅ fixed import path
const pearson = require("../utils/pearson");

/*
|--------------------------------------------------------------------------
| CORE CORRELATION CALCULATOR
|--------------------------------------------------------------------------
*/
const calculateCorrelation = (data, variables) => {
  const matrix = []

  for (let i = 0; i < variables.length; i++) {
    matrix[i] = []
    for (let j = 0; j < variables.length; j++) {
      const x = data.map(row => Number(row[variables[i]])).filter(v => !isNaN(v))
      const y = data.map(row => Number(row[variables[j]])).filter(v => !isNaN(v))
      matrix[i][j] = x.length >= 2 ? pearson(x, y) : 0
    }
  }

  return { labels: variables, matrix }
}

/*
|--------------------------------------------------------------------------
| ALLOWED FIELDS WHITELIST
| Prevents arbitrary DB field injection
|--------------------------------------------------------------------------
*/
const ASSET_NUMERIC_FIELDS = [
  "purchaseValue", "currentValue", "depreciation",
  "assetLife", "assetLiquidityLevel", "annualAssetUsageLevel",
  "assetWarrantyPeriod", "assetAnnualMaintenanceCost",
  "expectedMeanTimeBetweenFailure"
]

const PEOPLE_NUMERIC_FIELDS = [
  "driversLicense"
]

const validateVariables = (variables, allowedFields, label) => {
  if (!Array.isArray(variables) || variables.length < 2) {
    throw Object.assign(
      new Error("At least 2 variables required for correlation"),
      { status: 400 }
    )
  }
  if (variables.length > 10) {
    throw Object.assign(
      new Error("Maximum 10 variables allowed"),
      { status: 400 }
    )
  }
  const invalid = variables.filter(v => !allowedFields.includes(v))
  if (invalid.length > 0) {
    throw Object.assign(
      new Error(`Invalid ${label} variables: ${invalid.join(", ")}. Allowed: ${allowedFields.join(", ")}`),
      { status: 400 }
    )
  }
}

/*
|--------------------------------------------------------------------------
| ASSET CORRELATION
|--------------------------------------------------------------------------
*/
const run = async ({ variables }) => {
  validateVariables(variables, ASSET_NUMERIC_FIELDS, "asset")

  const data = await prisma.asset.findMany({
    select: variables.reduce((obj, field) => {
      obj[field] = true
      return obj
    }, {})
  })

  if (data.length < 2) {
    throw Object.assign(
      new Error("Not enough asset data for correlation. Need at least 2 records."),
      { status: 400 }
    )
  }

  return {
    ...calculateCorrelation(data, variables),
    totalRows: data.length,
    dataSource: "assets"
  }
}

/*
|--------------------------------------------------------------------------
| PEOPLE CORRELATION
|--------------------------------------------------------------------------
*/
const runPeople = async ({ variables }) => {
  validateVariables(variables, PEOPLE_NUMERIC_FIELDS, "people")

  const data = await prisma.people.findMany({
    select: variables.reduce((obj, field) => {
      obj[field] = true
      return obj
    }, {})
  })

  if (data.length < 2) {
    throw Object.assign(
      new Error("Not enough people data for correlation. Need at least 2 records."),
      { status: 400 }
    )
  }

  return {
    ...calculateCorrelation(data, variables),
    totalRows: data.length,
    dataSource: "people"
  }
}

/*
|--------------------------------------------------------------------------
| UPLOAD CORRELATION (custom rows sent from frontend)
|--------------------------------------------------------------------------
*/
const runUpload = ({ variables, rows }) => {
  if (!Array.isArray(variables) || variables.length < 2) {
    throw Object.assign(
      new Error("At least 2 variables required"),
      { status: 400 }
    )
  }
  if (!Array.isArray(rows) || rows.length < 2) {
    throw Object.assign(
      new Error("At least 2 data rows required"),
      { status: 400 }
    )
  }
  if (rows.length > 10000) {
    throw Object.assign(
      new Error("Maximum 10,000 rows allowed per request"),
      { status: 400 }
    )
  }

  return {
    ...calculateCorrelation(rows, variables),
    totalRows: rows.length,
    dataSource: "upload"
  }
}

module.exports = { run, runPeople, runUpload, ASSET_NUMERIC_FIELDS, PEOPLE_NUMERIC_FIELDS }