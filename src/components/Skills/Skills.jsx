import React from "react";
import { motion } from "framer-motion";
import { chip, glassCard, eyebrow, sectionHeading, sectionShell, sectionTitle, tiltCard } from "../../styles";

const skillGroups = [
  { title: "Frontend", skills: ["React.js", "Next.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Responsive UI", "Reusable components"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "Authorization", "API integrations"] },
  { title: "Database", skills: ["PostgreSQL", "SQL queries", "Relational design", "Data modeling"] },
  { title: "Cloud & Deployment", skills: ["AWS Lightsail", "AWS EC2", "AWS S3", "Server deployment", "Hosting", "Production builds"] },
  { title: "Tools & Workflow", skills: ["Git", "GitHub", "ClickUp", "Slack", "Jira", "Agile workflow", "Debugging", "Code reviews"] },
];

const Skills = () => {
  return (
    <section className={sectionShell} id="skills" aria-labelledby="skills-title">
      <motion.div className={sectionHeading} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className={eyebrow}>&lt;My Skills /&gt;</span>
        <h2 className={sectionTitle} id="skills-title">Skills organized for real product work.</h2>
      </motion.div>

      <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
        {skillGroups.map((group) => (
          <motion.article className={`${glassCard} ${tiltCard} p-6`} key={group.title} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}>
            <h3 className="m-0 text-xl font-black text-[var(--heading)]">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => <span className={chip} key={skill}>{skill}</span>)}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
