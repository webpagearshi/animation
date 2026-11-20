import { useState } from "react";
import Scatterplot from "./components/Scatterplot";
import "./App.css";

import { linear, curve, badRepartition, outlier } from "./components/data";

function App() {
  const [selectedDataset, setSelectedDataset] = useState(linear);

  return (
    <div>
      <h1>Scatterplot Animation</h1>

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

      <Scatterplot width={700} height={500} data={selectedDataset} />
    </div>
  );
}

export default App;
