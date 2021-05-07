/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import { Form, Button, Slider, Radio, Space } from "antd";
import { actions } from "../modules/redux";
import { useLoading } from "../hooks";
import { globalOptimize, localOptimize, singleOptimize } from "../lib";
import { AppState } from "../models";

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
  const { data, anchors, r, selectedPoints } = useSelector(
    (state: AppState) => state
  );
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoading();

  const handleSubmit = (formValues: FormValues) => {
    setLoading(true);
    const { optimizeType, percentile } = formValues;
    // dispatch(actions.updatePercentile(percentile));
    let newAnchors;
    try {
      switch (optimizeType) {
        case "single":
          console.log(selectedPoints);
          newAnchors = singleOptimize({
            data,
            anchors,
            selectedPoint: selectedPoints[selectedPoints.length - 1],
          });
          dispatch(actions.updateAnchors(newAnchors));
          break;
        case "local":
          newAnchors = localOptimize({
            data,
            anchors,
            percentile,
            r,
            selectedPoints,
          });
          dispatch(actions.updateAnchors(newAnchors));
          break;
        case "global":
          newAnchors = globalOptimize({ data, anchors, percentile, r });
          dispatch(actions.updateAnchors(newAnchors));
          break;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    // @ts-ignore
    // todo action type
    dispatch(actions.resetSelectedPoints());
  }, [dispatch]);

  return (
    <div css={FormWrapperStyle}>
      <Form
        form={form}
        css={FormStyle}
        initialValues={{
          ["optimizeType"]: "global",
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
              <Radio value="global">Global</Radio>
              <Radio value="single" disabled={selectedPoints.length === 0}>
                Single
              </Radio>
              <Radio value="local" disabled={selectedPoints.length === 0}>
                Local
              </Radio>
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
