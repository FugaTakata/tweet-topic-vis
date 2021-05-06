/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { Button, Drawer, Layout, Menu, Divider } from "antd";

import OptimizerForm from "./form";

interface Props {}

const SideMenu: React.FC<Props> = (props) => {
  return <Component {...{ ...props }} />;
};

interface IProps {}

const { Sider } = Layout;

const Component: React.FC<IProps> = (props) => {
  return (
    <Sider css={SiderStyle} width={"240px"}>
      <OptimizerForm />
    </Sider>
  );
};

const SiderStyle = css`
  min-height: 100vh;
  background-color: #fafafa;
`;

export default SideMenu;
