import React, { useContext } from "react";
import "./Works.css";
import Fiverr from "../../img/fiverr.png";
import Facebook from "../../img/Facebook.png";
import Alright from "../../img/download.jpeg";
import Jidat from "../../img/Layer.svg";
import THHunters from "../../img/theHeadHunters.svg";

import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
const Works = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  return (
    <div className="works" id="works">
      {/* left side */}
      <div className="w-left">
        <div className="awesome">
          {/* dark Mode */}
          <span style={{ color: darkMode ? "white" : "" }}>
            Works for All these
          </span>
          <span>Brands & Clients</span>
          <spane>
            I leverage my skills as a freelancer on platforms like Fiverr,
            Upwork, and Facebook to connect with clients from around the world.
            With these platforms, I have the opportunity to showcase my
            expertise, collaborate on exciting projects, and build a strong
            professional network. Through these channels, I strive to deliver
            high-quality work and establish long-term partnerships with clients
            across various industries.
          </spane>
          <span>
            <Link to="contact" smooth={true} spy={true}>
              <button className="button s-button">Hire Me</button>
            </Link>
          </span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>

        {/* right side */}
      </div>
      <div className="w-right">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 3.5, type: "spring" }}
          className="w-mainCircle"
        >
          <div className="w-secCircle1">
            <img src={Alright} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={THHunters} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Fiverr} alt="" />
          </div>{" "}
          <div className="w-secCircle">
            <img src={Jidat} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Facebook} alt="" />
          </div>
        </motion.div>
        {/* background Circles */}
        <div className="w-backCircle blueCircle"></div>
        <div className="w-backCircle yellowCircle"></div>
      </div>
    </div>
  );
};

export default Works;
