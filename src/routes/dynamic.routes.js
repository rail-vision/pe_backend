const express = require("express");

const {
  createDynamicTable
} = require("../controller/table.controller");

const {
  insert
} = require("../controller/dynamic.controller");

const router = express.Router();

router.post("/create", createDynamicTable);

router.post("/:tableName", insert);

module.exports = router;