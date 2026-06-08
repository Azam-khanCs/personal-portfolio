import React from "react";
import "./Portfolio.css";
import { motion } from "framer-motion";

import Vivenda from "../../img/vivenda.png";
import HeadHunters from "../../img/the head hunters.png";
import RedStore from "../../img/red store.png";
import FileConverter from "../../img/file converter.png";
import Railway from "../../img/railway.png";
import Gymclub from "../../img/fitClub.png";
import Greenbank from "../../img/green bank.png";
import Startup from "../../img/startup.png";
import Agency from "../../img/agency.png";

const sourceLink = "https://github.com/Azam-khanCs";

const projects = [
  { title: "Vivenda Business Website", description: "Responsive business website with a polished public-facing experience.", stack: ["React", "CSS", "Responsive UI"], features: ["Landing pages", "Brand sections", "Mobile layout"], role: "Frontend Developer", live: "http://vivenda.pe/", github: sourceLink, image: Vivenda },
  { title: "The Head Hunters", description: "Recruitment-focused web experience for showcasing hiring services.", stack: ["React", "JavaScript", "Netlify"], features: ["Service pages", "CTA flow", "Reusable sections"], role: "Frontend Developer", live: "https://symphonious-sundae-395465.netlify.app/", github: sourceLink, image: HeadHunters },
  { title: "Red Store Ecommerce", description: "Modern ecommerce storefront with product-focused visual hierarchy.", stack: ["React", "CSS", "JavaScript"], features: ["Product cards", "Store layout", "Responsive grid"], role: "Frontend Developer", live: "https://leafy-fenglisu-b5192f.netlify.app/", github: sourceLink, image: RedStore },
  { title: "File Converter App", description: "Utility-style web app interface for handling file conversion workflows.", stack: ["React", "JavaScript", "UI logic"], features: ["Upload flow", "Tool interface", "Clean states"], role: "Frontend Developer", live: "https://fileconverterapp.netlify.app/", github: sourceLink, image: FileConverter },
  { title: "Railway Platform", description: "Information platform with structured content and responsive presentation.", stack: ["React", "CSS", "Netlify"], features: ["Content sections", "Navigation", "Mobile support"], role: "Frontend Developer", live: "https://pakrailway.netlify.app/", github: sourceLink, image: Railway },
  { title: "Fitness Club Website", description: "High-energy landing experience for a fitness and gym brand.", stack: ["React", "CSS", "Animations"], features: ["Hero section", "Program cards", "CTA buttons"], role: "Frontend Developer", live: "https://64b8fafccbdc555f8e0c85e9--chic-selkie-57328a.netlify.app/", github: sourceLink, image: Gymclub },
  { title: "Green Bank", description: "Fintech-style marketing interface with clean product sections.", stack: ["React", "CSS", "Responsive UI"], features: ["Feature blocks", "Modern layout", "CTA flow"], role: "Frontend Developer", live: "https://lucky-brigadeiros-1474b2.netlify.app/", github: sourceLink, image: Greenbank },
  { title: "Startup Landing Page", description: "Startup-focused marketing page with structured service messaging.", stack: ["React", "JavaScript", "CSS"], features: ["Hero", "Service cards", "Responsive sections"], role: "Frontend Developer", live: "https://helpful-daffodil-2b8a35.netlify.app/", github: sourceLink, image: Startup },
  { title: "Agency Website", description: "Agency portfolio layout built for clear services and conversion.", stack: ["React", "CSS", "Netlify"], features: ["Portfolio preview", "Service content", "Contact CTA"], role: "Frontend Developer", live: "https://phenomenal-flan-25170e.netlify.app/", github: sourceLink, image: Agency },
];

const Portfolio = () => {
  return (
    <section className="portfolio section-shell" id="portfolio" aria-labelledby="portfolio-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className="eyebrow">&lt;My Projects /&gt;</span>
        <h2 className="section-title" id="portfolio-title">Projects with clear roles, stacks, and outcomes.</h2>
      </motion.div>

      <motion.div className="projects-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {projects.map((project) => (
          <motion.article className="project-card glass-card tilt-card" key={project.title} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8 }}>
            <div className="project-image">
              <img src={project.image} alt={`${project.title} screenshot`} />
              <div className="project-overlay">
                <a className="btn-primary" href={project.live} target="_blank" rel="noreferrer">View Live</a>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
              <span className="project-role">Role: {project.role}</span>
              <div className="project-actions">
                <a className="btn-primary" href={project.live} target="_blank" rel="noreferrer">Live Project</a>
                <a className="btn-ghost" href={project.github} target="_blank" rel="noreferrer">Source Code</a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;
