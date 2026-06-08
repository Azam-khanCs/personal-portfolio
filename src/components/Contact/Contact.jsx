import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

const initialStatus = { type: "", message: "" };

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    const name = String(data.get("user_name") || "").trim();
    const email = String(data.get("user_email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in your name, email, and message." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus(initialStatus);

    emailjs
      .sendForm("service_0t8ba9e", "template_pn78hd3", form.current, "hS4JVh-_SOKLHjeaQ")
      .then(
        () => {
          setStatus({ type: "success", message: "Thanks for contacting me. I will reply soon." });
          form.current.reset();
        },
        () => {
          setStatus({ type: "error", message: "Message could not be sent right now. Please try again." });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-copy">
        <span className="eyebrow">&lt;Contact /&gt;</span>
        <h2 className="section-title" id="contact-title">Let us build something useful.</h2>
        <p>
          Reach out for task-based, project-based, full-time, or part-time work.
          I am also open to Project Manager, Team Lead, and technical leadership
          roles, plus hiring collaboration through IT Career Rise.
        </p>
        <div className="contact-methods">
          <a href="mailto:dev.azamkhan@gmail.com">dev.azamkhan@gmail.com</a>
          <a href="https://github.com/Azam-khanCs" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <a className="btn-primary contact-whatsapp" href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">Contact Me on WhatsApp</a>
      </div>

      <div className="contact-form-panel glass-card">
        <div className="contact-form-bg"></div>
        <form ref={form} id="contactForm" onSubmit={sendEmail}>
          <label>Name<input type="text" name="user_name" placeholder="Your name" autoComplete="name" /></label>
          <label>Email<input type="email" name="user_email" placeholder="you@example.com" autoComplete="email" /></label>
          <label>Message<textarea name="message" placeholder="Tell me about your project or role" /></label>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
          {status.message && <span className={`form-status ${status.type}`} role="status">{status.message}</span>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
