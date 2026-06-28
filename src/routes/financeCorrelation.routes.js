const express = require("express");

const {
  runFinanceCorrelation
} = require(
  "../controllers/financeCorrelation.controller"
);

const router = express.Router();

router.post(
  "/run",
  runFinanceCorrelation
);

module.exports = router;