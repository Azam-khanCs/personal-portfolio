import React from "react";
import { glassCard } from "../../styles";

const FloatinDiv = ({ img, text1, text2 }) => {
  return (
    <div className={`${glassCard} inline-flex items-center gap-3 px-4 py-3`}>
      <img className="h-12 w-12 object-contain" src={img} alt="" />
      <span className="text-sm font-black leading-5 text-[var(--heading)]">
        {text1}
        <br />
        {text2}
      </span>
    </div>
  );
};

export default FloatinDiv;
