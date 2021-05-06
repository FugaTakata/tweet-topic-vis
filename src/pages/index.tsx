import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState } from "../modules/redux";

import Layout from "../components/layout";
import { Button } from "antd";

interface Props {}

const Home: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("data/data.json");
      const data = await response.json();

      dispatch(actions.updateData(data));
    };
    loadData();
  }, [dispatch]);

  return (
    <React.Fragment>
      <Layout>hello world</Layout>
    </React.Fragment>
  );
};

export default Home;
