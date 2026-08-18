import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Client-side fallback for the legacy Ochiel-era URL structure.
 * True 301s are issued by vercel.json in production; this keeps the
 * same paths working on hosts that only serve the SPA shell.
 */
const rules: { test: RegExp; to: (m: RegExpMatchArray) => string }[] = [
  { test: /^\/blog\/?$/i, to: () => "/insights" },
  { test: /^\/blog\/(.+)$/i, to: (m) => `/insights/${m[1]}` },
  { test: /^\/news\/?$/i, to: () => "/insights" },
  { test: /^\/articles?\/(.+)$/i, to: (m) => `/insights/${m[1]}` },
  { test: /^\/services\/?$/i, to: () => "/practice-areas" },
  { test: /^\/services\/(.+)$/i, to: (m) => `/practice-areas/${m[1]}` },
  { test: /^\/practice\/(.+)$/i, to: (m) => `/practice-areas/${m[1]}` },
  { test: /^\/areas\/(.+)$/i, to: (m) => `/practice-areas/${m[1]}` },
  { test: /^\/expertise\/?(.*)$/i, to: (m) => (m[1] ? `/practice-areas/${m[1]}` : "/practice-areas") },
  { test: /^\/team\/?$/i, to: () => "/about" },
  { test: /^\/our-team\/?$/i, to: () => "/about" },
  { test: /^\/attorneys?\/?.*$/i, to: () => "/about" },
  { test: /^\/case-studies\/?.*$/i, to: () => "/results" },
  { test: /^\/testimonials\/?$/i, to: () => "/results" },
  { test: /^\/templates?\/?.*$/i, to: () => "/legal-tools" },
  { test: /^\/downloads?\/?.*$/i, to: () => "/legal-tools" },
  { test: /^\/tools\/?.*$/i, to: () => "/legal-tools" },
  { test: /^\/book\/?$/i, to: () => "/contact" },
  { test: /^\/consultation\/?$/i, to: () => "/contact" },
  { test: /^\/ochiel-mwendwa\/?.*$/i, to: () => "/" },
  { test: /^\/ochiel\/?.*$/i, to: () => "/" },
  { test: /^\/home\/?$/i, to: () => "/" },
  { test: /^\/index\.html$/i, to: () => "/" },
];

export const resolveLegacyPath = (pathname: string): string | null => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const rule of rules) {
    const match = clean.match(rule.test);
    if (match) {
      const target = rule.to(match);
      if (target !== clean) return target;
    }
  }
  return null;
};

const LegacyRedirect = ({ children }: { children: React.ReactNode }) => {
  const { pathname, search, hash } = useLocation();
  const target = resolveLegacyPath(pathname);

  useEffect(() => {
    if (target) {
      // Signal the permanent move to crawlers that execute JS.
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, follow";
      document.head.appendChild(meta);
      return () => {
        document.head.removeChild(meta);
      };
    }
  }, [target]);

  if (target) return <Navigate to={`${target}${search}${hash}`} replace />;
  return <>{children}</>;
};

export default LegacyRedirect;
