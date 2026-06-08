import React from "react";
import "./Intro.css";
import profile from "../../img/azam1.png";
import Github from "../../img/github.png";
import LinkedIn from "../../img/linkedin.png";
import Instagram from "../../img/instagram.png";
import Resume from "../Services/Azam khan front-end Developer (React js ).pdf";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Azam-khanCs", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
  { label: "Instagram", href: "https://www.instagram.com/malak_azamkhan/", icon: Instagram },
];

const stats = ["React.js", "Next.js", "Angular", "Node.js", "PostgreSQL", "AWS"];

const Intro = () => {
  return (
    <section className="hero" id="Intro" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow-left"></div>
      <div className="hero-glow hero-glow-right"></div>

      <motion.div className="hero-copy" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="hero-kicker">Hi, I am</span>
        <h1 id="hero-title">Azam Khan</h1>
        <h2>
          I am a <span className="accent-text">Full Stack Engineer</span>
        </h2>
        <p>
          I build scalable web applications with React.js, Next.js, Angular,
          Node.js, Express.js, PostgreSQL, and AWS. I am available for
          task-based, project-based, full-time, and part-time work, including
          Project Manager, Team Lead, and technical leadership roles.
        </p>

        <div className="hero-actions">
          <Link to="contact" smooth spy offset={-70}>
            <motion.button className="btn-primary" whileTap={{ scale: 0.96 }}>
              Hire Me
            </motion.button>
          </Link>
          <Link to="portfolio" smooth spy offset={-70}>
            <motion.button className="btn-secondary" whileTap={{ scale: 0.96 }}>
              View Projects
            </motion.button>
          </Link>
          <a className="btn-ghost" href={Resume} download>Download CV</a>
          <a className="btn-secondary" href="mailto:dev.azamkhan@gmail.com">Email Me</a>
          <a className="btn-ghost" href="https://github.com/Azam-khanCs" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn-ghost" href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>

        <div className="social-links" aria-label="Social links">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
              <img src={item.icon} alt={`${item.label} icon`} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
        <div className="hero-portrait glass-card">
          <div className="hero-portrait-bg"></div>
          <img src={profile} alt="Azam Khan professional portrait" />
          <div className="status-card">
            <span></span>
            Available for engineering, lead, and manager roles
          </div>
        </div>

        <motion.div className="tech-cloud" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}>
          {stats.map((item) => (
            <motion.span key={item} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
