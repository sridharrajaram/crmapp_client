import React from "react";

import "./Spinner.css";

function Spinner() {
  return (
    <div id="overlay">
      <div className="spinner"></div>
      <br />
      Loading...
    </div>
  );
}

export default Spinner;
