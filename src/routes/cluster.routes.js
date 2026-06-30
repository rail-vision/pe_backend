const express = require("express");

const {
  runCluster
} = require(
  "../controllers/cluster.controller"
);

const router = express.Router();

router.post(
  "/run",
  runCluster
);

module.exports = router;