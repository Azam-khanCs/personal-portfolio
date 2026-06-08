import React from "react";
import "./FloatingDiv.css";

const FloatinDiv = ({ img, text1, text2 }) => {
  return (
    <div className="floatingDiv glass-card">
      <img src={img} alt="" />
      <span>
        {text1}
        <br />
        {text2}
      </span>
    </div>
  );
};

export default FloatinDiv;
