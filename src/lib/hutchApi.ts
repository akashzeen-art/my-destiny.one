/** LK Hutch CP Login / Unsub API (AI Astro & Numerology — pid 21). */

export const HUTCH_PRODUCT_ID = 21 as const;
export const HUTCH_COUNTRY_CODE = "94";

/** Silent demo access — never mention in UI copy. */
const DEMO_LOCAL = "9898989800";

/** Dev/proxy path avoids CORS; production uses same path via Vercel rewrite. */
const HUTCH_API_BASE =
  import.meta.env.VITE_HUTCH_API_BASE?.trim() || "/api-proxy";

export interface HutchActiveResponse {
  response: "ACTIVE";
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  /** AI Astro (pid 21) */
  unsubUrl?: string;
  /** Palm Astro (pid 20) alternate key */
  Url?: string;
}

export interface HutchInactiveResponse {
  response: "INACTIVE";
  redirectURL: string;
}

export type HutchLoginResponse = HutchActiveResponse | HutchInactiveResponse;

export interface HutchUnsubResponse {
  response: "SUCCECSS" | "SUCCESS" | "FAIL";
  errorMessage: string;
}

export interface HutchSession {
  msisdn: string;
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  unsubUrl: string;
}

function digitsOnly(input: string): string {
  return input.replace(/\D/g, "");
}

/** True when input is the silent demo number (any common formatting). */
export function isDemoMsisdn(input: string): boolean {
  const d = digitsOnly(input);
  if (!d) return false;
  if (d === DEMO_LOCAL) return true;
  if (d === HUTCH_COUNTRY_CODE + DEMO_LOCAL) return true;
  if (d.endsWith(DEMO_LOCAL)) return true;
  return false;
}

/** Display value for My Account — masks demo so it is not shown plainly. */
export function displayMsisdn(msisdn: string): string {
  if (isDemoMsisdn(msisdn)) return "••••••••••";
  return msisdn;
}

/** Normalize to 94… digits (demo kept as 94 + local). */
export function normalizeHutchMsisdn(input: string): string {
  const digits = digitsOnly(input);
  if (isDemoMsisdn(digits)) {
    return digits.startsWith(HUTCH_COUNTRY_CODE)
      ? digits
      : HUTCH_COUNTRY_CODE + DEMO_LOCAL;
  }
  if (digits.startsWith(HUTCH_COUNTRY_CODE)) return digits;
  if (digits.startsWith("0")) return HUTCH_COUNTRY_CODE + digits.slice(1);
  return HUTCH_COUNTRY_CODE + digits;
}

/** Sri Lanka Hutch: 94 + 9-digit national number, or silent demo. */
export function isValidHutchMsisdn(input: string): boolean {
  if (isDemoMsisdn(input)) return true;
  const msisdn = normalizeHutchMsisdn(input);
  return /^94\d{9}$/.test(msisdn);
}

function buildDemoSession(msisdn: string): HutchSession {
  const now = new Date();
  const renew = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace("T", " ").slice(0, 19);
  return {
    msisdn,
    actDate: fmt(now),
    renewDate: fmt(renew),
    pricePoint: "LKR 10",
    validity: "1",
    unsubUrl: `http://143.198.213.74/prod/LKH?cp=1&pid=${HUTCH_PRODUCT_ID}&msisdn=${msisdn}`,
  };
}

function loginUrl(msisdn: string): string {
  const params = new URLSearchParams({
    pid: String(HUTCH_PRODUCT_ID),
    msisdn,
  });
  return `${HUTCH_API_BASE}/prod/CPLogin/LKHU?${params.toString()}`;
}

function unsubApiUrl(msisdn: string): string {
  const params = new URLSearchParams({
    cp: "1",
    pid: String(HUTCH_PRODUCT_ID),
    msisdn,
  });
  return `${HUTCH_API_BASE}/prod/LKH?${params.toString()}`;
}

export function resolveUnsubUrl(data: HutchActiveResponse, msisdn: string): string {
  if (data.unsubUrl) return data.unsubUrl;
  if (data.Url) return data.Url;
  return `http://143.198.213.74/prod/LKH?cp=1&pid=${HUTCH_PRODUCT_ID}&msisdn=${msisdn}`;
}

export async function hutchLogin(msisdnRaw: string): Promise<
  | { status: "ACTIVE"; session: HutchSession }
  | { status: "INACTIVE"; redirectURL: string }
> {
  const msisdn = normalizeHutchMsisdn(msisdnRaw);

  if (isDemoMsisdn(msisdnRaw) || isDemoMsisdn(msisdn)) {
    return { status: "ACTIVE", session: buildDemoSession(msisdn) };
  }

  const res = await fetch(loginUrl(msisdn));
  if (!res.ok) {
    throw new Error(`Login request failed (${res.status})`);
  }
  const data = (await res.json()) as HutchLoginResponse;

  if (data.response === "ACTIVE") {
    return {
      status: "ACTIVE",
      session: {
        msisdn,
        actDate: data.actDate,
        renewDate: data.renewDate,
        pricePoint: data.pricePoint,
        validity: data.validity,
        unsubUrl: resolveUnsubUrl(data, msisdn),
      },
    };
  }

  if (data.response === "INACTIVE") {
    return {
      status: "INACTIVE",
      redirectURL: data.redirectURL,
    };
  }

  throw new Error("Unexpected login response");
}

export async function hutchUnsubscribe(
  msisdn: string,
): Promise<{ success: boolean; message: string }> {
  if (isDemoMsisdn(msisdn)) {
    return { success: true, message: "Service Deactivated Successfully" };
  }
  const res = await fetch(unsubApiUrl(normalizeHutchMsisdn(msisdn)));
  if (!res.ok) {
    throw new Error(`Unsubscribe request failed (${res.status})`);
  }
  const data = (await res.json()) as HutchUnsubResponse;
  const ok = data.response === "SUCCECSS" || data.response === "SUCCESS";
  return {
    success: ok,
    message:
      data.errorMessage ||
      (ok ? "Service Deactivated Successfully" : "Service Deactivation Failed"),
  };
}
