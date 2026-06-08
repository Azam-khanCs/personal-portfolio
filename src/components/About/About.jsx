import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const highlights = [
  "Bachelor in Computer Science, 2021",
  "Frontend interfaces",
  "Backend APIs",
  "Database-driven systems",
  "Admin dashboards",
  "Business websites",
  "Production deployments",
];

const About = () => {
  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className="eyebrow">&lt;About Me /&gt;</span>
        <h2 className="section-title" id="about-title">Full stack delivery with product sense.</h2>
      </motion.div>

      <div className="about-grid">
        <motion.div className="glass-card about-copy" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
          <p>
            I am Azam Khan, a Full Stack Engineer with nearly 5 years of
            experience building modern, scalable, and user-friendly web
            applications. I specialize in React.js, Next.js, Angular, Node.js,
            Express.js, and PostgreSQL, with hands-on experience deploying
            applications on AWS Lightsail, EC2, and S3.
          </p>
          <p>
            I completed my Bachelor in Computer Science in 2021. Since then, I
            have worked with different companies and contributed to frontend
            interfaces, backend APIs, database-driven systems, admin dashboards,
            business websites, and production deployments.
          </p>
          <p>
            Alongside software development, I manage IT Career Rise, an online
            professional community that helps job seekers and recruiters connect
            through LinkedIn, WhatsApp, Facebook, and email.
          </p>
        </motion.div>

        <motion.div className="about-highlights" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {highlights.map((item) => (
            <motion.div className="highlight-pill" key={item} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
