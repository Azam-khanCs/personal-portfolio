import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  UilAnalytics,
  UilDesktop,
  UilEye,
  UilEyeSlash,
  UilSignout,
  UilTrashAlt,
  UilUsersAlt,
} from "@iconscout/react-unicons";
import Toggle from "../Toggle/Toggle";
import { themeContext } from "../../Context";
import {
  clearAnalytics,
  formatDateTime,
  getAnalytics,
  getLastDays,
  setAdminAuth,
} from "../../utils/visitorAnalytics";
import {
  contentCollections,
  createBlankItem,
  fetchPortfolioContent,
  getPortfolioContent,
  savePortfolioContent,
} from "../../utils/portfolioContent";
import {
  adminCard,
  adminShell,
  btnGhost,
  btnPrimary,
  btnSecondary,
  cx,
  dangerButton,
  eyebrow,
  fieldLabel,
  fieldLabelText,
  inputControl,
  textareaControl,
  themeVars,
} from "../../styles";

const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "portfolio123";

const adminActions = "flex flex-wrap items-center justify-end gap-3 max-[680px]:justify-start";
const tabButton =
  "min-h-[42px] cursor-pointer rounded-xl border-0 bg-transparent px-4 font-black text-[var(--text-muted)] transition duration-200 hover:bg-[var(--surface-strong)] hover:text-[var(--heading)]";
const activeTab = "bg-[var(--surface-strong)] text-[var(--heading)] shadow-[inset_0_0_0_1px_var(--border)]";
const list = "m-0 grid list-none gap-3 p-0";
const listItem =
  "flex items-center justify-between gap-4 rounded-[14px] border border-[var(--border)] bg-[var(--chip)] p-3 max-[680px]:flex-col max-[680px]:items-start";
const ellipsisText = "overflow-hidden text-ellipsis whitespace-nowrap break-words font-black text-[var(--heading)]";
const mutedSmall = "text-[0.82rem] text-[var(--text-muted)]";
const emptyState = "rounded-[14px] border border-dashed border-[var(--border)] p-4 text-center text-[var(--text-muted)]";

const chartDateLabel = (dateKey) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(dateKey));

const MetricCard = ({ icon, value, label }) => (
  <article className={`${adminCard} flex min-h-[150px] flex-col justify-between transition duration-200 hover:-translate-y-1 hover:border-orange-400/40`}>
    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,rgba(255,138,0,0.18),rgba(0,212,255,0.16))] text-[var(--accent)]">{icon}</span>
    <div>
      <div className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-none text-[var(--heading)]">{value}</div>
      <p className="m-0 mt-1 text-sm font-extrabold text-[var(--text-muted)]">{label}</p>
    </div>
  </article>
);

const buildMostVisitedPages = (logs) => {
  const totals = logs.reduce((result, log) => {
    result[log.page] = (result[log.page] || 0) + 1;
    return result;
  }, {});

  return Object.entries(totals)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
};

const WeeklyChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.visits), 1);

  return (
    <div className="h-[320px] w-full max-[680px]:h-[280px]" aria-label="Weekly visits chart">
      <div className="mb-4 flex items-center gap-4 text-[0.84rem] font-extrabold text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-[linear-gradient(180deg,#ff8a00,#ffd166)]" />
          Page views
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-[linear-gradient(180deg,#00d4ff,#5eead4)]" />
          Visitors
        </span>
      </div>
      <div className="grid h-[calc(100%-2.2rem)] grid-cols-7 items-end gap-3 border-b border-[var(--border)] px-1 pb-0 pt-4">
        {data.map((item) => {
          const visitsHeight = `${Math.max((item.visits / maxValue) * 100, item.visits ? 8 : 2)}%`;
          const visitorsHeight = `${Math.max((item.visitors / maxValue) * 100, item.visitors ? 8 : 2)}%`;

          return (
            <div className="grid h-full min-w-0 grid-rows-[1fr_auto] gap-2.5" key={item.date}>
              <div className="relative flex min-h-0 items-end justify-center gap-1">
                <span className="absolute -top-3 text-[0.72rem] font-black text-[var(--text-muted)]">{item.visits}</span>
                <span className="block min-h-1 w-[min(26px,38%)] rounded-t-lg bg-[linear-gradient(180deg,#ff8a00,#ffd166)] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-[height,opacity] duration-300" style={{ height: visitsHeight }} />
                <span className="block min-h-1 w-[min(26px,38%)] rounded-t-lg bg-[linear-gradient(180deg,#00d4ff,#5eead4)] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-[height,opacity] duration-300" style={{ height: visitorsHeight }} />
              </div>
              <span className="whitespace-nowrap text-center text-[0.74rem] font-extrabold text-[var(--text-muted)]">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ToastShelf = ({ toasts }) => (
  <div className="pointer-events-none fixed right-4 top-4 z-[100] grid w-[min(360px,calc(100vw-2rem))] gap-2.5" aria-live="polite" aria-atomic="true">
    {toasts.map((toast) => (
      <div className={cx("animate-[toast-in_0.22s_ease_both] grid gap-1 rounded-[14px] border border-l-[5px] border-[var(--border)] bg-[var(--surface-strong)] p-4 text-[var(--text)] shadow-soft", toast.type === "warning" ? "border-l-amber-500" : "border-l-green-500")} key={toast.id}>
        <strong className="text-[var(--heading)]">{toast.title}</strong>
        <span className="text-sm text-[var(--text-muted)]">{toast.message}</span>
      </div>
    ))}
  </div>
);

const readFieldValue = (value, field) => {
  if (field.type === "tags") {
    return Array.isArray(value) ? value.join(", ") : value || "";
  }

  return value || "";
};

const writeFieldValue = (value, field) => {
  if (field.type === "tags") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
};

const ContentManager = ({ content, isLoading, isSaving, onChange, onSave, onToast, source }) => {
  const [activeCollectionKey, setActiveCollectionKey] = useState(contentCollections[0].key);
  const activeCollection =
    contentCollections.find((collection) => collection.key === activeCollectionKey) ||
    contentCollections[0];
  const items = content[activeCollection.key] || [];

  const updateItem = (itemId, field, value) => {
    onChange({
      ...content,
      [activeCollection.key]: items.map((item) =>
        item.id === itemId
          ? { ...item, [field.name]: writeFieldValue(value, field) }
          : item
      ),
    });
  };

  const addItem = () => {
    onChange({
      ...content,
      [activeCollection.key]: [createBlankItem(activeCollection), ...items],
    });
    onToast("Draft added", `${activeCollection.title} item is ready to edit.`);
  };

  const deleteItem = (itemId) => {
    onChange({
      ...content,
      [activeCollection.key]: items.filter((item) => item.id !== itemId),
    });
    onToast("Item removed", `${activeCollection.title} draft was removed.`, "warning");
  };

  const saveDraft = async () => {
    await onSave(content);
  };

  return (
    <section className="grid w-full min-w-0 max-w-full grid-cols-1 gap-4 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
      <aside className={`${adminCard} w-full max-w-full bg-[linear-gradient(160deg,rgba(255,138,0,0.12),transparent_44%),var(--surface)] max-[980px]:col-span-full`}>
        <span className={eyebrow}>Content Studio</span>
        <h2 className="m-0 mt-1 text-2xl text-[var(--heading)]">Portfolio CMS</h2>
        <p className="m-0 mt-2 leading-7 text-[var(--text-muted)]">
          Manage the data model for projects, services, skills, community links,
          testimonials, and profile copy.
        </p>
        <p className="m-0 mt-3 text-sm font-extrabold text-[var(--accent)]">
          {isLoading ? "Loading Firebase content..." : `Source: ${source === "firebase" ? "Firebase" : "Local fallback"}`}
        </p>
        <div className="mt-5 grid w-full min-w-0 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2" role="tablist" aria-label="Content collections">
          {contentCollections.map((collection) => (
            <button
              className={cx(tabButton, "flex min-h-12 w-full min-w-0 items-center justify-between px-3 text-left", collection.key === activeCollection.key && activeTab)}
              key={collection.key}
              onClick={() => setActiveCollectionKey(collection.key)}
              type="button"
            >
              {collection.title}
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--chip)] text-xs text-[var(--heading)]">{(content[collection.key] || []).length}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="grid w-full min-w-0 max-w-full gap-4 max-[980px]:col-span-full">
        <header className={`${adminCard} flex min-w-0 items-center justify-between gap-4 bg-[linear-gradient(135deg,rgba(0,212,255,0.1),transparent_45%),var(--surface)] max-[680px]:flex-col max-[680px]:items-start`}>
          <div>
            <h2 className="m-0 text-[var(--heading)]">{activeCollection.title}</h2>
            <p className="m-0 mt-2 leading-7 text-[var(--text-muted)]">{activeCollection.description}</p>
          </div>
          <div className={adminActions}>
            <button className={btnSecondary} onClick={addItem} type="button">
              Add
            </button>
            <button className={btnPrimary} disabled={isSaving || isLoading} onClick={saveDraft} type="button">
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </header>

        <div className="grid w-full min-w-0 max-w-full gap-4">
          {items.length ? (
            items.map((item, index) => (
              <article className={`${adminCard} grid w-full min-w-0 max-w-full gap-4 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--surface)]`} key={item.id}>
                <div className="flex min-w-0 items-center justify-between gap-4 border-b border-[var(--border)] pb-3 max-[680px]:flex-col max-[680px]:items-start">
                  <div>
                    <span className="text-xs font-black uppercase text-[var(--accent)]">Item {index + 1}</span>
                    <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--heading)]">{item.title || item.name || item.headline || "Untitled draft"}</h3>
                  </div>
                  <button
                    className={`${btnGhost} ${dangerButton}`}
                    onClick={() => deleteItem(item.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid w-full min-w-0 max-w-full grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
                  {activeCollection.fields.map((field) => (
                    <label
                      className={cx(fieldLabel, field.type === "textarea" && "col-span-full")}
                      key={field.name}
                    >
                      <span className="text-xs font-black uppercase tracking-[0.03em] text-[var(--text-muted)]">{field.label}</span>
                      {field.type === "textarea" ? (
                        <textarea
                          className={textareaControl}
                          onChange={(event) => updateItem(item.id, field, event.target.value)}
                          placeholder={field.placeholder || field.label}
                          value={readFieldValue(item[field.name], field)}
                        />
                      ) : (
                        <input
                          className={inputControl}
                          onChange={(event) => updateItem(item.id, field, event.target.value)}
                          placeholder={field.placeholder || field.label}
                          type={field.type === "url" ? "url" : "text"}
                          value={readFieldValue(item[field.name], field)}
                        />
                      )}
                    </label>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className={emptyState}>No {activeCollection.title.toLowerCase()} data yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export const AdminLogin = ({ onLogin }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      onLogin();
      return;
    }

    setError("Invalid admin email or password.");
  };

  return (
    <main className={adminShell} style={darkMode ? themeVars.dark : themeVars.light}>
      <section className="grid min-h-screen place-items-center p-5">
        <div className="w-[min(480px,100%)] rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(1.2rem,5vw,2rem)] shadow-soft backdrop-blur-[18px]">
          <div className={adminActions}>
            <Toggle />
          </div>
          <h1 className="m-0 mb-2 text-[clamp(1.8rem,4vw,3rem)] font-black leading-none text-[var(--heading)]">Admin Login</h1>
          <p className="text-[var(--text-muted)]">Sign in to view local visitor analytics for this browser.</p>

          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>Email</span>
              <input
                className={inputControl}
                autoComplete="email"
                name="email"
                onChange={handleChange}
                placeholder="admin@portfolio.com"
                type="email"
                value={credentials.email}
              />
            </label>

            <label className={fieldLabel}>
              <span className={fieldLabelText}>Password</span>
              <div className="relative">
                <input
                  className={`${inputControl} pr-12`}
                  autoComplete="current-password"
                  name="password"
                  onChange={handleChange}
                  placeholder="portfolio123"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 inline-flex h-[38px] w-[38px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-[var(--text-muted)] transition hover:bg-[var(--chip)] hover:text-[var(--heading)] focus-visible:bg-[var(--chip)] focus-visible:text-[var(--heading)] focus-visible:outline-none"
                  onClick={() => setShowPassword((value) => !value)}
                  type="button"
                >
                  {showPassword ? <UilEyeSlash size="1.15rem" /> : <UilEye size="1.15rem" />}
                </button>
              </div>
            </label>

            {error && <p className="m-0 rounded-[14px] border border-red-500/25 bg-red-500/10 p-3 font-extrabold text-red-500">{error}</p>}

            <button className={btnPrimary} type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

const AdminDashboard = ({ onLogout }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [analytics, setAnalytics] = useState(() => getAnalytics());
  const [activeView, setActiveView] = useState("content");
  const [content, setContent] = useState(() => getPortfolioContent());
  const [contentSource, setContentSource] = useState("local");
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isContentSaving, setIsContentSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const today = getLastDays(1)[0];
  const recentLogs = analytics.visitorsLog.slice(0, 8);
  const mostVisitedPages = useMemo(
    () => buildMostVisitedPages(analytics.visitorsLog),
    [analytics.visitorsLog]
  );
  const weeklyData = useMemo(
    () =>
      getLastDays(7).map((date) => ({
        date: chartDateLabel(date),
        visits: analytics.dailyVisitCounts[date] || 0,
        visitors: analytics.dailyUniqueVisitors[date]?.length || 0,
      })),
    [analytics.dailyVisitCounts, analytics.dailyUniqueVisitors]
  );

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      setIsContentLoading(true);

      const result = await fetchPortfolioContent();

      if (!active) {
        return;
      }

      setContent(result.content);
      setContentSource(result.source);
      setIsContentLoading(false);

      if (result.error) {
        pushToast("Firebase unavailable", "Using local content until Firestore is reachable.", "warning");
      }
    };

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  const handleReset = () => {
    const confirmed = window.confirm("Clear all local analytics data for this browser?");

    if (!confirmed) {
      return;
    }

    clearAnalytics();
    setAnalytics(getAnalytics());
  };

  const handleLogout = () => {
    setAdminAuth(false);
    onLogout();
  };

  const pushToast = (title, message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, title, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const saveContent = async (nextContent) => {
    setIsContentSaving(true);

    try {
      await savePortfolioContent(nextContent);
      setContentSource("firebase");
      pushToast("Draft saved", "Content is saved to Firebase.");
    } catch (error) {
      setContentSource("local");
      pushToast("Firebase save failed", "Your draft is still cached locally. Check Firestore rules.", "warning");
    } finally {
      setIsContentSaving(false);
    }
  };

  return (
    <main className={adminShell} style={darkMode ? themeVars.dark : themeVars.light}>
      <ToastShelf toasts={toasts} />
      <div className="mx-auto w-[min(1280px,100%)] min-w-0">
        <header className={`${adminCard} mb-5 flex items-center justify-between gap-4 max-[680px]:flex-col max-[680px]:items-start`}>
          <div className="min-w-0">
            <h1 className="m-0 mb-2 text-[clamp(1.8rem,4vw,3rem)] font-black leading-none text-[var(--heading)]">Portfolio Admin</h1>
            <p className="text-[var(--text-muted)]">
              Manage analytics, content drafts, and the future Firebase data structure.
            </p>
          </div>

          <div className={adminActions}>
            <Toggle />
            <button className={`${btnGhost} ${dangerButton}`} onClick={handleReset} type="button">
              <UilTrashAlt size="1.1rem" />
              Reset
            </button>
            <button className={btnSecondary} onClick={handleLogout} type="button">
              <UilSignout size="1.1rem" />
              Logout
            </button>
          </div>
        </header>

        <nav className="mb-4 inline-flex gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-soft max-[680px]:grid max-[680px]:w-full max-[680px]:grid-cols-2" aria-label="Admin views">
          <button
            className={cx(tabButton, activeView === "content" && activeTab)}
            onClick={() => setActiveView("content")}
            type="button"
          >
            Content Studio
          </button>
          <button
            className={cx(tabButton, activeView === "analytics" && activeTab)}
            onClick={() => setActiveView("analytics")}
            type="button"
          >
            Analytics
          </button>
        </nav>

        {activeView === "content" ? (
          <ContentManager
            content={content}
            isLoading={isContentLoading}
            isSaving={isContentSaving}
            onChange={setContent}
            onSave={saveContent}
            onToast={pushToast}
            source={contentSource}
          />
        ) : (
          <>
            <section className="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1" aria-label="Visitor metrics">
              <MetricCard
                icon={<UilUsersAlt />}
                label="Total unique visitors"
                value={analytics.totalUniqueVisitors}
              />
              <MetricCard
                icon={<UilEye />}
                label="Total page views"
                value={analytics.totalPageViews}
              />
              <MetricCard
                icon={<UilAnalytics />}
                label="Today's visitors"
                value={analytics.dailyUniqueVisitors[today]?.length || 0}
              />
              <MetricCard
                icon={<UilDesktop />}
                label="Tracked sessions"
                value={analytics.visitorsLog.filter((log) => log.isNewSession).length}
              />
            </section>

            <section className="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-4 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
              <article className={adminCard}>
                <h2 className="m-0 mb-4 text-[1.05rem] text-[var(--heading)]">Weekly Visits</h2>
                <WeeklyChart data={weeklyData} />
              </article>

              <article className={adminCard}>
                <h2 className="m-0 mb-4 text-[1.05rem] text-[var(--heading)]">Most Visited Pages</h2>
                {mostVisitedPages.length ? (
                  <ul className={list}>
                    {mostVisitedPages.map((item) => (
                      <li className={listItem} key={item.page}>
                        <div className="min-w-0">
                          <div className={ellipsisText}>{item.page}</div>
                          <span className={mutedSmall}>Portfolio route</span>
                        </div>
                        <strong className="whitespace-nowrap text-[0.82rem] text-[var(--text-muted)]">{item.count} views</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={emptyState}>No page data yet.</div>
                )}
              </article>
            </section>

            <section className="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-4 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
              <article className={adminCard}>
                <h2 className="m-0 mb-4 text-[1.05rem] text-[var(--heading)]">Recent Visitors</h2>
                {recentLogs.length ? (
                  <ul className={list}>
                    {recentLogs.map((log) => (
                      <li className={listItem} key={`${log.id}-${log.timestamp}-${log.page}`}>
                        <div className="min-w-0">
                          <div className={ellipsisText}>{log.page}</div>
                          <span className={mutedSmall}>
                            {log.deviceType} - {log.browser} - {log.os} - {log.screenResolution}
                          </span>
                        </div>
                        <span className="whitespace-nowrap text-[0.82rem] text-[var(--text-muted)]">{formatDateTime(log.timestamp)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={emptyState}>Recent visits will appear here.</div>
                )}
              </article>

              <article className={adminCard}>
                <h2 className="m-0 mb-4 text-[1.05rem] text-[var(--heading)]">Referrers</h2>
                {recentLogs.length ? (
                  <ul className={list}>
                    {buildMostVisitedPages(
                      analytics.visitorsLog.map((log) => ({
                        ...log,
                        page: log.referrer || "Direct",
                      }))
                    ).map((item) => (
                      <li className={listItem} key={item.page}>
                        <div className="min-w-0">
                          <div className={ellipsisText}>{item.page}</div>
                          <span className={mutedSmall}>Traffic source</span>
                        </div>
                        <strong className="whitespace-nowrap text-[0.82rem] text-[var(--text-muted)]">{item.count}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={emptyState}>No referrers tracked yet.</div>
                )}
              </article>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
