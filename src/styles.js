export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const themeVars = {
  light: {
    "--bg": "#f4f7fb",
    "--bg-soft": "#e9eef6",
    "--surface": "rgba(255, 255, 255, 0.82)",
    "--surface-strong": "rgba(255, 255, 255, 0.96)",
    "--text": "#101828",
    "--text-muted": "#5f6b7a",
    "--heading": "#0b1220",
    "--accent": "#ff8a00",
    "--accent-2": "#00d4ff",
    "--border": "rgba(15, 23, 42, 0.12)",
    "--chip": "rgba(15, 23, 42, 0.06)",
    "--shadow-soft": "0 20px 70px rgba(15, 23, 42, 0.1)",
    "--shadow-glow": "0 20px 70px rgba(255, 138, 0, 0.2)",
    "--radius": "22px",
  },
  dark: {
    "--bg": "#050816",
    "--bg-soft": "#0c1324",
    "--surface": "rgba(15, 23, 42, 0.72)",
    "--surface-strong": "rgba(17, 24, 39, 0.96)",
    "--text": "#f8fafc",
    "--text-muted": "#c3ccda",
    "--heading": "#ffffff",
    "--accent": "#ff8a00",
    "--accent-2": "#00d4ff",
    "--border": "rgba(255, 255, 255, 0.12)",
    "--chip": "rgba(255, 255, 255, 0.08)",
    "--shadow-soft": "0 20px 70px rgba(0, 0, 0, 0.28)",
    "--shadow-glow": "0 20px 70px rgba(255, 138, 0, 0.2)",
    "--radius": "22px",
  },
};

export const appShell =
  "min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(0,212,255,0.2),transparent_28rem),radial-gradient(circle_at_88%_18%,rgba(255,138,0,0.18),transparent_30rem),linear-gradient(180deg,var(--bg),var(--bg-soft))] text-[var(--text)] transition-colors duration-300";

export const adminShell =
  "min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(0,212,255,0.18),transparent_24rem),radial-gradient(circle_at_92%_8%,rgba(255,138,0,0.14),transparent_28rem),linear-gradient(180deg,var(--bg),var(--bg-soft))] p-4 text-[var(--text)] transition-colors duration-300 md:p-8";

export const sectionShell = "mx-auto w-[min(1400px,calc(100%-2rem))] py-14 md:py-20";

export const sectionHeading = "mb-8 max-w-[760px]";

export const eyebrow = "text-xs font-black uppercase tracking-[0.08em] text-[var(--accent)]";

export const sectionTitle = "my-2 text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.08] text-[var(--heading)]";

export const leadText = "mb-6 leading-8 text-[var(--text-muted)]";

export const glassCard =
  "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-soft backdrop-blur-[18px]";

export const adminCard =
  "min-w-0 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft backdrop-blur-[18px]";

export const tiltCard =
  "transition duration-200 hover:-translate-y-2 hover:border-orange-400/40 hover:shadow-glow";

const buttonBase =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-black transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70";

export const btnPrimary = cx(
  buttonBase,
  "bg-[linear-gradient(135deg,var(--accent),#ffd166)] text-slate-950 shadow-glow"
);

export const btnSecondary = cx(
  buttonBase,
  "border-[var(--border)] bg-[var(--surface-strong)] text-[var(--heading)]"
);

export const btnGhost = cx(buttonBase, "border-[var(--border)] bg-transparent text-[var(--text-muted)]");

export const chip =
  "rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-2 text-sm font-black text-[var(--heading)]";

export const socialButton =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] transition hover:-translate-y-1";

export const fieldLabel = "grid min-w-0 gap-1.5";

export const fieldLabelText = "text-sm font-black leading-5 text-[var(--heading)]";

export const inputControl =
  "block min-h-12 w-full max-w-full rounded-[14px] border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-orange-400/15";

export const textareaControl = cx(inputControl, "min-h-28 resize-y py-3");

export const dangerButton = "border-red-500/30 text-red-500";

