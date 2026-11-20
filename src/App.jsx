import { useState, useRef } from "react";
import "./App.css";
import { useDimensions } from "./hooks/useDimensions";
import Scatterplot from "./components/Scatterplot";

import { linear, curve, badRepartition, outlier } from "./components/data";

function App() {
  const [selectedDataset, setSelectedDataset] = useState(linear);

  const containerRef = useRef(null);

  const { width } = useDimensions(containerRef);

  return (
    <div className="page-container">
      <h1>Scatterplot Animation</h1>

      <div ref={containerRef} className="chart-container">
        {/* Buttons */}
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

        {/* Chart */}
        {width > 0 && (
          <Scatterplot width={width} height={500} data={selectedDataset} />
        )}
      </div>
    </div>
  );
}

export default App;
