import React, { useState } from "react";
import "./Navbar.css";
import Toggle from "../Toggle/Toggle";
import { Link } from "react-scroll";
import { UilBars, UilTimes } from "@iconscout/react-unicons";

const navItems = [
  { label: "Home", to: "Intro" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Services", to: "services" },
  { label: "Projects", to: "portfolio" },
  { label: "Community", to: "community" },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const closeMenu = () => setOpenMenu(false);

  return (
    <header className="navbar" id="Navbar">
      <div className="navbar-brand-row">
        <Link className="navbar-brand" to="Intro" spy smooth onClick={closeMenu}>
          Azam Khan
        </Link>
        <Toggle />
      </div>

      <nav className={`navbar-menu ${openMenu ? "open" : ""}`} aria-label="Primary navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                className="navbar-link"
                activeClass="active"
                to={item.to}
                spy
                smooth
                offset={-80}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-actions">
        <Link to="contact" spy smooth offset={-70} onClick={closeMenu}>
          <button className="btn-primary navbar-contact">Contact Me</button>
        </Link>
        <button
          className="navbar-toggle"
          onClick={() => setOpenMenu((value) => !value)}
          aria-label={openMenu ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={openMenu}
          type="button"
        >
          {openMenu ? <UilTimes size="1.5rem" /> : <UilBars size="1.5rem" />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
