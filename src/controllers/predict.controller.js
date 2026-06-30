const predictService = require("../services/predict.service");

/* RUN PREDICTION */

const runPrediction = async (req, res) => {

    try {

        const result =
            await predictService.run(req.body);

        return res.status(200).json({

            success: true,

            data: result

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

};

/* GET ALERTS */

const getAlerts = async (req, res) => {

    try {

        const result =
            await predictService.getAlerts();

        return res.status(200).json({

            success: true,

            data: result

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

};

/* GET REPORT */

const getPredictionReport = async (req, res) => {

    try {

        const result =
            await predictService.getPredictionReport(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: result

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

};

module.exports = {

    runPrediction,

    getAlerts,

    getPredictionReport

};