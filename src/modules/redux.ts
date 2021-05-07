import { combineReducers, Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  Anchors,
  Data,
  Points,
  SelectedPoint,
  SelectedPoints,
} from "../models";

export interface AppState {
  data: Data;
  points: Points;
  anchors: Anchors;
  selectedPoints: SelectedPoints;
  percentile: number;
  r: number;
}

const create = actionCreatorFactory();

const updateData = create<Data>("UPDATE_DATA");
const updatePoints = create<Points>("UPDATE_POINTS");
const updateAnchors = create<string[]>("UPDATE_ANCHORS");
const addSelectedPoints = create<SelectedPoint>("ADD_SELECTED_POINTS");
const resetSelectedPoints = create<SelectedPoints>("RESET_SELECTED_POINTS");
const updatePercentile = create<number>("UPDATE_PERCENTILE");
const updateR = create<number>("UPDATE_R");

export const actions = {
  updateData,
  updatePoints,
  updateAnchors,
  addSelectedPoints,
  resetSelectedPoints,
  updatePercentile,
  updateR,
};

export const initalState: AppState = {
  data: { data: [], key_phrase_sum: {} },
  points: [],
  anchors: [],
  selectedPoints: [],
  percentile: 1,
  r: 200,
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
    let newState = [];
    if (state.selectedPoints.includes(selectedPoint)) {
      newState = state.selectedPoints.filter((sp) => sp !== selectedPoint);
    } else {
      newState = [...state.selectedPoints, selectedPoint];
    }
    return { ...state, selectedPoints: newState };
  })
  .case(actions.resetSelectedPoints, (state) => {
    return { ...state, selectedPoints: [] };
  })
  .case(actions.updatePercentile, (state, percentile) => {
    return { ...state, percentile };
  })
  .case(actions.updateR, (state, r) => {
    return { ...state, r };
  })
  .build();

export default reducer;
