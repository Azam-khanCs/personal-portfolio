import React from "react";
import "./Footer.css";
import { UilWhatsapp, UilGithubAlt, UilInstagram, UilLinkedin } from "@iconscout/react-unicons";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <UilLinkedin /> },
  { label: "GitHub", href: "https://github.com/Azam-khanCs", icon: <UilGithubAlt /> },
  { label: "WhatsApp", href: "https://wa.me/00923419002614", icon: <UilWhatsapp /> },
  { label: "Instagram", href: "https://www.instagram.com/malak_azamkhan/", icon: <UilInstagram /> },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Azam Khan</strong>
          <span>Full Stack Engineer</span>
        </div>
        <a className="footer-email" href="mailto:dev.azamkhan@gmail.com">dev.azamkhan@gmail.com</a>
        <div className="footer-icons" aria-label="Footer social links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
              {React.cloneElement(link.icon, { size: "1.25rem" })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
