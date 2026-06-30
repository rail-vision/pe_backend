const express = require("express");
const { uploadModuleData } = require("../controllers/upload.controller");
const { multerUpload } = require("../middleware/upload.middleware"); // ← only this

const router = express.Router();

router.post("/:module", multerUpload, uploadModuleData);

module.exports = router;