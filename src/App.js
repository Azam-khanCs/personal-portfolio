import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Services from "./components/Services/Services";
import Experience from "./components/Experience/Experience";
import Works from "./components/Works/Works";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonial from "./components/Testimonials/Testimonial";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AdminDashboard, { AdminLogin } from "./components/Admin/AdminDashboard";
import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { themeContext } from "./Context";
import { getAdminAuth, trackPageView } from "./utils/visitorAnalytics";

const trackedSections = [
  { id: "Intro", page: "/#home" },
  { id: "about", page: "/#about" },
  { id: "skills", page: "/#skills" },
  { id: "services", page: "/#services" },
  { id: "portfolio", page: "/#portfolio" },
  { id: "community", page: "/#community" },
  { id: "contact", page: "/#contact" },
];

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      trackPageView(`${location.pathname}${location.hash || ""}`);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const visibleSections = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = trackedSections.find((item) => item.id === entry.target.id);

          if (section && !visibleSections.has(section.page)) {
            visibleSections.add(section.page);
            trackPageView(section.page);
          }
        });
      },
      { threshold: 0.55 }
    );

    trackedSections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
};

const PortfolioHome = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}
    >
      <Navbar />
      <Intro />
      <About />
      <Skills />
      <Services />
      <Experience />
      <Works />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
      <a
        className="whatsapp-float"
        href="https://wa.me/00923419002614"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Azam Khan on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
};

const AdminRoute = () => {
  const [authenticated, setAuthenticated] = useState(() => getAdminAuth());

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
};

function App() {
  return (
    <>
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
