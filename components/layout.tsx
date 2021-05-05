/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import SideMenu from "./menu";
import { Layout as AntLayout } from "antd";

interface Props {}

const { Content } = AntLayout;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <AntLayout>
        <SideMenu />
        <Content>
          <div css={ContentStyle}>{children}</div>
        </Content>
      </AntLayout>
    </React.Fragment>
  );
};

const ContentStyle = css`
  background-color: "#fff";
`;

export default Layout;
