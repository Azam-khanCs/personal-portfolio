import React, { useContext } from "react";
import { themeContext } from "../../Context";
import "./Experience.css";
import NumberCounter from "number-counter";

const Experience = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="experience" id="experience">
      <div className="achievement">
        {/* darkMode */}
        <div
          className="circle"
          style={{ color: darkMode ? "var(--orange)" : "" }}
        >
          <NumberCounter
            className="increment"
            start={0}
            end={3}
            delay={1}
            postFix="+"
          />
        </div>
        <span style={{ color: darkMode ? "white" : "" }}>years </span>
        <span>Experience</span>
      </div>
      <div className="achievement">
        <div
          className="circle"
          style={{ color: darkMode ? "var(--orange)" : "" }}
        >
          <NumberCounter
            className="increment"
            start={0}
            end={20}
            delay={2}
            postFix="+"
          />
        </div>
        <span style={{ color: darkMode ? "white" : "" }}>completed </span>
        <span>Projects</span>
      </div>
      <div className="achievement">
        <div
          className="circle"
          style={{ color: darkMode ? "var(--orange)" : "" }}
        >
          <NumberCounter
            className="increment"
            start={0}
            end={4}
            delay={2}
            postFix="+"
          />
        </div>
        <span style={{ color: darkMode ? "white" : "" }}>companies </span>
        <span>Work</span>
      </div>
    </div>
  );
};

export default Experience;
