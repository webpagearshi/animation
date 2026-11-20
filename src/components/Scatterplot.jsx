import * as d3 from "d3";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

const MARGIN = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

function Scatterplot({ width, height, data, slope, intercept }) {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // X scale
  const xScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([8, boundsWidth - 8]);

  // Y scale
  const yScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([boundsHeight - 8, 8]);

  // Regression line endpoints
  const x1 = 0;
  const x2 = 10;

  const y1 = slope * x1 + intercept;
  const y2 = slope * x2 + intercept;

  // Scatterplot circles
  const allShapes = data.map((d, i) => (
    <circle
      key={i}
      r={8}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      fill="#f8e8fa"
      stroke="#a451a5"
      strokeWidth={1.5}
    />
  ));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {/* Clip line and points to the plotting area */}
        <defs>
          <clipPath id="plot-area-clip">
            <rect x={0} y={0} width={boundsWidth} height={boundsHeight} />
          </clipPath>
        </defs>

        {/* Y axis */}
        <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

        {/* X axis */}
        <AxisBottom xScale={xScale} pixelsPerTick={40} height={boundsHeight} />

        {/* Regression line and data points */}
        <g clipPath="url(#plot-area-clip)">
          {/* Linear regression line */}
          <line
            x1={xScale(x1)}
            y1={yScale(y1)}
            x2={xScale(x2)}
            y2={yScale(y2)}
            stroke="#181818"
            strokeWidth={1.0}
          />

          {/* Scatterplot circles */}
          {allShapes}
        </g>
      </g>
    </svg>
  );
}

export default Scatterplot;
