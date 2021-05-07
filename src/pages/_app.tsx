import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { calcCordinates } from "../lib";
import { AppState, Data } from "../models";
import { actions } from "../modules/redux";
import { store } from "../modules/store";
import "../styles/antd.less";

const AppInit: React.FC = () => {
  const dispatch = useDispatch();
  const { data, anchors, r } = useSelector((state: AppState) => state);
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("data/data.json");
      // const response = await fetch("data/data27.json");
      const data: Data = await response.json();

      const newAnchors = Object.keys(data.key_phrase_sum)
        .map((key) => {
          return { name: key, value: data.key_phrase_sum[key] };
        })
        .sort((a, b) => b.value - a.value)
        .map((item) => item.name)
        .slice(0, 20);

      const newData = data.data.map((d) => {
        newAnchors.map((anchor) => {
          if (!(anchor in d.key_phrase)) {
            d.key_phrase[anchor] = 0;
          }
        });
        return d;
      });

      dispatch(actions.updateData({ ...data, data: newData }));
      dispatch(actions.updateAnchors(newAnchors));
      // @ts-ignore
      dispatch(actions.resetSelectedPoints());
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.updatePoints(calcCordinates({ data, anchors, r })));
  }, [dispatch, data, anchors, r]);

  return null;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <AppInit />
    </Provider>
  );
}

export default MyApp;
