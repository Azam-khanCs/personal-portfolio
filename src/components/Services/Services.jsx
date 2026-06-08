import React from "react";
import "./Services.css";
import { motion } from "framer-motion";
import Resume from "./Azam khan front-end Developer (React js ).pdf";

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
    <section className="services section-shell" id="services" aria-labelledby="services-title">
      <motion.div className="section-heading services-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className="eyebrow">&lt;Services /&gt;</span>
        <h2 className="section-title" id="services-title">Engineering support from idea to production.</h2>
        <p className="lead-text">I help teams turn business requirements into responsive interfaces, secure APIs, reliable databases, and deployable products.</p>
        <a className="btn-primary" href={Resume} download>Download CV</a>
      </motion.div>

      <motion.div className="services-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {services.map((service, index) => (
          <motion.article className="service-card glass-card tilt-card" key={service} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8 }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service}</h3>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
