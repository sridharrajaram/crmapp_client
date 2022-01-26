import React from "react";

function TextError(props) {
  return <div className="text-danger ps-2">{props.children}</div>;
}

export default TextError;
