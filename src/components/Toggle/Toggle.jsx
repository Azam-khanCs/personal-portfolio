import React, { useContext } from "react";
import Moon from "@iconscout/react-unicons/icons/uil-moon";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import { themeContext } from "../../Context";

const Toggle = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const handleClick = () => {
    theme.dispatch({ type: "toggle" });
  };
  return (
    <button className="relative flex h-9 w-16 cursor-pointer items-center justify-between rounded-full border border-[var(--border)] bg-[var(--surface-strong)] p-1 text-[var(--accent)]" onClick={handleClick} aria-label="Toggle dark mode" aria-pressed={darkMode} type="button">
      <Moon className="relative z-[1] h-4 w-4" />
      <Sun className="relative z-[1] h-4 w-4" />
      <div className="absolute top-[3px] h-7 w-7 rounded-full bg-[linear-gradient(135deg,var(--accent),#ffd166)] transition-all duration-200" style={darkMode ? { left: "3px" } : { right: "3px" }}></div>
    </button>
  );
};

export default Toggle;
