import * as d3 from "d3";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

const MARGIN = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

function Scatterplot({ width, height, data }) {
  const boundsWidth = width - MARGIN.left - MARGIN.right;

  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);

  // Circles
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={7}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        fill="black"
        fillOpacity={0.7}
      />
    );
  });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {/* Y axis */}
        <AxisLeft yScale={yScale} pixelsPerTick={40} />

        {/* X axis */}
        <AxisBottom xScale={xScale} pixelsPerTick={40} height={boundsHeight} />

        {/* Scatterplot points */}
        {allShapes}
      </g>
    </svg>
  );
}
