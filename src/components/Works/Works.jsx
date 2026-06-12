import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { btnGhost, btnPrimary, btnSecondary, glassCard, eyebrow, sectionShell } from "../../styles";
import communityLogo from "../../img/itcareerrise.jpeg";

const communityLinks = {
  linkedin: "https://www.linkedin.com/",
  whatsapp: "https://wa.me/00923419002614",
  facebook: "https://www.facebook.com/",
  email: "mailto:dev.azamkhan@gmail.com",
};

const communityStats = [
  { value: "35K+", label: "LinkedIn followers" },
  { value: "15", label: "WhatsApp groups" },
  { value: "Daily", label: "Jobs, hiring updates, and career posts" },
];

const communityCards = [
  "Job opportunities, recruiter posts, and hiring alerts",
  "Career resources, guidance, and professional support",
  "Collaboration space for job seekers, developers, and recruiters",
];

const Works = () => {
  return (
    <section className={sectionShell} id="community" aria-labelledby="community-title">
      <motion.div className={`${glassCard} relative grid gap-8 overflow-hidden p-6 md:p-8 lg:grid-cols-[1fr_0.85fr]`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_right,rgba(0,212,255,0.18),transparent_24rem)] opacity-70"></div>
        <div className="relative z-[1]">
          <div className="mb-5 flex items-center gap-4">
            <div className="h-16 w-28 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-glow" aria-label="IT Career Rise logo">
              <img
                className="h-full w-full object-cover object-center"
                src={communityLogo}
                alt="IT Career Rise community logo"
              />
            </div>
            <div>
              <span className={eyebrow}>&lt;Community /&gt;</span>
              <h2 className="m-0 text-4xl font-black text-[var(--heading)]" id="community-title">IT Career Rise</h2>
            </div>
          </div>
          <p className="mb-6 max-w-3xl leading-8 text-[var(--text-muted)]">
            IT Career Rise is my online professional community where job seekers,
            software engineers, and recruiters connect. I share job opportunities,
            hiring updates, recruiter posts, career resources, and practical
            professional guidance across LinkedIn, WhatsApp, Facebook, and email.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a className={btnPrimary} href={communityLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn Page</a>
            <a className={btnSecondary} href={communityLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp Community</a>
            <a className={btnSecondary} href={communityLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className={btnGhost} href={communityLinks.email}>Gmail</a>
            <Link to="contact" smooth spy offset={-70}><button className={btnGhost}>Hiring Collaboration</button></Link>
          </div>
        </div>

        <div className="relative z-[1]">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {communityStats.map((item) => (
              <motion.div className="rounded-2xl border border-[var(--border)] bg-[var(--chip)] p-4" key={item.label} whileHover={{ y: -6 }}>
                <strong className="block text-3xl font-black text-[var(--heading)]">{item.value}</strong>
                <span className="text-sm font-bold leading-6 text-[var(--text-muted)]">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 grid gap-3">
            {communityCards.map((item) => (
              <motion.div className="rounded-2xl border border-[var(--border)] bg-[var(--chip)] p-4 text-sm font-bold leading-6 text-[var(--text-muted)]" key={item} whileHover={{ x: 8 }}>{item}</motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Works;
