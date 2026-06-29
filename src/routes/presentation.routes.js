const express = require("express");
const router  = express.Router();

const { generatePPT } = require("../controllers/presentation.controller");
const { protect }     = require("../middleware/auth.middleware");

/*PRESENTATION ROUTES*/
router.post("/ppt", protect, generatePPT); 

module.exports = router;