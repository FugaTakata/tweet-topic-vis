import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  if (process.env.NODE_ENV === "development") {
    // const composeEnhancers = composeWithDevTools();
    return createStore(
      reducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
  } else {
    return createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
  }
};

// const configureStore = () => {
//   return createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
// };

export const store = configureStore();
