const express = require("express");

const {
  createTemplate
} = require("../controllers/template.controller");

const router = express.Router();

router.post("/", createTemplate);

module.exports = router;