const ANALYTICS_KEY = "portfolioAnalytics";
const VISITOR_ID_KEY = "portfolioVisitorId";
const SESSION_KEY = "portfolioSessionTracked";
const ADMIN_AUTH_KEY = "portfolioAdminAuthenticated";

const emptyAnalytics = {
  totalUniqueVisitors: 0,
  totalPageViews: 0,
  firstVisitDate: null,
  lastVisitDate: null,
  dailyVisitCounts: {},
  dailyUniqueVisitors: {},
  visitors: {},
  visitorsLog: [],
};

const isBrowser = () => typeof window !== "undefined";

const todayKey = (date = new Date()) => date.toISOString().slice(0, 10);

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

export const getAnalytics = () => {
  if (!isBrowser()) {
    return emptyAnalytics;
  }

  const stored = safeParse(localStorage.getItem(ANALYTICS_KEY), emptyAnalytics);

  return {
    ...emptyAnalytics,
    ...stored,
    dailyVisitCounts: stored.dailyVisitCounts || {},
    dailyUniqueVisitors: stored.dailyUniqueVisitors || {},
    visitors: stored.visitors || {},
    visitorsLog: stored.visitorsLog || [],
  };
};

export const saveAnalytics = (analytics) => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
};

const createVisitorId = () => {
  if (isBrowser() && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const detectDeviceType = () => {
  if (!isBrowser()) {
    return "desktop";
  }

  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();

  if (/mobi|android|iphone|ipod/.test(userAgent) || width < 768) {
    return "mobile";
  }

  if (/ipad|tablet/.test(userAgent) || width < 1024) {
    return "tablet";
  }

  return "desktop";
};

const detectBrowser = () => {
  if (!isBrowser()) {
    return "Unknown";
  }

  const ua = navigator.userAgent;

  if (ua.includes("Edg/")) return "Microsoft Edge";
  if (ua.includes("Chrome/") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";

  return "Unknown";
};

const detectOS = () => {
  if (!isBrowser()) {
    return "Unknown";
  }

  const ua = navigator.userAgent;
  const platform = navigator.platform || "";

  if (/Win/.test(platform)) return "Windows";
  if (/Mac/.test(platform)) return "macOS";
  if (/Linux/.test(platform) && /Android/.test(ua)) return "Android";
  if (/Linux/.test(platform)) return "Linux";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";

  return "Unknown";
};

const detectReferrer = () => {
  if (!isBrowser() || !document.referrer) {
    return "Direct";
  }

  try {
    const source = new URL(document.referrer);
    const host = source.hostname.replace(/^www\./, "");

    if (host.includes("google")) return "Google";
    if (host.includes("bing")) return "Bing";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("x.com") || host.includes("twitter")) return "X / Twitter";
    if (host.includes("github")) return "GitHub";

    return host;
  } catch (error) {
    return document.referrer;
  }
};

const getVisitorId = () => {
  const existingId = localStorage.getItem(VISITOR_ID_KEY);

  if (existingId) {
    return { visitorId: existingId, isNewVisitor: false };
  }

  const visitorId = createVisitorId();
  localStorage.setItem(VISITOR_ID_KEY, visitorId);

  return { visitorId, isNewVisitor: true };
};

export const trackPageView = (path) => {
  if (!isBrowser()) {
    return getAnalytics();
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const dateKey = todayKey(now);
  const analytics = getAnalytics();
  const { visitorId, isNewVisitor } = getVisitorId();
  const isNewSession = sessionStorage.getItem(SESSION_KEY) !== "true";
  const screenResolution = `${window.screen.width} x ${window.screen.height}`;
  const page = path || window.location.pathname || "/";

  const visitorDetails = {
    id: visitorId,
    deviceType: detectDeviceType(),
    os: detectOS(),
    browser: detectBrowser(),
    screenResolution,
    referrer: detectReferrer(),
  };

  const existingVisitor = analytics.visitors[visitorId];
  const visitor = {
    ...visitorDetails,
    firstVisitDate: existingVisitor?.firstVisitDate || timestamp,
    lastVisitDate: timestamp,
    visitCount: (existingVisitor?.visitCount || 0) + 1,
    pagesVisited: [
      ...(existingVisitor?.pagesVisited || []),
      { page, timestamp },
    ].slice(-100),
  };

  if (isNewVisitor || !existingVisitor) {
    analytics.totalUniqueVisitors += 1;
  }

  analytics.totalPageViews += 1;
  analytics.firstVisitDate = analytics.firstVisitDate || timestamp;
  analytics.lastVisitDate = timestamp;
  analytics.dailyVisitCounts[dateKey] = (analytics.dailyVisitCounts[dateKey] || 0) + 1;
  analytics.dailyUniqueVisitors[dateKey] = analytics.dailyUniqueVisitors[dateKey] || [];

  if (isNewSession && !analytics.dailyUniqueVisitors[dateKey].includes(visitorId)) {
    analytics.dailyUniqueVisitors[dateKey].push(visitorId);
  }

  analytics.visitors[visitorId] = visitor;
  analytics.visitorsLog = [
    {
      ...visitorDetails,
      page,
      timestamp,
      isNewVisitor: isNewVisitor || !existingVisitor,
      isNewSession,
    },
    ...analytics.visitorsLog,
  ].slice(0, 500);

  sessionStorage.setItem(SESSION_KEY, "true");
  saveAnalytics(analytics);

  return analytics;
};

export const getAdminAuth = () => {
  if (!isBrowser()) {
    return false;
  }

  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
};

export const setAdminAuth = (value) => {
  if (!isBrowser()) {
    return;
  }

  if (value) {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
};

export const clearAnalytics = () => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(ANALYTICS_KEY);
  localStorage.removeItem(VISITOR_ID_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};

export const getLastDays = (days = 7) => {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return todayKey(date);
  });
};

export const formatDateTime = (value) => {
  if (!value) {
    return "Not recorded";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};
