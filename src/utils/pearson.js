function pearson(x, y) {

  const n = x.length;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);

  const sumXY = x.reduce(
    (sum, xi, i) => sum + xi * y[i],
    0
  );

  const sumX2 = x.reduce(
    (sum, xi) => sum + xi * xi,
    0
  );

  const sumY2 = y.reduce(
    (sum, yi) => sum + yi * yi,
    0
  );

  const numerator =
    n * sumXY - sumX * sumY;

  const denominator =
    Math.sqrt(
      (n * sumX2 - sumX ** 2) *
      (n * sumY2 - sumY ** 2)
    );

  if (denominator === 0) return 0;

  return Number(
    (numerator / denominator).toFixed(4)
  );

}

module.exports = pearson;