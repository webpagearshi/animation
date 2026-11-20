import { useMemo } from "react";

const TICK_LENGTH = 10;

function AxisBottom({ xScale, pixelsPerTick, height }) {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];

    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale, pixelsPerTick]);

  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, ${height})`}>
          {/* Vertical grid line */}
          <line
            y1={TICK_LENGTH}
            y2={-height}
            stroke="#D2D7D3"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />

          {/* Tick label */}
          <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#D2D7D3",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
}

export default AxisBottom;
