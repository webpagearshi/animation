import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

const MARGIN = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

function Scatterplot({ width, height, data, slope, intercept, datasetName }) {
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

  // Scatterplot circles with unique dataset IDs
  const allShapes = data.map((d, i) => ({
    ...d,
    id: `${datasetName}-${i}`,
  }));

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

        {/* Regression line and animated points */}
        <g clipPath="url(#plot-area-clip)">
          {/* Linear regression line */}
          <line
            x1={xScale(x1)}
            y1={yScale(y1)}
            x2={xScale(x2)}
            y2={yScale(y2)}
            stroke="#181818"
            strokeWidth={1}
          />

          {/* Animated scatterplot circles */}
          <AnimatePresence mode="sync">
            {allShapes.map((d) => (
              <motion.circle
                key={d.id}
                r={8}
                fill="#f8e8fa"
                stroke="#a451a5"
                strokeWidth={1.5}
                // New circles enter from the left
                initial={{
                  cx: -20,
                  cy: yScale(d.y),
                  opacity: 0,
                }}
                // Move to their actual positions
                animate={{
                  cx: xScale(d.x),
                  cy: yScale(d.y),
                  opacity: 1,
                }}
                // Old circles exit to the right
                exit={{
                  cx: boundsWidth + 30,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}
          </AnimatePresence>
        </g>
      </g>
    </svg>
  );
}

export default Scatterplot;
