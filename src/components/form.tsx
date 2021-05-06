/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { Form, Button, Slider, Radio, Space } from "antd";
import { actions } from "../modules/redux";
import { useLoading } from "../hooks";

interface Props {}

const OptimizerForm: React.FC<Props> = (props) => {
  return <Component {...{ ...props }} />;
};

interface IProps {}

interface FormValues {
  optimizeType: "single" | "local" | "global";
  percentile: number;
}

const Component: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoading();

  const handleSubmit = useCallback(
    (formValues: FormValues) => {
      setLoading(true);
      const { optimizeType, percentile } = formValues;
      dispatch(actions.updatePercentile(percentile));
      switch (optimizeType) {
        case "single":
          break;
        case "local":
          break;
        case "global":
          break;
      }
      setLoading(false);
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(actions.resetSelectedPoints([]));
  }, [dispatch]);

  return (
    <div css={FormWrapperStyle}>
      <Form
        form={form}
        css={FormStyle}
        initialValues={{
          ["optimizeType"]: "single",
          ["percentile"]: 1,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="optimizeType"
          labelCol={{ span: 24 }}
          label="optimize type"
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="single">Single</Radio>
              <Radio value="local">Local</Radio>
              <Radio value="global">Global</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="percentile" labelCol={{ span: 24 }} label="percentile">
          <Slider min={1} max={100} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Optimize
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" type="primary" danger onClick={handleReset}>
            Reset
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
