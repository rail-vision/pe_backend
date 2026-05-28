const prisma = require("../prisma/client");

const assetSchema = require("../validations/asset.validation");

/*GET ALL ASSETS */


const getAllAssets = async (req, res) => {

  try {

    const assets = await prisma.asset.findMany();

    res.status(200).json({
      success: true,
      data: assets
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

/*CREATE ASSET*/

const createAsset = async (req, res) => {

  try {

    /*Validate Request Body*/

    assetSchema.parse(req.body);

    const {
      purchaseDate,
      assetCode,
      ownerId,
      ...rest
    } = req.body;

<<<<<<< HEAD
    /* Auto Generate Asset ID */
=======
    // Auto-generate assetId
    const generatedAssetId = `AST-${Date.now()}`; 
>>>>>>> 4458a3ff67d4738888af330e031114ac785f5305

    const generatedAssetId = `AST-${Date.now()}`;

    /*Duplicate Asset ID Check*/

    const existingAsset = await prisma.asset.findUnique({
      where: {
        assetId: generatedAssetId
      }
    });

    if (existingAsset) {

      return res.status(400).json({
        success: false,
        message: "Asset ID already exists"
      });

    }

    /*Prepare Data*/

    const data = {

      ...rest,

      assetId: generatedAssetId,

      assetCode,

      ownerId,

      purchaseDate: purchaseDate
        ? new Date(purchaseDate)
        : null

    };

    /*Create Asset*/

    const asset = await prisma.asset.create({
      data
    });

    res.status(201).json({
      success: true,
      data: asset
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

/*UPDATE ASSET*/

const updateAsset = async (req, res) => {

  try {

    const { id } = req.params;

    /*Validate Update Body*/

    assetSchema.partial().parse(req.body);

    const updated = await prisma.asset.update({

      where: {
        id
      },

      data: req.body

    });

    res.status(200).json({
      success: true,
      data: updated
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

/*DELETE ASSET*/

const deleteAsset = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.asset.delete({

      where: {
        id
      }

    });

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

module.exports = {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset
};
