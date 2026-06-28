const express = require("express");

const {
  generateDistribution
} = require(
  "../controllers/distribution.controller"
);

const router = express.Router();

router.post(
  "/generate",
  generateDistribution
);

module.exports = router;