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
        <Content>{children}</Content>
      </AntLayout>
    </React.Fragment>
  );
};

export default Layout;
