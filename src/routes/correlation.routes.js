const express = require("express");
const router  = express.Router();

const {
  runCorrelation,
  runPeopleCorrelation,
  runUploadCorrelation
} = require("../controllers/correlation.controller");

const { protect } = require("../middleware/auth.middleware"); // ✅ JWT protection

/*
|--------------------------------------------------------------------------
| CORRELATION ROUTES — all protected
|--------------------------------------------------------------------------
*/
router.post("/run",         protect, runCorrelation);        // POST /api/correlation/run
router.post("/people/run",  protect, runPeopleCorrelation);  // POST /api/correlation/people/run
router.post("/upload/run",  protect, runUploadCorrelation);  // POST /api/correlation/upload/run

module.exports = router;