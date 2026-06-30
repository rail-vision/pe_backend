const express = require("express");

const {

    runPrediction,

    getAlerts,

    getPredictionReport

} = require("../controllers/predict.controller");

const router = express.Router();

/* RUN PREDICTION */

router.post(
    "/run",
    runPrediction
);

/* GET ALERTS */

router.get(
    "/alerts",
    getAlerts
);

/* GET REPORT */

router.get(
    "/report/:id",
    getPredictionReport
);

module.exports = router;