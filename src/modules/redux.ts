import { combineReducers, Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export interface Data {}

export interface Points {}

export interface SelectedPoints {}

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
const updateSelectedPoints = create<SelectedPoints>("UPDATE_SELECTED_POINTS");
const updatePercentile = create<number>("UPDATE_PERCENTILE");

export const actions = {
  updateData,
  updatePoints,
  updateAnchors,
  updateSelectedPoints,
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
  .case(actions.updateSelectedPoints, (state, selectedPoints) => {
    return { ...state, selectedPoints };
  })
  .case(actions.updatePercentile, (state, pecentile) => {
    return { ...state, pecentile };
  })
  .build();

export default reducer;
