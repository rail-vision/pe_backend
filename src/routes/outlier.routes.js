const express = require("express");
const router  = express.Router();

const {
  runAssetOutlier,
  runPeopleOutlier,
  runUploadOutlier
} = require("../controllers/outlier.controller");

const { protect } = require("../middleware/auth.middleware"); // ✅ JWT protection

/*OUTLIER ROUTES — all protected|*/
router.post("/assets/run",  protect, runAssetOutlier);   // POST /api/outlier/assets/run
router.post("/people/run",  protect, runPeopleOutlier);  // POST /api/outlier/people/run
router.post("/upload/run",  protect, runUploadOutlier);  // POST /api/outlier/upload/run

module.exports = router;