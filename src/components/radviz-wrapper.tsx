/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { actions } from "../modules/redux";

const RadvizWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      // todo optimize resize
      const r =
        Math.min(
          wrapperRef.current.clientWidth,
          wrapperRef.current.clientHeight,
          550
        ) /
          2 -
        100;
      dispatch(actions.updateR(r));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div css={RadvizWrapperStyle} ref={wrapperRef}>
      {children}
    </div>
  );
};

const RadvizWrapperStyle = css`
  width: 100%;
  height: 100%;
`;

export default RadvizWrapper;
