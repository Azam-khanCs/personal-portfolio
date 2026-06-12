import React from "react";
import { UilWhatsapp, UilGithubAlt, UilInstagram, UilLinkedin } from "@iconscout/react-unicons";
import { socialButton } from "../../styles";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <UilLinkedin /> },
  { label: "GitHub", href: "https://github.com/Azam-khanCs", icon: <UilGithubAlt /> },
  { label: "WhatsApp", href: "https://wa.me/00923419002614", icon: <UilWhatsapp /> },
  { label: "Instagram", href: "https://www.instagram.com/malak_azamkhan/", icon: <UilInstagram /> },
];

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-8 text-[var(--text)] backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1400px,100%)] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <strong className="block text-xl text-[var(--heading)]">Azam Khan</strong>
          <span className="text-sm font-bold text-[var(--text-muted)]">Full Stack Engineer</span>
        </div>
        <a className="text-sm font-bold text-[var(--text-muted)]" href="mailto:dev.azamkhan@gmail.com">dev.azamkhan@gmail.com</a>
        <div className="flex items-center gap-3" aria-label="Footer social links">
          {links.map((link) => (
            <a className={socialButton} key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
              {React.cloneElement(link.icon, { size: "1.25rem" })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
