import React, { useContext } from "react";
import "./Toggle.css";
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
    <button className="theme-toggle" onClick={handleClick} aria-label="Toggle dark mode" aria-pressed={darkMode} type="button">
      <Moon />
      <Sun />
      <div className="theme-toggle-thumb" style={darkMode ? { left: "3px" } : { right: "3px" }}></div>
    </button>
  );
};

export default Toggle;
