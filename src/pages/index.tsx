import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState } from "../modules/redux";

import Layout from "../components/layout";
import { Button } from "antd";

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Layout>hello world</Layout>
    </React.Fragment>
  );
};

export default Home;
