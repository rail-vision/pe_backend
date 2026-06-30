const express = require("express");
const router  = express.Router();

const { generateChart, getOptions } = require("../controllers/infographic.controller");
const { protect }                   = require("../middleware/auth.middleware");

/*
|--------------------------------------------------------------------------
| INFOGRAPHIC ROUTES — all protected
|--------------------------------------------------------------------------
*/
router.get("/options",   protect, getOptions);    // GET  /api/infographics/options
router.post("/generate", protect, generateChart); // POST /api/infographics/generate

module.exports = router;