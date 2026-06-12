import React from "react";
import NumberCounter from "number-counter";
import { motion } from "framer-motion";
import { glassCard, sectionShell } from "../../styles";

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
    <section className={sectionShell} id="experience" aria-label="Professional statistics">
      <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
        {metrics.map((metric) => (
          <motion.article className={`${glassCard} flex min-h-36 flex-col justify-between p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-orange-400/40`} key={metric.label} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
            <div className="text-4xl font-black text-[var(--heading)]"><NumberCounter start={0} end={metric.end} delay={1} postFix={metric.suffix} /></div>
            <span className="text-sm font-bold text-[var(--text-muted)]">{metric.label}</span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
