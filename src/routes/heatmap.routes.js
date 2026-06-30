const express =
require("express");

const {
  generateHeatmap
} =
require(
 "../controllers/heatmap.controller"
);

const router =
express.Router();

router.post(
 "/generate",
 generateHeatmap
);

module.exports =
router;