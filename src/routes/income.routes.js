const express = require("express");

const {

  getIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome

} = require("../controllers/income.controller");

const router = express.Router();

router.get("/", getIncome);

router.get("/:id", getIncomeById);

router.post("/", createIncome);

router.put("/:id", updateIncome);

router.delete("/:id", deleteIncome);

module.exports = router;