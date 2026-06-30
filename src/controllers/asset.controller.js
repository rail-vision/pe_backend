const prisma      = require("../config/prisma");
const assetSchema = require("../validations/asset.validation");

const {
  parsePagination,
  buildSearchFilter,
  buildExactFilters,
  buildRangeFilter,
  buildSort,
  buildMeta
} = require("../utils/queryParser");


const SEARCHABLE_FIELDS = [
  "assetName", "assetCode", "assetDescription",
  "assetManufacturer", "assetCategory", "ownerId"
]

const FILTERABLE_FIELDS = [
  "assetCategory", "assetCurrency", "assetManufacturer",
  "assetManufacturingCountry", "assetMaintenanceContract", "ownerId"
]

const SORTABLE_FIELDS = [
  "assetName", "purchaseValue", "currentValue", "depreciation",
  "purchaseDate", "createdAt", "updatedAt"
]


const getAllAssets = async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query)

    // Build WHERE clause by combining search + exact filters + range filter
    const searchFilter = buildSearchFilter(req.query.search, SEARCHABLE_FIELDS)
    const exactFilters  = buildExactFilters(req.query, FILTERABLE_FIELDS)
    const valueRange     = buildRangeFilter(req.query, "purchaseValue", "minValue", "maxValue")
    const dateRange       = buildRangeFilter(req.query, "purchaseDate", "startDate", "endDate", true)

    const where = {
      ...exactFilters,
      ...(searchFilter ? searchFilter : {}),
      ...(valueRange   ? valueRange   : {}),
      ...(dateRange    ? dateRange    : {}),
    }

    const orderBy = buildSort(req.query, SORTABLE_FIELDS)

    const [assets, total] = await Promise.all([
      prisma.asset.findMany({ where, orderBy, skip, take: limit }),
      prisma.asset.count({ where })
    ])

    res.status(200).json({
      success: true,
      data:    assets,
      meta:    buildMeta(total, page, limit)
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}


const getAsset = async (req, res) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: req.params.id }
    })
    if (!asset) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }
    res.status(200).json({ success: true, data: asset })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}


const createAsset = async (req, res) => {
  try {
    const validatedData = assetSchema.parse(req.body)
    const assetId = `AST-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const existingAsset = await prisma.asset.findUnique({ where: { assetId } })
    if (existingAsset) {
      return res.status(400).json({ success: false, message: "Asset ID already exists" })
    }

    const asset = await prisma.asset.create({
      data: { ...validatedData, assetId }
    })

    res.status(201).json({ success: true, data: asset })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}


const updateAsset = async (req, res) => {
  try {
    const { id } = req.params

    const existing = await prisma.asset.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    const validatedData = assetSchema.partial().parse(req.body)
    const updated = await prisma.asset.update({ where: { id }, data: validatedData })

    res.status(200).json({ success: true, data: updated })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}


const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params

    const existing = await prisma.asset.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    await prisma.asset.delete({ where: { id } })
    res.status(200).json({ success: true, message: "Asset deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllAssets, getAsset, createAsset, updateAsset, deleteAsset }