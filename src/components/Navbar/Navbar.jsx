import React, { useState } from "react";
import "./Navbar.css";
import Toggle from "../Toggle/Toggle";
import { Link } from "react-scroll";
import { UilBars } from "@iconscout/react-unicons";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleNavbar = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="n-wrapper" id="Navbar">
      {/* left */}
      <div className="n-left">
        <div className="n-name">Azam</div>
        <Toggle />
      </div>
      {/* right */}
      <div className="n-right">
        <div className={openMenu ? "n-list open" : "n-list"}>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link
                activeClass="active"
                to="Navbar"
                spy={true}
                smooth={true}
                onClick={() => setOpenMenu(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="services"
                spy={true}
                smooth={true}
                onClick={() => setOpenMenu(false)}
              >
                Serivces
              </Link>
            </li>
            <li>
              <Link
                to="works"
                spy={true}
                smooth={true}
                onClick={() => setOpenMenu(false)}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="portfolio"
                spy={true}
                smooth={true}
                onClick={() => setOpenMenu(false)}
              >
                Protfolio
              </Link>
            </li>
            <li>
              <Link
                to="testimonial"
                spy={true}
                smooth={true}
                onClick={() => setOpenMenu(false)}
              >
                Testimonial
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamberger" onClick={toggleNavbar}>
          <UilBars width={"1.8rem"} height={"1.8rem"} />
        </div>

        <Link to="contact" spy={true} smooth={true}>
          <button className="button n-button">Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
