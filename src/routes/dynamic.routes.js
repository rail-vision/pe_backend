const express = require("express");

const {
  insert
} = require("../controllers/dynamic.controller");

const {
  createDynamicTable
} = require("../controllers/table.controller");

const router = express.Router();

/*CREATE TABLE*/

router.post("/create", createDynamicTable);

/*INSERT DATA*/

router.post("/:tableName", insert);

module.exports = router;