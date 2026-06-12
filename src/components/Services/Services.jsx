import React from "react";
import { motion } from "framer-motion";
import Resume from "./Azam khan front-end Developer (React js ).pdf";
import { btnPrimary, glassCard, eyebrow, leadText, sectionHeading, sectionShell, sectionTitle, tiltCard } from "../../styles";

const services = [
  "Full Stack Web Application Development",
  "React.js / Next.js Frontend Development",
  "Angular Application Development",
  "Backend API Development",
  "PostgreSQL Database Integration",
  "Admin Dashboard Development",
  "AWS Deployment & Hosting",
  "Website Optimization and Bug Fixing",
  "Portfolio and Business Website Development",
];

const Services = () => {
  return (
    <section className={sectionShell} id="services" aria-labelledby="services-title">
      <motion.div className={`${sectionHeading} max-w-3xl`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className={eyebrow}>&lt;Services /&gt;</span>
        <h2 className={sectionTitle} id="services-title">Engineering support from idea to production.</h2>
        <p className={leadText}>I help teams turn business requirements into responsive interfaces, secure APIs, reliable databases, and deployable products.</p>
        <a className={btnPrimary} href={Resume} download>Download CV</a>
      </motion.div>

      <motion.div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {services.map((service, index) => (
          <motion.article className={`${glassCard} ${tiltCard} min-h-44 p-6`} key={service} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8 }}>
            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--chip)] text-sm font-black text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="m-0 text-xl font-black text-[var(--heading)]">{service}</h3>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
