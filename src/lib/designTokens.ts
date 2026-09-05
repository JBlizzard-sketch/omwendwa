/**
 * LOCKED DESIGN TOKENS — "Porcelain Bloom"
 *
 * These are the single source of truth for the warm off-white pastel theme.
 * They are asserted in src/test/designTokens.test.ts against src/index.css,
 * so any future edit that regresses the background, primary colour, text
 * colour or typography will fail the test suite.
 *
 * If the theme is intentionally changed, update BOTH index.css and this file.
 */

export const LOCKED_TOKENS = {
  /** Warm peach-ivory page background — must never become pure white or dark. */
  background: "28 72% 96%",
  /** Deep plum body text for AA contrast on the pastel background. */
  foreground: "337 34% 14%",
  /** Soft off-white card surface (never 0 0% 100%). */
  card: "32 60% 99%",
  /** Rose primary. */
  primary: "344 55% 44%",
  primaryForeground: "0 0% 100%",
  /** Blush secondary + serene blue accent. */
  secondary: "348 62% 96%",
  accent: "194 44% 91%",
  muted: "336 24% 95%",
  mutedForeground: "336 15% 34%",
  border: "336 22% 89%",
  ring: "344 55% 44%",
  radius: "0.875rem",
} as const;

export const LOCKED_PASTELS = {
  rose: "344 55% 44%",
  blush: "348 70% 97%",
  plum: "337 38% 17%",
  serene: "196 44% 62%",
  brass: "38 48% 40%",
  mint: "158 34% 92%",
  lilac: "268 44% 95%",
  apricot: "26 70% 94%",
} as const;

export const LOCKED_TYPOGRAPHY = {
  headingFamily: "'Fraunces', Georgia, serif",
  bodyFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  baseFontSize: "17px",
  baseLineHeight: "1.7",
} as const;

/** Reads a live CSS custom property from the document (browser only). */
export const readToken = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
};

export interface TokenCheck {
  name: string;
  expected: string;
  actual: string;
  ok: boolean;
}

/** Runtime verification used by the diagnostics page. */
export const verifyLiveTokens = (): TokenCheck[] => {
  const entries: Array<[string, string]> = [
    ["background", LOCKED_TOKENS.background],
    ["foreground", LOCKED_TOKENS.foreground],
    ["card", LOCKED_TOKENS.card],
    ["primary", LOCKED_TOKENS.primary],
    ["accent", LOCKED_TOKENS.accent],
    ["border", LOCKED_TOKENS.border],
    ["radius", LOCKED_TOKENS.radius],
  ];
  return entries.map(([name, expected]) => {
    const actual = readToken(name);
    return { name, expected, actual, ok: actual === expected };
  });
};
