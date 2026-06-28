const correlationService =
require("./correlation.service");

const generateHeatmap =
async (body) => {

  const result =
    await correlationService.run(body);

  return {

    chartType: "heatmap",

    labels: result.labels,

    matrix: result.matrix

  };

};

module.exports = {
  generateHeatmap
};