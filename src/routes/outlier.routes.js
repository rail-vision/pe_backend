const express = require("express");

const {
  runAssetOutlier,
  runPeopleOutlier,
  runUploadOutlier,
  runFinanceOutlier
} = require(
  "../controllers/outlier.controller"
);

const router = express.Router();

router.post(
  "/assets/run",
  runAssetOutlier
);
router.post(
  "/people/run",
  runPeopleOutlier
);
router.post(
  "/upload/run",
  runUploadOutlier
);
router.post(
  "/finance/run",
  runFinanceOutlier
);

module.exports = router;