const prisma = require("../config/prisma"); 
const { mean, stdDev } = require("../utils/zscore");

/*ALLOWED FIELDS WHITELIST*/
const ASSET_NUMERIC_FIELDS = [
  "purchaseValue", "currentValue", "depreciation",
  "assetLife", "assetLiquidityLevel", "annualAssetUsageLevel",
  "assetWarrantyPeriod", "assetAnnualMaintenanceCost",
  "expectedMeanTimeBetweenFailure"
]

const PEOPLE_NUMERIC_FIELDS = [
  "driversLicense"
]

/*VALIDATE INPUTS*/
const validateOutlierInput = (variable, sigma, allowedFields, label) => {
  if (!variable || typeof variable !== "string") {
    throw Object.assign(
      new Error("variable is required and must be a string"),
      { status: 400 }
    )
  }
  if (!allowedFields.includes(variable)) {
    throw Object.assign(
      new Error(`Invalid ${label} variable: "${variable}". Allowed: ${allowedFields.join(", ")}`),
      { status: 400 }
    )
  }
  if (typeof sigma !== "number" || sigma <= 0 || sigma > 5) {
    throw Object.assign(
      new Error("sigma must be a number between 0 and 5 (e.g. 1, 2, or 3)"),
      { status: 400 }
    )
  }
}

/*CORE OUTLIER CALCULATOR*/
const detectOutliers = (rows, variable, sigma, labelField) => {
  const values = rows
    .map(r => Number(r[variable]))
    .filter(v => !isNaN(v))

  if (values.length < 2) {
    throw Object.assign(
      new Error("Not enough numeric data for outlier analysis. Need at least 2 records."),
      { status: 400 }
    )
  }

  const avg = mean(values)
  const sd  = stdDev(values)

  if (sd === 0) {
    return {
      variable,
      sigma,
      mean:         avg,
      stdDev:       sd,
      totalRows:    rows.length,
      outlierCount: 0,
      outliers:     [],
      note:         "All values are identical — no outliers possible"
    }
  }

  const allRows = rows.map((row, index) => {
    const value  = Number(row[variable])
    const zScore = !isNaN(value) ? Number(((value - avg) / sd).toFixed(4)) : null
    return {
      id:        row.id || index + 1,
      label:     row[labelField] || `Row ${index + 1}`,
      value,
      zScore,
      isOutlier: zScore !== null && Math.abs(zScore) >= sigma
    }
  })

  const outliers = allRows.filter(r => r.isOutlier)

  // Bell curve data points for frontend chart
  const min   = Math.min(...values)
  const max   = Math.max(...values)
  const range = max - min
  const step  = range / 50 || 1

  const bellCurve = []
  for (let x = min - range * 0.2; x <= max + range * 0.2; x += step) {
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) *
              Math.exp(-0.5 * Math.pow((x - avg) / sd, 2))
    bellCurve.push({ x: Number(x.toFixed(4)), y: Number(y.toFixed(8)) })
  }

  return {
    variable,
    sigma,
    mean:         Number(avg.toFixed(4)),
    stdDev:       Number(sd.toFixed(4)),
    min:          Number(Math.min(...values).toFixed(4)),
    max:          Number(Math.max(...values).toFixed(4)),
    totalRows:    rows.length,
    validValues:  values.length,
    outlierCount: outliers.length,
    outlierPct:   Number(((outliers.length / rows.length) * 100).toFixed(2)),
    outliers,
    allRows,
    bellCurve
  }
}

/*ASSET OUTLIER*/
const runAssetOutlier = async ({ variable, sigma = 3 }) => {
  validateOutlierInput(variable, sigma, ASSET_NUMERIC_FIELDS, "asset")

  const rows = await prisma.asset.findMany({
    select: {
      id:        true,
      assetName: true,
      [variable]:true
    }
  })

  return {
    ...detectOutliers(rows, variable, sigma, "assetName"),
    dataSource: "assets"
  }
}

/*PEOPLE OUTLIER*/
const runPeopleOutlier = async ({ variable, sigma = 3 }) => {
  validateOutlierInput(variable, sigma, PEOPLE_NUMERIC_FIELDS, "people")

  const rows = await prisma.people.findMany({
    select: {
      id:         true,
      personName: true,
      [variable]: true
    }
  })

  return {
    ...detectOutliers(rows, variable, sigma, "personName"),
    dataSource: "people"
  }
}

/*UPLOAD OUTLIER (custom rows from frontend)*/
const runUploadOutlier = ({ variable, sigma = 3, rows }) => {
  if (!variable || typeof variable !== "string") {
    throw Object.assign(new Error("variable is required"), { status: 400 })
  }
  if (!Array.isArray(rows) || rows.length < 2) {
    throw Object.assign(new Error("At least 2 rows required"), { status: 400 })
  }
  if (rows.length > 10000) {
    throw Object.assign(new Error("Maximum 10,000 rows allowed"), { status: 400 })
  }
  if (typeof sigma !== "number" || sigma <= 0 || sigma > 5) {
    throw Object.assign(new Error("sigma must be between 0 and 5"), { status: 400 })
  }

  return {
    ...detectOutliers(rows, variable, sigma, "label"),
    dataSource: "upload"
  }
}

module.exports = {
  runAssetOutlier,
  runPeopleOutlier,
  runUploadOutlier,
  ASSET_NUMERIC_FIELDS,
  PEOPLE_NUMERIC_FIELDS
}