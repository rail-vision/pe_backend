const express = require("express");

const {
  uploadModuleData
} = require("../controllers/upload.controller");

const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/:module",
  upload.single("file"),
  uploadModuleData
);

module.exports = router;