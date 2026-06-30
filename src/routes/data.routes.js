const express = require("express");

const {

  getDataAssets,
  getDataAssetById,
  createDataAsset,
  updateDataAsset,
  deleteDataAsset

} = require("../controllers/data.controller");

const router = express.Router();

router.get("/", getDataAssets);

router.get("/:id", getDataAssetById);

router.post("/", createDataAsset);

router.put("/:id", updateDataAsset);

router.delete("/:id", deleteDataAsset);

module.exports = router;