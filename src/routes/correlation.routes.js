const express = require("express");
const router = express.Router();

const {
  runCorrelation,
  runPeopleCorrelation,
  runUploadCorrelation
} = require("../controllers/correlation.controller");

router.post("/run", runCorrelation);

router.post(
  "/people/run",
  runPeopleCorrelation
);

router.post(
  "/upload/run",
  runUploadCorrelation
);

module.exports = router;