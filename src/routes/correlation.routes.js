const express = require("express");
const router  = express.Router();

const {
  runCorrelation,
  runPeopleCorrelation,
  runUploadCorrelation
} = require("../controllers/correlation.controller");

const { protect } = require("../middleware/auth.middleware"); 

/*CORRELATION ROUTES*/
router.post("/run",         protect, runCorrelation);        
router.post("/people/run",  protect, runPeopleCorrelation);  
router.post("/upload/run",  protect, runUploadCorrelation);  

module.exports = router;