import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LOCKED_TOKENS, LOCKED_TYPOGRAPHY } from "@/lib/designTokens";

const css = readFileSync("src/index.css", "utf8");

describe("Porcelain Bloom design tokens", () => {
  it("keeps the warm off-white background and pastel palette in index.css", () => {
    const pairs: [string, string][] = [
      ["--background", LOCKED_TOKENS.background],
      ["--foreground", LOCKED_TOKENS.foreground],
      ["--card", LOCKED_TOKENS.card],
      ["--primary", LOCKED_TOKENS.primary],
      ["--secondary", LOCKED_TOKENS.secondary],
      ["--accent", LOCKED_TOKENS.accent],
      ["--border", LOCKED_TOKENS.border],
    ];
    for (const [name, value] of pairs) {
      expect(css, `${name} must stay ${value}`).toContain(`${name}: ${value}`);
    }
  });

  it("never falls back to pure white or a dark page background", () => {
    expect(css).not.toContain("--background: 0 0% 100%");
    expect(css).not.toContain("--background: 0 0% 0%");
  });

  it("keeps the locked typography families", () => {
    expect(css).toContain("Fraunces");
    expect(css).toContain("Plus Jakarta Sans");
    expect(LOCKED_TYPOGRAPHY.baseFontSize).toBe("17px");
  });
});
