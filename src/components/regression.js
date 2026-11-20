import * as d3 from "d3";

// Slope and intercept of the linear regression line
// y = slope * x + intercept
export const linearRegression = (data) => {
  const xMean = d3.mean(data, (d) => d.x);
  const yMean = d3.mean(data, (d) => d.y);

  const slope =
    d3.sum(data, (d) => (d.x - xMean) * (d.y - yMean)) /
    d3.sum(data, (d) => (d.x - xMean) ** 2);

  const intercept = yMean - slope * xMean;

  return { slope, intercept };
};

// Coefficient of determination R²
export const computeR2 = (data, slope, intercept) => {
  const yMean = d3.mean(data, (d) => d.y);

  const ssTotal = d3.sum(data, (d) => (d.y - yMean) ** 2);

  const ssResidual = d3.sum(
    data,
    (d) => (d.y - (slope * d.x + intercept)) ** 2,
  );

  return 1 - ssResidual / ssTotal;
};
// Pearson correlation coefficient
export const computeCorrelation = (data) => {
  const xMean = d3.mean(data, (d) => d.x);
  const yMean = d3.mean(data, (d) => d.y);

  const numerator = d3.sum(data, (d) => (d.x - xMean) * (d.y - yMean));

  const denominator = Math.sqrt(
    d3.sum(data, (d) => (d.x - xMean) ** 2) *
      d3.sum(data, (d) => (d.y - yMean) ** 2),
  );

  return numerator / denominator;
};
