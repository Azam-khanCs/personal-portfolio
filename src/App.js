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
import { useContext } from "react";
import { themeContext } from "./Context";

function App() {
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
}

export default App;
