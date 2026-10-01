/** Paths that require an ACTIVE Hutch subscription (pid 21). */
export const GATED_SERVICE_PATHS = [
  "/horoscope",
  "/talk-to-astra",
  "/tarot",
  "/numerology",
  "/dreams",
  "/chinese-horoscope",
  "/astrology-houses",
  "/planets",
  "/palm-analysis",
  "/astrology",
  "/downloads",
  "/dashboard",
] as const;

export function isGatedServicePath(pathname: string): boolean {
  return GATED_SERVICE_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );
}
