const dataService =
require("../services/data.service");

const dataSchema =
require("../validations/data.validation");

/* GET ALL */

const getDataAssets = async (req, res) => {

  try {

    const dataAssets =
      await dataService.getAllDataAssets();

    return res.status(200).json({

      success: true,
      data: dataAssets

    });

  } catch (error) {

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

/* GET SINGLE */

const getDataAssetById = async (
  req,
  res
) => {

  try {

    const dataAsset =
      await dataService.getDataAssetById(
        req.params.id
      );

    if (!dataAsset) {

      return res.status(404).json({

        success: false,
        message: "Data Asset not found"

      });

    }

    return res.status(200).json({

      success: true,
      data: dataAsset

    });

  } catch (error) {

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

/* CREATE */

const createDataAsset = async (
  req,
  res
) => {

  try {

    dataSchema.parse(req.body);

    const dataAsset =
      await dataService.createDataAsset(
        req.body
      );

    return res.status(201).json({

      success: true,
      data: dataAsset

    });

  } catch (error) {

    return res.status(400).json({

      success: false,
      message: error.message

    });

  }

};

/* UPDATE */

const updateDataAsset = async (
  req,
  res
) => {

  try {

    dataSchema
      .partial()
      .parse(req.body);

    const dataAsset =
      await dataService.updateDataAsset(
        req.params.id,
        req.body
      );

    return res.status(200).json({

      success: true,
      data: dataAsset

    });

  } catch (error) {

    return res.status(400).json({

      success: false,
      message: error.message

    });

  }

};

/* DELETE */

const deleteDataAsset = async (
  req,
  res
) => {

  try {

    await dataService.deleteDataAsset(
      req.params.id
    );

    return res.status(200).json({

      success: true,
      message:
        "Data Asset deleted successfully"

    });

  } catch (error) {

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

module.exports = {

  getDataAssets,
  getDataAssetById,
  createDataAsset,
  updateDataAsset,
  deleteDataAsset

};