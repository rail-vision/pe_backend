const express = require("express");

const {
  createTemplate,
  getTemplates
} = require("../controllers/template.controller");

const router = express.Router();

router.post("/", createTemplate);

router.get("/", getTemplates);

module.exports = router;