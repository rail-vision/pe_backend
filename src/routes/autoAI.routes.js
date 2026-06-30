const express = require("express");

const {
    runAutoAI
} = require("../controllers/autoAI.controller");

const router = express.Router();

router.post(
    "/run",
    runAutoAI
);

module.exports = router;