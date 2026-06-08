const prisma = require("../config/prisma"); 

const assetSchema = require("../validations/asset.validation");

/*GET ALL ASSETS*/
const getAllAssets = async (req, res) => {
  try {
    const assets = await prisma.asset.findMany()
    res.status(200).json({ success: true, data: assets })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

/*GET SINGLE ASSET*/
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

/*CREATE ASSET*/
const createAsset = async (req, res) => {
  try {

    //Use validated data 
    const validatedData = assetSchema.parse(req.body)

    // Auto-generate assetId
    const assetId = `AST-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Duplicate assetId check 
    const existingAsset = await prisma.asset.findUnique({
      where: { assetId }
    })
    if (existingAsset) {
      return res.status(400).json({ success: false, message: "Asset ID already exists" })
    }

    const asset = await prisma.asset.create({
      data: {
        ...validatedData,
        assetId,
        // purchaseDate already coerced to Date by Zod
      }
    })

    res.status(201).json({ success: true, data: asset })

  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

/*UPDATE ASSET*/
const updateAsset = async (req, res) => {
  try {
    const { id } = req.params

    // Check asset exists first
    const existing = await prisma.asset.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    // Use validated data 
    const validatedData = assetSchema.partial().parse(req.body)

    const updated = await prisma.asset.update({
      where: { id },
      data:  validatedData
    })

    res.status(200).json({ success: true, data: updated })

  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

/*DELETE ASSET*/
const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params

    // Check asset exists first
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

module.exports = {
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset
}