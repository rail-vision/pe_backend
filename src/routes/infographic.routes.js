const express = require("express");

const {
  generateChart
} = require(
  "../controllers/infographic.controller"
);

const router = express.Router();

router.post(
  "/generate",
  generateChart
);

module.exports = router;