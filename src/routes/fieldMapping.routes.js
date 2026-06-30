const express = require("express");

const {
  saveFieldMapping,
  getFieldMapping
} = require(
  "../controllers/fieldMapping.controller"
);

const router = express.Router();

router.post(
  "/save",
  saveFieldMapping
);

router.get(
  "/:module",
  getFieldMapping
);

module.exports = router;