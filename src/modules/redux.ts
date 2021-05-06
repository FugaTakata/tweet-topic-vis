import { combineReducers, Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export interface Data {}

export interface Point {
  x: number;
  y: number;
  v: number;
}
export type Points = Point[];

export type SelectedPoint = number;
export type SelectedPoints = SelectedPoint[];

export interface AppState {
  data: Data;
  points: Points;
  anchors: string[];
  selectedPoints: SelectedPoints;
  percentile: number;
}

const create = actionCreatorFactory();

const updateData = create<Data>("UPDATE_DATA");
const updatePoints = create<Points>("UPDATE_POINTS");
const updateAnchors = create<string[]>("UPDATE_ANCHORS");
const addSelectedPoints = create<SelectedPoint>("ADD_SELECTED_POINTS");
const resetSelectedPoints = create<SelectedPoints>("RESET_SELECTED_POINTS");
const updatePercentile = create<number>("UPDATE_PERCENTILE");

export const actions = {
  updateData,
  updatePoints,
  updateAnchors,
  addSelectedPoints,
  resetSelectedPoints,
  updatePercentile,
};

export const initalState: AppState = {
  data: [],
  points: [],
  anchors: [],
  selectedPoints: [],
  percentile: 1,
};

const reducer = reducerWithInitialState(initalState)
  .case(actions.updateData, (state, data) => {
    return { ...state, data };
  })
  .case(actions.updatePoints, (state, points) => {
    return { ...state, points };
  })
  .case(actions.updateAnchors, (state, anchors) => {
    return { ...state, anchors };
  })
  .case(actions.addSelectedPoints, (state, selectedPoint) => {
    const newState = [...state.selectedPoints, selectedPoint];
    return { ...state, selectedPoints: newState };
  })
  .case(actions.resetSelectedPoints, (state, selectedPoints) => {
    return { ...state, selectedPoints };
  })
  .case(actions.updatePercentile, (state, percentile) => {
    return { ...state, percentile };
  })
  .build();

export default reducer;
