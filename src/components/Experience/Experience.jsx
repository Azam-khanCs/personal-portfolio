import React from "react";
import "./Experience.css";
import NumberCounter from "number-counter";
import { motion } from "framer-motion";

const metrics = [
  { end: 5, suffix: "y", label: "Nearly 5 years of experience" },
  { end: 4, suffix: "+", label: "Companies worked with" },
  { end: 35, suffix: "K+", label: "IT Career Rise LinkedIn followers" },
  { end: 15, suffix: "", label: "WhatsApp groups" },
  { end: 20, suffix: "+", label: "Full stack projects delivered" },
  { end: 10, suffix: "+", label: "Production deployments completed" },
];

const Experience = () => {
  return (
    <section className="experience section-shell" id="experience" aria-label="Professional statistics">
      <motion.div className="experience-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
        {metrics.map((metric) => (
          <motion.article className="metric-card glass-card" key={metric.label} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
            <div className="metric-number"><NumberCounter start={0} end={metric.end} delay={1} postFix={metric.suffix} /></div>
            <span>{metric.label}</span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
