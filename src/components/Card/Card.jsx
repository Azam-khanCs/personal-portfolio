import React from "react";
import { btnGhost, glassCard } from "../../styles";

const Card = ({ emoji, heading, detail, color }) => {
  return (
    <div
      className={`${glassCard} grid min-h-64 justify-items-center gap-3 p-6 text-center`}
      style={{ borderColor: color }}
    >
      <img className="h-16 w-16 object-contain" src={emoji} alt="" />
      <span className="text-xl font-black text-[var(--heading)]">{heading}</span>
      <span className="text-sm font-bold leading-6 text-[var(--text-muted)]">{detail}</span>
      <button className={btnGhost}>LEARN MORE</button>
    </div>
  );
};

export default Card;
