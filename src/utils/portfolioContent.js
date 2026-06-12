import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CONTENT_KEY = "portfolioContentDraft";
const CONTENT_DOC = "content";
const CONTENT_COLLECTION = "portfolio";

export const contentCollections = [
  {
    key: "projects",
    title: "Projects",
    description: "Portfolio projects, live links, stacks, features, and images.",
    fields: [
      { name: "title", label: "Project title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "stack", label: "Stack", type: "tags", placeholder: "React, Node.js, Firebase" },
      { name: "features", label: "Features", type: "tags", placeholder: "Dashboard, Auth, API" },
      { name: "role", label: "Role", type: "text" },
      { name: "live", label: "Live URL", type: "url" },
      { name: "github", label: "GitHub URL", type: "url" },
      { name: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    key: "skills",
    title: "Skills",
    description: "Grouped skills for frontend, backend, database, cloud, and tools.",
    fields: [
      { name: "title", label: "Group title", type: "text" },
      { name: "skills", label: "Skills", type: "tags", placeholder: "React, Next.js, TypeScript" },
    ],
  },
  {
    key: "services",
    title: "Services",
    description: "Services shown on the homepage.",
    fields: [
      { name: "title", label: "Service title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "items", label: "Service points", type: "tags", placeholder: "Responsive UI, API integration" },
    ],
  },
  {
    key: "community",
    title: "Community",
    description: "Groups, pages, channels, stats, and community links.",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "type", label: "Type", type: "text", placeholder: "LinkedIn Page, WhatsApp Group" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "link", label: "Link", type: "url" },
      { name: "members", label: "Members / Stats", type: "text" },
    ],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description: "Client, recruiter, and community feedback.",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "review", label: "Review", type: "textarea" },
      { name: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    key: "about",
    title: "About Me",
    description: "Profile summary, headline, highlights, and professional description.",
    fields: [
      { name: "headline", label: "Headline", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "highlights", label: "Highlights", type: "tags", placeholder: "React specialist, Full-stack apps" },
      { name: "resume", label: "Resume URL", type: "url" },
    ],
  },
];

const defaultContent = {
  projects: [
    {
      id: "project-1",
      title: "The Head Hunters",
      description: "Recruitment-focused web experience for showcasing hiring services.",
      stack: ["React", "JavaScript", "Netlify"],
      features: ["Service pages", "CTA flow", "Reusable sections"],
      role: "Frontend Developer",
      live: "https://symphonious-sundae-395465.netlify.app/",
      github: "https://github.com/Azam-khanCs",
      image: "",
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Frontend",
      skills: ["React.js", "Next.js", "Angular", "JavaScript", "TypeScript"],
    },
  ],
  services: [
    {
      id: "service-1",
      title: "Frontend Development",
      description: "Responsive, polished interfaces built with modern React patterns.",
      items: ["Reusable components", "Responsive UI", "API integration"],
    },
  ],
  community: [
    {
      id: "community-1",
      name: "IT Career Rise",
      type: "LinkedIn Page",
      description: "Professional community for jobs, recruiters, and developer updates.",
      link: "",
      members: "Growing network",
    },
  ],
  testimonials: [
    {
      id: "testimonial-1",
      name: "Recruiter",
      role: "Hiring Community",
      review: "Consistent community support for connecting developers with real hiring updates.",
      image: "",
    },
  ],
  about: [
    {
      id: "about-1",
      headline: "Front-end and full-stack developer",
      description: "I build responsive interfaces, backend APIs, and admin dashboards.",
      highlights: ["React.js", "Node.js", "PostgreSQL", "Admin dashboards"],
      resume: "",
    },
  ],
};

const isBrowser = () => typeof window !== "undefined";

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

export const getPortfolioContent = () => {
  if (!isBrowser()) {
    return defaultContent;
  }

  return {
    ...defaultContent,
    ...(safeParse(localStorage.getItem(CONTENT_KEY)) || {}),
  };
};

const cachePortfolioContent = (content) => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

export const fetchPortfolioContent = async () => {
  const fallbackContent = getPortfolioContent();

  try {
    const snapshot = await getDoc(doc(db, CONTENT_COLLECTION, CONTENT_DOC));

    if (!snapshot.exists()) {
      await setDoc(doc(db, CONTENT_COLLECTION, CONTENT_DOC), {
        content: fallbackContent,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return { content: fallbackContent, source: "local-seeded" };
    }

    const remoteContent = snapshot.data().content || {};
    const mergedContent = {
      ...defaultContent,
      ...remoteContent,
    };

    cachePortfolioContent(mergedContent);
    return { content: mergedContent, source: "firebase" };
  } catch (error) {
    return { content: fallbackContent, source: "local", error };
  }
};

export const savePortfolioContent = async (content) => {
  cachePortfolioContent(content);

  await setDoc(
    doc(db, CONTENT_COLLECTION, CONTENT_DOC),
    {
      content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const createBlankItem = (collection) => {
  return collection.fields.reduce(
    (item, field) => ({
      ...item,
      [field.name]: field.type === "tags" ? [] : "",
    }),
    { id: `${collection.key}-${Date.now()}` }
  );
};
