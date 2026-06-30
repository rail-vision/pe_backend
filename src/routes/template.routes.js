const express = require("express");
<<<<<<< HEAD

const {
  createTemplate
} = require("../controllers/template.controller");

const router = express.Router();

router.post("/", createTemplate);
=======
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
>>>>>>> 073cb674c90ff3ebe1e65f446f1ea93023ef87f3

module.exports = router;