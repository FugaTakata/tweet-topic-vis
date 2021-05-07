/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState } from "../modules/redux";
import { Points, SelectedPoints } from "../models";

interface Props {}

const Radviz: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  // todo use redux r instead
  const { r } = useSelector((state: AppState) => state);
  const contentWidth = 2 * r;
  const contentHeight = 2 * r;
  const margin = 100;
  const width = contentWidth + margin * 2;
  const height = contentHeight + margin * 2;
  const lineColor = "#444";
  const backgroundColor = "#001628";
  const textColor = "#fafafa";

  const { points, anchors, selectedPoints } = useSelector(
    (state: AppState) => state
  );

  // const color = useCallback(() => {
  //   d3.scaleOrdinal(d3.schemeCategory10);
  // }, []);

  // const color = d3.interpolate("brown", "steelblue");
  const color = d3.interpolateGnBu;

  const handleSelect = (index: number) => {
    dispatch(actions.addSelectedPoints(index));
  };

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
        backgroundColor,
        textColor,
        color,
        handleSelect,
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
  textColor: string;
  backgroundColor: string;
  handleSelect: (index: number) => void;
  color: (v: number) => string;
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
  textColor,
  backgroundColor,
  handleSelect,
  color,
}) => {
  let prevIndex = 0;
  return (
    // todo transition
    <svg
      viewBox={`0 0 ${width} ${height}`}
      // width={width}
      // height={height}
      css={AnimationStyle}
    >
      <rect width="100%" height="100%" fill={backgroundColor} />
      <g transform={`translate(${margin + r}, ${margin + r})`}>
        <circle r={r} fill="none" stroke={lineColor} />
        {anchors.map((anchor, i) => {
          return (
            <g
              key={anchor}
              transform={`rotate(${(360 / anchors.length) * i + 90})`}
            >
              <line x1="0" y1="0" x2="0" y2={-r} stroke={lineColor} />
              <text
                y={-r}
                textAnchor="start"
                dominantBaseline="middle"
                transform={`rotate(-90 ${0} ${-r})`}
                fill={textColor}
              >
                {anchor}
              </text>
            </g>
          );
        })}
        {points.map((point, i) => {
          const { x, y } = point;
          if (isNaN(x) || isNaN(y)) {
            return null;
          }
          return (
            <g
              key={i}
              transform={`translate(${x},${y})`}
              onClick={() => handleSelect(i)}
            >
              <circle
                r={r / 50}
                stroke={
                  selectedPoints.includes(i)
                    ? i === selectedPoints[selectedPoints.length - 1]
                      ? "lime"
                      : "orange"
                    : "none"
                }
                strokeWidth={2}
                fill={color(i / points.length)}
                // fill={
                //   color(item[colorKey])
                //   // i === currentSelected
                //   //   ? "red"
                //   //   : selected.includes(i)
                //   //   ? "orange"
                //   //   : color(item[colorKey])
                // }
                // fill={"orange"}
                opacity="0.8"
              />
            </g>
          );
        })}
        {/* draw lines */}
        {/* {points.map((point, i) => {
          const { x, y } = point;
          if (isNaN(x) || isNaN(y)) {
            return null;
          }
          const prevPoint = { x: points[prevIndex].x, y: points[prevIndex].y };
          prevIndex = i;
          return (
            <line
              stroke="pink"
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={x}
              y2={y}
            />
          );
        })} */}
      </g>
    </svg>
  );
};

const AnimationStyle = css`
  transition: all 1s;
`;

export default Radviz;
