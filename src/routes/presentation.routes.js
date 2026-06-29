const express = require("express");
const router  = express.Router();

const { generatePPT } = require("../controllers/presentation.controller");
const { protect }     = require("../middleware/auth.middleware");

/*
|--------------------------------------------------------------------------
| PRESENTATION ROUTES — all protected
|--------------------------------------------------------------------------
*/
router.post("/ppt", protect, generatePPT); // POST /api/presentation/ppt

module.exports = router;