const express = require("express");

const {
  createDynamicTable
} = require("../controllers/dynamic.controller");

const router = express.Router();

router.post("/create-table", createDynamicTable);

module.exports = router;