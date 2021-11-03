import React from "react";
import "./style.scss";
// import { getWindowDimensions } from "components/Common/useWindowDimensions ";
// import { Form } from "react-bootstrap";
function BlackPanel(props) {
  const { position } = props;
  //   console.log(NewComponent);
  // const { top, left } = getWindowDimensions();
  const divStyle = {
    top: position.top,
    left: position.left
  };
  //   console.log(height);
  return (
    <>
      <div
        // role="dialog"
        // aria-modal="true"
        className="bg-black"
        // tabIndex="-1"
        // style="display: block;"
        style={divStyle}
      >
        <p></p>
      </div>
    </>
  );
}
export default BlackPanel;
