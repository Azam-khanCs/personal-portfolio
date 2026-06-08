import React from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const skillGroups = [
  { title: "Frontend", skills: ["React.js", "Next.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Responsive UI", "Reusable components"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "Authorization", "API integrations"] },
  { title: "Database", skills: ["PostgreSQL", "SQL queries", "Relational design", "Data modeling"] },
  { title: "Cloud & Deployment", skills: ["AWS Lightsail", "AWS EC2", "AWS S3", "Server deployment", "Hosting", "Production builds"] },
  { title: "Tools & Workflow", skills: ["Git", "GitHub", "ClickUp", "Slack", "Jira", "Agile workflow", "Debugging", "Code reviews"] },
];

const Skills = () => {
  return (
    <section className="skills section-shell" id="skills" aria-labelledby="skills-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className="eyebrow">&lt;My Skills /&gt;</span>
        <h2 className="section-title" id="skills-title">Skills organized for real product work.</h2>
      </motion.div>

      <motion.div className="skills-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
        {skillGroups.map((group) => (
          <motion.article className="skill-card glass-card tilt-card" key={group.title} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}>
            <h3>{group.title}</h3>
            <div className="skill-badges">
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
