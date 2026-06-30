const predictNextValue = (values) => {

    if (!values || values.length === 0) {
        return null;
    }

    const average =
        values.reduce((sum, value) => sum + value, 0) /
        values.length;

    const prediction =
        average * 1.05;

    return {

        historicalAverage: Number(
            average.toFixed(2)
        ),

        predictedValue: Number(
            prediction.toFixed(2)
        ),

        confidence: 0.85,

        trend:
            prediction >= average
                ? "Increasing"
                : "Decreasing"

    };

};

module.exports = predictNextValue;