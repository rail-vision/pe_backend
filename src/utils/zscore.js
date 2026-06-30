function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr) {
  const avg = mean(arr);

  const variance =
    arr.reduce(
      (sum, value) => sum + Math.pow(value - avg, 2),
      0
    ) / arr.length;

  return Math.sqrt(variance);
}

module.exports = {
  mean,
  stdDev
};