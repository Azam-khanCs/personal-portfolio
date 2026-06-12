import React, { useContext, useMemo, useState } from "react";
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
import "./Admin.css";

const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "portfolio123";

const chartDateLabel = (dateKey) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(dateKey));

const MetricCard = ({ icon, value, label }) => (
  <article className="admin-card metric-card">
    <span className="metric-icon">{icon}</span>
    <div>
      <div className="metric-value">{value}</div>
      <p className="metric-label">{label}</p>
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
    <div className="chart-box" aria-label="Weekly visits chart">
      <div className="chart-legend">
        <span>
          <i className="legend-dot visits-dot" />
          Page views
        </span>
        <span>
          <i className="legend-dot visitors-dot" />
          Visitors
        </span>
      </div>
      <div className="bar-chart">
        {data.map((item) => {
          const visitsHeight = `${Math.max((item.visits / maxValue) * 100, item.visits ? 8 : 2)}%`;
          const visitorsHeight = `${Math.max((item.visitors / maxValue) * 100, item.visitors ? 8 : 2)}%`;

          return (
            <div className="bar-column" key={item.date}>
              <div className="bar-pair">
                <span className="bar-value">{item.visits}</span>
                <span className="chart-bar visits-bar" style={{ height: visitsHeight }} />
                <span className="chart-bar visitors-bar" style={{ height: visitorsHeight }} />
              </div>
              <span className="bar-label">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
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
    <main className={`admin-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <section className="login-wrap">
        <div className="login-panel">
          <div className="admin-actions">
            <Toggle />
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to view local visitor analytics for this browser.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={handleChange}
                placeholder="admin@portfolio.com"
                type="email"
                value={credentials.email}
              />
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="password-input-wrap">
                <input
                  autoComplete="current-password"
                  name="password"
                  onChange={handleChange}
                  placeholder="portfolio123"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="password-toggle-button"
                  onClick={() => setShowPassword((value) => !value)}
                  type="button"
                >
                  {showPassword ? <UilEyeSlash size="1.15rem" /> : <UilEye size="1.15rem" />}
                </button>
              </div>
            </label>

            {error && <p className="login-error">{error}</p>}

            <button className="btn-primary" type="submit">
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

  return (
    <main className={`admin-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="admin-page">
        <header className="admin-topbar">
          <div className="admin-title-block">
            <h1>Visitor Analytics</h1>
            <p>
              First visit: {formatDateTime(analytics.firstVisitDate)} - Last visit:{" "}
              {formatDateTime(analytics.lastVisitDate)}
            </p>
          </div>

          <div className="admin-actions">
            <Toggle />
            <button className="btn-ghost danger-button" onClick={handleReset} type="button">
              <UilTrashAlt size="1.1rem" />
              Reset
            </button>
            <button className="btn-secondary" onClick={handleLogout} type="button">
              <UilSignout size="1.1rem" />
              Logout
            </button>
          </div>
        </header>

        <section className="admin-grid" aria-label="Visitor metrics">
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

        <section className="admin-panels">
          <article className="admin-card">
            <h2>Weekly Visits</h2>
            <WeeklyChart data={weeklyData} />
          </article>

          <article className="admin-card">
            <h2>Most Visited Pages</h2>
            {mostVisitedPages.length ? (
              <ul className="page-list">
                {mostVisitedPages.map((item) => (
                  <li className="page-item" key={item.page}>
                    <div className="page-main">
                      <div className="page-path">{item.page}</div>
                      <span className="table-muted">Portfolio route</span>
                    </div>
                    <strong className="page-count">{item.count} views</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No page data yet.</div>
            )}
          </article>
        </section>

        <section className="admin-panels">
          <article className="admin-card">
            <h2>Recent Visitors</h2>
            {recentLogs.length ? (
              <ul className="recent-list">
                {recentLogs.map((log) => (
                  <li className="recent-item" key={`${log.id}-${log.timestamp}-${log.page}`}>
                    <div className="recent-main">
                      <div className="recent-page">{log.page}</div>
                      <span className="recent-meta">
                        {log.deviceType} - {log.browser} - {log.os} - {log.screenResolution}
                      </span>
                    </div>
                    <span className="recent-time">{formatDateTime(log.timestamp)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">Recent visits will appear here.</div>
            )}
          </article>

          <article className="admin-card">
            <h2>Referrers</h2>
            {recentLogs.length ? (
              <ul className="page-list">
                {buildMostVisitedPages(
                  analytics.visitorsLog.map((log) => ({ ...log, page: log.referrer || "Direct" }))
                ).map((item) => (
                  <li className="page-item" key={item.page}>
                    <div className="page-main">
                      <div className="page-path">{item.page}</div>
                      <span className="table-muted">Traffic source</span>
                    </div>
                    <strong className="page-count">{item.count}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No referrers tracked yet.</div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
