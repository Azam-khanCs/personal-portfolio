import React from "react";
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
import { btnGhost, btnPrimary, chip, glassCard, eyebrow, sectionHeading, sectionShell, sectionTitle, tiltCard } from "../../styles";

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
    <section className={sectionShell} id="portfolio" aria-labelledby="portfolio-title">
      <motion.div className={sectionHeading} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <span className={eyebrow}>&lt;My Projects /&gt;</span>
        <h2 className={sectionTitle} id="portfolio-title">Projects with clear roles, stacks, and outcomes.</h2>
      </motion.div>

      <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {projects.map((project) => (
          <motion.article className={`${glassCard} ${tiltCard} group overflow-hidden`} key={project.title} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -8 }}>
            <div className="relative aspect-video overflow-hidden">
              <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={project.image} alt={`${project.title} screenshot`} />
              <div className="absolute inset-0 grid place-items-center bg-slate-950/50 opacity-0 transition duration-300 group-hover:opacity-100">
                <a className={btnPrimary} href={project.live} target="_blank" rel="noreferrer">View Live</a>
              </div>
            </div>
            <div className="p-5">
              <h3 className="m-0 text-xl font-black text-[var(--heading)]">{project.title}</h3>
              <p className="leading-7 text-[var(--text-muted)]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span className={chip} key={item}>{item}</span>)}</div>
              <ul className="my-4 grid gap-2 pl-5 text-sm font-bold text-[var(--text-muted)]">{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
              <span className="mb-4 block text-sm font-black text-[var(--accent)]">Role: {project.role}</span>
              <div className="flex flex-wrap items-center gap-3">
                <a className={btnPrimary} href={project.live} target="_blank" rel="noreferrer">Live Project</a>
                <a className={btnGhost} href={project.github} target="_blank" rel="noreferrer">Source Code</a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;
