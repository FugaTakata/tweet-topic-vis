import * as d3 from "d3";
import { Anchors, Data, SelectedPoint, SelectedPoints } from "../models";

export const calcCordinates = ({
  data,
  anchors,
  r,
}: {
  data: Data;
  anchors: Anchors;
  r: number;
}) => {
  const anchorCount = anchors.length;
  const scales = anchors.map((anchor) =>
    d3
      .scaleLinear()
      .domain(
        d3.extent(
          data.data.map((d) => d.key_phrase),
          (item) => item[anchor]
        )
      )
      .range([0, 1])
  );

  return data.data.map((d, i) => {
    let a: number = 0;
    let b: number = 0;
    let c: number = 0;
    const dt = (2 * Math.PI) / anchorCount;
    for (let j = 0; j < anchorCount; ++j) {
      const v = scales[j](d.key_phrase[anchors[j]]);
      // const v = d.key_phrase[anchors[i]];
      a += v * Math.cos(dt * j);
      b += v * Math.sin(dt * j);
      c += v;
    }
    a *= r / c;
    b *= r / c;
    const s = Math.sqrt(a * a + b * b);
    const t = Math.atan2(b, a);
    return { x: s * Math.cos(t), y: s * Math.sin(t) };
  });
};

export const singleOptimize = ({
  data,
  anchors,
  selectedPoint,
}: {
  data: Data;
  anchors: Anchors;
  selectedPoint: SelectedPoint;
}): Anchors => {
  console.log(data, anchors, selectedPoint);
  const a: Anchors = [];
  anchors
    .map((anchor) => ({
      name: anchor,
      value: data.data[selectedPoint].key_phrase[anchor],
    }))
    .sort((a, b) => b.value - a.value)
    .forEach((item, index) => {
      if (index % 2 === 0) {
        a.push(item.name);
      } else {
        a.unshift(item.name);
      }
    });
  return a;
};

export const globalOptimize = ({
  data,
  anchors,
  percentile,
  r,
}: {
  data: Data;
  anchors: Anchors;
  percentile: number;
  r: number;
}): Anchors => {
  const candidates = [];
  for (let n = 1; n <= percentile; ++n) {
    const target =
      Math.ceil((n / 100) * data.data.length) - 1 < 0
        ? 0
        : Math.ceil((n / 100) * data.data.length) - 1;
    const p = {};
    const a: Anchors = [];

    anchors.forEach((anchor) => {
      const s = data.data.sort(
        (a, b) => a.key_phrase[anchor] - b.key_phrase[anchor]
      )[target];
      if (s !== void 0) {
        p[anchor] = s.key_phrase[anchor];
      }
    });

    anchors
      .map((anchor) => ({ name: anchor, value: p[anchor] }))
      .sort((a, b) => b.value - a.value)
      .forEach((item, i) => {
        if (i % 2 === 0) {
          a.push(item.name);
        } else {
          a.unshift(item.name);
        }
      });

    const points = calcCordinates({ data, anchors: a, r });
    let distance = 0;
    points.forEach(({ x, y }) => {
      if (!isNaN(x) && !isNaN(y)) {
        distance += x ** 2 + y ** 2;
      }
    });

    candidates.push({
      anchors: a,
      distance,
    });
  }
  console.log(candidates);
  candidates.sort((a, b) => b.distance - a.distance);
  return candidates[0].anchors as Anchors;
};

export const localOptimize = ({
  data,
  anchors,
  percentile,
  r,
  selectedPoints,
}: {
  data: Data;
  anchors: Anchors;
  percentile: number;
  r: number;
  selectedPoints: SelectedPoints;
}) => {
  const candidates = [];
  const selectedData = {
    ...data,
    data: data.data.filter((_, index) => selectedPoints.includes(index)),
  };
  for (let n = 1; n <= percentile; ++n) {
    const target = Math.ceil((n / 100) * selectedData.data.length) - 1;
    const p = {};
    const a = [];

    anchors.forEach((anchor) => {
      p[anchor] = selectedData.data.sort(
        (a, b) => a.key_phrase[anchor] - b.key_phrase[anchor]
      )[target][anchor];
    });

    anchors
      .map((anchor) => ({ name: anchor, value: p[anchor] }))
      .sort((a, b) => b.value - a.value)
      .forEach((item, i) => {
        if (i % 2 === 0) {
          a.push(item.name);
        } else {
          a.unshift(item.name);
        }
      });

    const points = calcCordinates({ data: selectedData, anchors: a, r });
    let distance: number = 0;
    const centerOfGravity = { x: 0, y: 0 };
    points.forEach(({ x, y }) => {
      centerOfGravity.x += x;
      centerOfGravity.y += y;
    });
    centerOfGravity.x /= points.length;
    centerOfGravity.y /= points.length;

    points.forEach(({ x, y }) => {
      distance += (x - centerOfGravity.x) ** 2 + (y - centerOfGravity.y) ** 2;
    });

    candidates.push({
      anchors: a,
      distance,
    });
  }
  candidates.sort((a, b) => b.distance - a.distance);
  return candidates[0].anchors;
};
