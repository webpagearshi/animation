import { useState } from "react";
import Scatterplot from "./components/Scatterplot";

import { linear, curve, badRepartition, outlier } from "./components/data";

function App() {
  const [selectedDataset, setSelectedDataset] = useState(linear);

  return (
    <div>
      <h1>Scatterplot Animation</h1>

      <div>
        <button onClick={() => setSelectedDataset(linear)}>Linear</button>

        <button onClick={() => setSelectedDataset(curve)}>Curve</button>

        <button onClick={() => setSelectedDataset(badRepartition)}>
          Bad Repartition
        </button>

        <button onClick={() => setSelectedDataset(outlier)}>Outlier</button>
      </div>

      <Scatterplot width={700} height={500} data={selectedDataset} />
    </div>
  );
}

export default App;
