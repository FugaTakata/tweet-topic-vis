export interface Datum {
  text: string;
  created_at: string;
  key_phrase: {
    [key: string]: number;
  };
}
export interface Data {
  data: Datum[];
  key_phrase_sum: {
    [key: string]: number;
  };
}

export interface Point {
  x: number;
  y: number;
}
export type Points = Point[];

export type SelectedPoint = number;
export type SelectedPoints = SelectedPoint[];

export type Anchor = string;
export type Anchors = Anchor[];

export interface AppState {
  data: Data;
  points: Points;
  anchors: Anchors;
  selectedPoints: SelectedPoints;
  percentile: number;
  r: number;
}
