import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { btnPrimary, cx, eyebrow, glassCard, inputControl, sectionShell, sectionTitle, textareaControl } from "../../styles";

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
    <section className={`${sectionShell} grid gap-8 lg:grid-cols-[0.9fr_1.1fr]`} id="contact" aria-labelledby="contact-title">
      <div>
        <span className={eyebrow}>&lt;Contact /&gt;</span>
        <h2 className={sectionTitle} id="contact-title">Let us build something useful.</h2>
        <p className="max-w-2xl leading-8 text-[var(--text-muted)]">
          Reach out for task-based, project-based, full-time, or part-time work.
          I am also open to Project Manager, Team Lead, and technical leadership
          roles, plus hiring collaboration through IT Career Rise.
        </p>
        <div className="my-6 flex flex-wrap items-center gap-3">
          <a className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-2 text-sm font-black text-[var(--heading)]" href="mailto:dev.azamkhan@gmail.com">dev.azamkhan@gmail.com</a>
          <a className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-2 text-sm font-black text-[var(--heading)]" href="https://github.com/Azam-khanCs" target="_blank" rel="noreferrer">GitHub</a>
          <a className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-2 text-sm font-black text-[var(--heading)]" href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-2 text-sm font-black text-[var(--heading)]" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <a className={btnPrimary} href="https://wa.me/00923419002614" target="_blank" rel="noreferrer">Contact Me on WhatsApp</a>
      </div>

      <div className={`${glassCard} relative overflow-hidden p-5 md:p-7`}>
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.14),transparent_24rem)]"></div>
        <form className="relative z-[1] grid gap-4" ref={form} id="contactForm" onSubmit={sendEmail}>
          <label className="grid gap-2 text-sm font-black text-[var(--heading)]">Name<input className={inputControl} type="text" name="user_name" placeholder="Your name" autoComplete="name" /></label>
          <label className="grid gap-2 text-sm font-black text-[var(--heading)]">Email<input className={inputControl} type="email" name="user_email" placeholder="you@example.com" autoComplete="email" /></label>
          <label className="grid gap-2 text-sm font-black text-[var(--heading)]">Message<textarea className={cx(textareaControl, "min-h-36")} name="message" placeholder="Tell me about your project or role" /></label>
          <button type="submit" className={btnPrimary} disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
          {status.message && <span className={cx("rounded-2xl px-4 py-3 text-sm font-black", status.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")} role="status">{status.message}</span>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
