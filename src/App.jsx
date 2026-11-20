import { useState, useRef } from "react";
import "./App.css";

import { useDimensions } from "./hooks/useDimensions";
import Scatterplot from "./components/Scatterplot";

import { linear, curve, badRepartition, outlier } from "./components/data";

import {
  linearRegression,
  computeR2,
  computeCorrelation,
} from "./components/regression";

function App() {
  const [selectedDataset, setSelectedDataset] = useState(linear);

  // Calculate regression parameters for the selected dataset
  const { slope, intercept } = linearRegression(selectedDataset);

  // Calculate R² and correlation
  const rSquared = computeR2(selectedDataset, slope, intercept);

  const correlation = computeCorrelation(selectedDataset);

  // Responsive chart dimensions
  const containerRef = useRef(null);
  const { width } = useDimensions(containerRef);

  return (
    <div className="page-container">
      <h1>Scatterplot Animation</h1>

      <div ref={containerRef} className="chart-container">
        {/* Dataset selection buttons */}
        <div className="button-container">
          <button
            className={selectedDataset === linear ? "active" : ""}
            onClick={() => setSelectedDataset(linear)}
          >
            Linear
          </button>

          <button
            className={selectedDataset === curve ? "active" : ""}
            onClick={() => setSelectedDataset(curve)}
          >
            Curve
          </button>

          <button
            className={selectedDataset === badRepartition ? "active" : ""}
            onClick={() => setSelectedDataset(badRepartition)}
          >
            Bad Repartition
          </button>

          <button
            className={selectedDataset === outlier ? "active" : ""}
            onClick={() => setSelectedDataset(outlier)}
          >
            Outlier
          </button>
        </div>

        {/* Regression statistics */}
        <div className="statistics">
          <span>Correlation: {correlation.toFixed(2)}</span>

          <span>R²: {rSquared.toFixed(2)}</span>
        </div>

        {/* Scatterplot */}
        {width > 0 && (
          <Scatterplot
            width={width}
            height={500}
            data={selectedDataset}
            slope={slope}
            intercept={intercept}
          />
        )}
      </div>
    </div>
  );
}

export default App;
