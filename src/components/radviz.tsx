import React, { useCallback } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState, Points, SelectedPoints } from "../modules/redux";

interface Props {}

const Radviz: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const r = 300;
  const contentWidth = 2 * r;
  const contentHeight = 2 * r;
  const margin = 50;
  const width = contentWidth + margin * 2;
  const height = contentHeight + margin * 2;
  const lineColor = "#444";

  const { points, anchors, selectedPoints } = useSelector(
    (state: AppState) => state
  );

  const color = useCallback(() => {
    d3.scaleOrdinal(d3.schemeCategory10);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      dispatch(actions.addSelectedPoints(index));
    },
    [points]
  );

  return (
    <Component
      {...{
        points,
        anchors,
        selectedPoints,
        r,
        margin,
        width,
        height,
        lineColor,
        color,
        ...props,
      }}
    />
  );
};

interface IProps {
  points: Points;
  anchors: string[];
  selectedPoints: SelectedPoints;
  r: number;
  margin: number;
  width: number;
  height: number;
  lineColor: string;
  color: () => void;
}

const Component: React.FC<IProps> = ({
  points,
  anchors,
  selectedPoints,
  r,
  margin,
  width,
  height,
  lineColor,
  color,
}) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin + r}, ${margin + r})`}>
        <circle r={r} fill="none" stroke={lineColor} />
        {anchors.map((anchor, i) => {
          return (
            <g
              key={anchor}
              transform={`rotate(${(360 / anchor.length) * i + 90})`}
            >
              <line x1="0" y1="0" x2="0" y2={-r} stroke={lineColor} />
              <text
                y={-r}
                textAnchor="start"
                // stroke={property === "WHO" ? "red" : "black"}
                // dominantBaseline="text-after-edge"
                dominantBaseline="middle"
                transform={`rotate(-90 ${0} ${-r})`}
              >
                {anchor}
              </text>
            </g>
          );
        })}
        {points.map((point, i) => {
          const { x, y } = point;
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <circle
                r={r / 100}
                stroke="none"
                // fill={
                //   color(item[colorKey])
                //   // i === currentSelected
                //   //   ? "red"
                //   //   : selected.includes(i)
                //   //   ? "orange"
                //   //   : color(item[colorKey])
                // }
                fill={"orange"}
                opacity="0.8"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Radviz;
