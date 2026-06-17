const express = require("express");
const router  = express.Router();

const {
  createTemplate,
  getTemplates,
  getTemplate,
  deleteTemplate
} = require("../controllers/template.controller");

router.get("/",    getTemplates);
router.get("/:id", getTemplate);     
router.post("/",   createTemplate);
router.delete("/:id", deleteTemplate); 

module.exports = router;