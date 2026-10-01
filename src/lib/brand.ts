/** Brand identity — My Destiny (Hutch LK) domain. */
export const BRAND_DOMAINS = [
  "aicosmicastro.com",
  "www.aicosmicastro.com",
  "content.aicosmicastro.com",
  "hlk.aicosmicastro.com",
  "my-destiny.one",
  "www.my-destiny.one",
  "hlk.my-destiny.one",
] as const;

export const BRAND_PRIMARY_DOMAIN = "hlk.my-destiny.one";

export function resolveBrandDomain(hostname?: string): string {
  const raw =
    hostname ??
    (typeof window !== "undefined" ? window.location.hostname : "");
  const host = raw.replace(/^www\./i, "").toLowerCase();
  if ((BRAND_DOMAINS as readonly string[]).includes(host)) return host;
  if (host.endsWith(".my-destiny.one")) return host;
  if (host.endsWith(".aicosmicastro.com")) return host;
  return BRAND_PRIMARY_DOMAIN;
}

export function isDestinyDomain(hostname?: string): boolean {
  const host = resolveBrandDomain(hostname).toLowerCase();
  return (
    host === "hlk.my-destiny.one" ||
    host.endsWith(".my-destiny.one") ||
    host === "my-destiny.one"
  );
}

export const BRAND = {
  NAME: "My Destiny",
  TAGLINE: "Discover the hidden mysteries of your life by the stars",
  PRIMARY_DOMAIN: BRAND_PRIMARY_DOMAIN,
  DOMAINS: BRAND_DOMAINS,
  get DOMAIN() {
    return resolveBrandDomain();
  },
  LOGO: "/destiny/images/logo.png",
  HEAD: "/destiny/images/head.png",
  VIDEO_PRELOADER: "",
  AUDIO_BG: "/bgaudio.mp3",
} as const;
