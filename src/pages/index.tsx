/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Layout from "../components/layout";
import Radviz from "../components/radviz";
import { Card, Layout as AntLayout } from "antd";
import RadvizWrapper from "../components/radviz-wrapper";

interface Props {}

const { Sider } = AntLayout;

const Home: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <AntLayout>
        <Layout>
          {/* <div css={RadvizWrapperStyle}> */}
          <RadvizWrapper>
            <Radviz />
          </RadvizWrapper>
          {/* </div> */}
        </Layout>
        {/* <Sider></Sider> */}
      </AntLayout>
    </React.Fragment>
  );
};

export default Home;
