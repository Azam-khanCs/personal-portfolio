import React from "react";
import "./Works.css";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

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
    <section className="community section-shell" id="community" aria-labelledby="community-title">
      <motion.div className="community-panel glass-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
        <div className="community-bg"></div>
        <div className="community-copy">
          <div className="community-brand">
            <div className="community-logo" aria-label="IT Career Rise logo">
              <span>IT</span>
              <strong>CR</strong>
            </div>
            <div>
              <span className="eyebrow">&lt;Community /&gt;</span>
              <h2 id="community-title">IT Career Rise</h2>
            </div>
          </div>
          <p>
            IT Career Rise is my online professional community where job seekers,
            software engineers, and recruiters connect. I share job opportunities,
            hiring updates, recruiter posts, career resources, and practical
            professional guidance across LinkedIn, WhatsApp, Facebook, and email.
          </p>
          <div className="community-actions">
            <a className="btn-primary" href={communityLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn Page</a>
            <a className="btn-secondary" href={communityLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp Community</a>
            <a className="btn-secondary" href={communityLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className="btn-ghost" href={communityLinks.email}>Gmail</a>
            <Link to="contact" smooth spy offset={-70}><button className="btn-ghost">Hiring Collaboration</button></Link>
          </div>
        </div>

        <div className="community-visual">
          <div className="community-stats">
            {communityStats.map((item) => (
              <motion.div className="community-stat" key={item.label} whileHover={{ y: -6 }}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="community-cards">
            {communityCards.map((item) => (
              <motion.div className="network-card" key={item} whileHover={{ x: 8 }}>{item}</motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Works;
