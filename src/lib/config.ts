import { BRAND } from "./brand";

declare const __API_BASE_URL__: string;

function resolveApiBaseUrl(): string {
  const built =
    typeof __API_BASE_URL__ !== "undefined" ? __API_BASE_URL__ : "/api/v1";

  if (typeof window === "undefined") {
    return built;
  }

  const { hostname } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  // Phone on same Wi‑Fi hitting Vite dev server must not call localhost:8000
  if (import.meta.env.DEV && !isLocalHost) {
    return `http://${hostname}:8000/api/v1`;
  }

  return built;
}

export const API_CONFIG = {
  get BASE_URL() {
    return resolveApiBaseUrl();
  },
  TIMEOUT: 120000,
  RETRY_ATTEMPTS: 3,
} as const;

export const APP_CONFIG = {
  NAME: BRAND.NAME,
  VERSION: "1.0.0",
  ENVIRONMENT: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

export const FEATURES = {
  MOCK_API:
    import.meta.env.VITE_USE_MOCK_API === "true" ||
    import.meta.env.VITE_STANDALONE === "true",
  STANDALONE: import.meta.env.VITE_STANDALONE === "true",
  OPENAI: Boolean(import.meta.env.VITE_OPENAI_API_KEY?.trim()),
  ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  PAYMENTS: import.meta.env.VITE_ENABLE_PAYMENTS === "true",
} as const;

export const OPENAI_CONFIG = {
  /** Same-origin proxy — avoids browser CORS to api.openai.com */
  BASE_URL: (import.meta.env.VITE_OPENAI_BASE_URL?.trim() || "/openai-proxy").replace(
    /\/$/,
    "",
  ),
  API_KEY: import.meta.env.VITE_OPENAI_API_KEY || "",
  MODEL: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
  TTS_MODEL: import.meta.env.VITE_OPENAI_TTS_MODEL || "tts-1",
  TTS_VOICE: import.meta.env.VITE_OPENAI_TTS_VOICE || "nova",
  STT_MODEL: import.meta.env.VITE_OPENAI_STT_MODEL || "whisper-1",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "ai_cosmic_astro_token",
  REFRESH_TOKEN: "ai_cosmic_astro_refresh_token",
  USER_DATA: "ai_cosmic_astro_user",
  SETTINGS: "ai_cosmic_astro_settings",
  SUBSCRIPTION: "ai_cosmic_astro_subscription",
  /** LK Hutch ACTIVE session (msisdn + activation details) */
  HUTCH_SESSION: "ai_cosmic_astro_hutch_session",
  /** MSISDN saved before redirect to subscription landing */
  HUTCH_PENDING_MSISDN: "ai_cosmic_astro_hutch_pending_msisdn",
} as const;

/** LK Hutch — AI Astro & Numerology (pid 21) */
export const HUTCH_CONFIG = {
  PRODUCT_ID: 21,
  PRODUCT_NAME: "AI Astro & Numerology",
  COUNTRY_CODE: "94",
  API_BASE: import.meta.env.VITE_HUTCH_API_BASE?.trim() || "/api-proxy",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup/",
    LOGIN: "/auth/login/",
    LOGOUT: "/auth/logout/",
    REFRESH: "/auth/refresh/",
    ME: "/auth/me/",
    CHANGE_PASSWORD: "/auth/password/change/",
    RESET_PASSWORD: "/auth/password/reset/",
    DASHBOARD: "/auth/dashboard/",
  },
  READINGS: {
    LIST: "/readings/list/",
    CREATE: "/readings/",
    DETAIL: (id: string) => `/readings/${id}/`,
    PALM_UPLOAD: "/readings/palm/upload/",
    PALM_ANALYZE: "/readings/palm/analyze/",
    PALM_ANALYZE_NEW: "/palm-reading/analyze/",
    ASTROLOGY_CREATE: "/readings/astrology/",
    SAVE_UNIFIED: "/readings/save/",
  },
  PREDICTIONS: { GET: "/predictions/get/" },
  DASHBOARD: { REALTIME: "/auth/dashboard/realtime/" },
  PLANS: { UPGRADE: "/auth/upgrade-plan/" },
  ASTROLOGY: {
    BIRTH_CHART: "/astrology/birth-chart/",
    COMPATIBILITY: "/astrology/compatibility/",
    DAILY_HOROSCOPE: "/astrology/daily-horoscope/",
  },
  NUMEROLOGY: {
    CREATE: "/numerology",
    STATUS: (id: string) => `/numerology/${id}/status`,
    RESULT: (id: string) => `/numerology/${id}/result`,
  },
  SUBSCRIPTIONS: {
    PLANS: "/subscriptions/plans/",
    SUBSCRIBE: "/subscriptions/subscribe/",
    CANCEL: "/subscriptions/cancel/",
    PAYMENT_METHODS: "/subscriptions/payment-methods/",
  },
  ANALYTICS: {
    USER_STATS: "/analytics/user-stats/",
    READINGS_HISTORY: "/analytics/readings-history/",
  },
} as const;

export default API_CONFIG;
