import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("src/App.tsx", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");

const KEY_ROUTES = [
  "/",
  "/about",
  "/practice-areas",
  "/practice-areas/:areaId",
  "/results",
  "/insights",
  "/insights/category/:categorySlug",
  "/insights/series/:seriesId",
  "/insights/:slug",
  "/legal-tools",
  "/consultation",
  "/contact",
  "/privacy-notice",
  "/terms-of-use",
  "/diagnostics",
];

describe("route wiring", () => {
  it("registers every key route in App.tsx", () => {
    for (const route of KEY_ROUTES) {
      expect(app, `missing route ${route}`).toContain(`path="${route}"`);
    }
  });

  it("has a catch-all 404 route", () => {
    expect(app).toContain('path="*"');
  });

  it("lists the canonical pages in the sitemap with lastmod dates", () => {
    for (const path of ["/", "/about", "/practice-areas", "/results", "/insights", "/legal-tools", "/contact"]) {
      expect(sitemap).toContain(`https://omwendwa.com${path === "/" ? "/" : path}<`);
    }
    expect(sitemap).toContain("<lastmod>");
  });
});

describe("page modules load without throwing", () => {
  const pages = [
    () => import("@/pages/Index"),
    () => import("@/pages/About"),
    () => import("@/pages/PracticeAreas"),
    () => import("@/pages/PracticeAreaDetail"),
    () => import("@/pages/Results"),
    () => import("@/pages/Insights"),
    () => import("@/pages/BlogPost"),
    () => import("@/pages/Series"),
    () => import("@/pages/LegalTools"),
    () => import("@/pages/Consultation"),
    () => import("@/pages/Contact"),
    () => import("@/pages/Diagnostics"),
    () => import("@/pages/NotFound"),
  ];

  it.each(pages.map((load, i) => [i, load] as const))("page module %i exports a component", async (_i, load) => {
    const mod = await load();
    expect(typeof mod.default).toBe("function");
  });
});
