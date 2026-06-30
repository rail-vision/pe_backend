const prisma = require("../config/prisma"); // ✅ fixed import path

/*
|--------------------------------------------------------------------------
| ALLOWED MODULES + FIELDS
|--------------------------------------------------------------------------
*/
const ALLOWED_MODULES = ["asset", "people"]

const MODULE_CONFIG = {
  asset: {
    model:       () => prisma.asset,
    labelFields: ["assetName", "assetCode", "assetCategory", "assetManufacturer"],
    valueFields: [
      "purchaseValue", "currentValue", "depreciation",
      "assetLife", "assetLiquidityLevel", "annualAssetUsageLevel",
      "assetWarrantyPeriod", "assetAnnualMaintenanceCost",
      "expectedMeanTimeBetweenFailure"
    ]
  },
  people: {
    model:       () => prisma.people,
    labelFields: ["personName", "designation", "functionalUnit", "country"],
    valueFields: [
      "salary", "experienceYears", "age",
      "attendancePercent", "performanceScore",
      "trainingHours", "bonus"
    ]
  }
}

const ALLOWED_CHART_TYPES = ["bar", "line", "pie", "scatter", "heatmap"]

/*
|--------------------------------------------------------------------------
| VALIDATE INPUT
|--------------------------------------------------------------------------
*/
const validateInput = ({ module, chartType, xAxis, yAxis }) => {
  if (!module) {
    throw Object.assign(new Error("module is required"), { status: 400 })
  }
  if (!ALLOWED_MODULES.includes(module)) {
    throw Object.assign(
      new Error(`Invalid module: "${module}". Allowed: ${ALLOWED_MODULES.join(", ")}`),
      { status: 400 }
    )
  }
  if (!chartType) {
    throw Object.assign(new Error("chartType is required"), { status: 400 })
  }
  if (!ALLOWED_CHART_TYPES.includes(chartType)) {
    throw Object.assign(
      new Error(`Invalid chartType: "${chartType}". Allowed: ${ALLOWED_CHART_TYPES.join(", ")}`),
      { status: 400 }
    )
  }
  if (!xAxis) {
    throw Object.assign(new Error("xAxis is required"), { status: 400 })
  }
  if (!yAxis) {
    throw Object.assign(new Error("yAxis is required"), { status: 400 })
  }

  const config = MODULE_CONFIG[module]

  if (!config.labelFields.includes(xAxis)) {
    throw Object.assign(
      new Error(`Invalid xAxis: "${xAxis}" for module "${module}". Allowed: ${config.labelFields.join(", ")}`),
      { status: 400 }
    )
  }
  if (!config.valueFields.includes(yAxis)) {
    throw Object.assign(
      new Error(`Invalid yAxis: "${yAxis}" for module "${module}". Allowed: ${config.valueFields.join(", ")}`),
      { status: 400 }
    )
  }
}

/*
|--------------------------------------------------------------------------
| GENERATE CHART DATA
|--------------------------------------------------------------------------
*/
const generate = async ({ module, chartType, xAxis, yAxis, limit = 100 }) => {

  validateInput({ module, chartType, xAxis, yAxis })

  const config = MODULE_CONFIG[module]
  const model  = config.model()

  // Fetch only needed fields
  const data = await model.findMany({
    select: {
      [xAxis]: true,
      [yAxis]: true
    },
    take: Math.min(limit, 1000) // max 1000 rows
  })

  if (data.length === 0) {
    throw Object.assign(
      new Error(`No data found for module "${module}"`),
      { status: 404 }
    )
  }

  // Filter out rows with null/undefined values
  const clean = data.filter(
    row => row[xAxis] !== null && row[xAxis] !== undefined &&
           row[yAxis] !== null && row[yAxis] !== undefined &&
           !isNaN(Number(row[yAxis]))
  )

  if (clean.length === 0) {
    throw Object.assign(
      new Error(`No valid numeric data found for yAxis: "${yAxis}"`),
      { status: 400 }
    )
  }

  const labels = clean.map(row => String(row[xAxis]))
  const values = clean.map(row => Number(row[yAxis]))

  // Summary statistics
  const sum  = values.reduce((a, b) => a + b, 0)
  const avg  = sum / values.length
  const max  = Math.max(...values)
  const min  = Math.min(...values)

  const baseResponse = {
    module,
    chartType,
    xAxis,
    yAxis,
    totalRows: clean.length,
    stats: {
      sum:   Number(sum.toFixed(2)),
      avg:   Number(avg.toFixed(2)),
      max,
      min
    }
  }

  // Scatter returns points array
  if (chartType === "scatter") {
    return {
      ...baseResponse,
      dataset: clean.map(row => ({
        x: String(row[xAxis]),
        y: Number(row[yAxis])
      }))
    }
  }

  // Heatmap returns matrix-like structure
  if (chartType === "heatmap") {
    return {
      ...baseResponse,
      dataset: {
        labels,
        values,
        matrix: values.map((v, i) => ({ label: labels[i], value: v }))
      }
    }
  }

  // Bar, Line, Pie all return labels + values
  return {
    ...baseResponse,
    dataset: { labels, values }
  }
}

module.exports = { generate, ALLOWED_MODULES, ALLOWED_CHART_TYPES, MODULE_CONFIG }