import React, { useState } from "react";
import Toggle from "../Toggle/Toggle";
import { Link } from "react-scroll";
import { UilBars, UilTimes } from "@iconscout/react-unicons";
import { btnPrimary, cx } from "../../styles";
import portfolioLogo from "../../img/azamkhan.jpg";

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
  <header
   className="sticky top-0 z-50 mx-auto flex w-[min(1400px,calc(100%-2rem))] items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-soft backdrop-blur-xl md:px-5"
   id="Navbar"
  >
   <div className="flex items-center gap-4">
    <Link
     className="flex cursor-pointer items-center gap-3 text-lg font-black text-[var(--heading)]"
     to="Intro"
     spy
     smooth
     onClick={closeMenu}
    >
     <img
      className="h-11 w-16 rounded-xl border border-[var(--border)] object-cover object-center shadow-sm"
      src={portfolioLogo}
      alt="Azam Khan portfolio logo"
     />
    </Link>
    <Toggle />
   </div>

   <nav
    className={cx(
     openMenu &&
      "absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-soft backdrop-blur-xl lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
    )}
    aria-label="Primary navigation"
   >
    <ul
     className={cx(
      "m-0 hidden list-none items-center gap-1 p-0 lg:flex",
      openMenu && "flex flex-col items-stretch lg:flex-row lg:items-center",
     )}
    >
     {navItems.map((item) => (
      <li key={item.to}>
       <Link
        className="block cursor-pointer rounded-full px-4 py-2 text-sm font-extrabold text-[var(--text-muted)] transition hover:bg-[var(--chip)] hover:text-[var(--heading)]"
        activeClass="bg-[var(--chip)] text-[var(--heading)]"
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

   <div className="flex items-center gap-3">
    <Link to="contact" spy smooth offset={-70} onClick={closeMenu}>
     <button className={`${btnPrimary} hidden sm:inline-flex`}>
      Contact Me
     </button>
    </Link>
    <button
     className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--heading)] lg:hidden"
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
