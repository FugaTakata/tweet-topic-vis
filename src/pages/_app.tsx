import React from "react";
import { Provider } from "react-redux";
import { store } from "../modules/store";
import "../styles/antd.less";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
