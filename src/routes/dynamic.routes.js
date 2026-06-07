const express = require("express");

const {
  createDynamicTable
} = require("../controller/table.controller");

const {
  insert
} = require("../controller/dynamic.controller");

const router = express.Router();

router.post("/create", createDynamicTable);

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