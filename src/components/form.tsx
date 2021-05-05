/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import {
  Input,
  Form,
  Button,
  message,
  Slider,
  InputNumber,
  Row,
  Col,
} from "antd";

interface Props {}

const OptimizerForm: React.FC<Props> = (props) => {
  return <Component {...{ ...props }} />;
};

interface IProps {}

const Component: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <div css={FormWrapperStyle}>
      <Form form={form} css={FormStyle}>
        <Form.Item name="percentile" label="percentile">
          <Slider min={1} max={100} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">single optimize</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary">local optimize</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary">global optimize</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger>
            reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const FormWrapperStyle = css`
  display: flex;
  padding: 20px;
`;

const FormStyle = css`
  width: 420px;
`;

export default OptimizerForm;
