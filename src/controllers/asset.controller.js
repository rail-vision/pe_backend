const prisma = require("../prisma/client");

// GET ALL ASSETS
const getAllAssets = async (req, res) => {
  try {
    const assets = await prisma.asset.findMany();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE ASSET
const createAsset = async (req, res) => {
  try {
    const {
      purchaseDate,
      assetCode,
      ownerId,
      ...rest
    } = req.body;

    // Auto-generate assetId
    const generatedAssetId = `AST-${Date.now()}`; 

    const data = {
      ...rest,
      assetId: generatedAssetId,
      assetCode,
      ownerId,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
    };

    const asset = await prisma.asset.create({ data });

    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE ASSET
const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.asset.update({
      where: { id },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ASSET
const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.asset.delete({
      where: { id }
    });

    res.json({ message: "Asset deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset
};
