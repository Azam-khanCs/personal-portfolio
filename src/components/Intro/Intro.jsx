import React from "react";
import profile from "../../img/azam1.png";
import Github from "../../img/github.png";
import LinkedIn from "../../img/linkedin.png";
import Instagram from "../../img/instagram.png";
import Resume from "../Services/Azam khan front-end Developer (React js ).pdf";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { btnGhost, btnPrimary, btnSecondary, chip, glassCard, sectionShell, socialButton } from "../../styles";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Azam-khanCs", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
  { label: "Instagram", href: "https://www.instagram.com/malak_azamkhan/", icon: Instagram },
];

const stats = ["React.js", "Next.js", "Angular", "Node.js", "PostgreSQL", "AWS"];

const Intro = () => {
  return (
    <section className={`${sectionShell} relative grid min-h-[calc(100vh-72px)] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]`} id="Intro" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute left-[-8rem] top-16 -z-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-16 right-0 -z-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl"></div>

      <motion.div className="relative z-[1]" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="text-xl font-black text-[var(--accent)]">Hi, I am</span>
        <h1 className="my-2 text-[clamp(3rem,8vw,6.5rem)] font-black leading-none text-[var(--heading)]" id="hero-title">Azam Khan</h1>
        <h2 className="m-0 text-[clamp(1.6rem,4vw,3rem)] font-black leading-tight text-[var(--heading)]">
          I am a <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">Full Stack Engineer</span>
        </h2>
        <p className="my-6 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">
          I build scalable web applications with React.js, Next.js, Angular,
          Node.js, Express.js, PostgreSQL, and AWS. I am available for
          task-based, project-based, full-time, and part-time work, including
          Project Manager, Team Lead, and technical leadership roles.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="contact" smooth spy offset={-70}>
            <motion.button className={btnPrimary} whileTap={{ scale: 0.96 }}>
              Hire Me
            </motion.button>
          </Link>
          <Link to="portfolio" smooth spy offset={-70}>
            <motion.button className={btnSecondary} whileTap={{ scale: 0.96 }}>
              View Projects
            </motion.button>
          </Link>
          <a className={btnGhost} href={Resume} download>Download CV</a>
          <a className={btnSecondary} href="mailto:dev.azamkhan@gmail.com">Email Me</a>
          <a className={btnGhost} href="https://github.com/Azam-khanCs" target="_blank" rel="noreferrer">GitHub</a>
          <a className={btnGhost} href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>

        <div className="mt-7 flex items-center gap-3" aria-label="Social links">
          {socialLinks.map((item) => (
            <a className={socialButton} key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
              <img className="h-6 w-6 object-contain" src={item.icon} alt={`${item.label} icon`} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div className="relative z-[1] grid justify-items-center gap-5" initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
        <div className={`${glassCard} relative grid aspect-square w-[min(470px,100%)] place-items-center overflow-hidden rounded-[2rem]`}>
          <div className="absolute inset-8 rounded-full bg-[linear-gradient(135deg,rgba(255,138,0,0.35),rgba(0,212,255,0.28))]"></div>
          <img className="relative z-[1] h-full w-full object-contain" src={profile} alt="Azam Khan professional portrait" />
          <div className="absolute bottom-5 left-5 right-5 z-[2] flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-black text-[var(--heading)] shadow-soft backdrop-blur-xl">
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.14)]"></span>
            Available for engineering, lead, and manager roles
          </div>
        </div>

        <motion.div className="flex max-w-xl flex-wrap justify-center gap-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}>
          {stats.map((item) => (
            <motion.span className={chip} key={item} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
