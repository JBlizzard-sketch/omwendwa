import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { verifyLiveTokens } from "@/lib/designTokens";
import { monitoringEnabled, recentErrors } from "@/lib/sentry";

const ROUTES = [
  "/",
  "/about",
  "/practice-areas",
  "/results",
  "/insights",
  "/insights/category/legal-guides",
  "/legal-tools",
  "/consultation",
  "/contact",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
];

interface Check {
  path: string;
  status: number | string;
  ok: boolean;
}

const Diagnostics = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [running, setRunning] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const run = async () => {
    setRunning(true);
    const results: Check[] = [];
    for (const path of ROUTES) {
      try {
        const res = await fetch(path, { method: "GET", cache: "no-store" });
        results.push({ path, status: res.status, ok: res.ok });
      } catch (error) {
        results.push({ path, status: String(error), ok: false });
      }
    }
    setChecks(results);
    setRunning(false);
  };

  useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tokens = typeof window !== "undefined" ? verifyLiveTokens() : [];
  const errors = recentErrors();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SEOHead
        title="Site diagnostics"
        description="Internal build, domain and route health checks for O. Mwendwa & Company Advocates."
      />
      <h1 className="font-heading text-4xl mb-2">Site diagnostics</h1>
      <p className="text-muted-foreground mb-8">
        Live checks for the build, the domain serving this page and every key route.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Build &amp; domain</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Serving host:</strong> {host || "—"}</p>
            <p><strong>Expected domain:</strong> omwendwa.com</p>
            <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
            <p><strong>Built:</strong> {__BUILD_TIME__}</p>
            <p>
              <strong>Error monitoring:</strong>{" "}
              {monitoringEnabled() ? "Sentry active" : "Local capture only (set VITE_SENTRY_DSN)"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Theme tokens</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm">
            {tokens.map((t) => (
              <p key={t.name} className="flex items-center justify-between gap-3">
                <span>{t.name}</span>
                <Badge variant={t.ok ? "secondary" : "destructive"}>{t.ok ? "locked" : t.actual || "missing"}</Badge>
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Route checks</CardTitle>
          <Button size="sm" onClick={run} disabled={running}>
            {running ? "Checking…" : "Re-run"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {checks.map((c) => (
            <p key={c.path} className="flex items-center justify-between gap-3">
              <span className="font-mono">{c.path}</span>
              <Badge variant={c.ok ? "secondary" : "destructive"}>{c.status}</Badge>
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>Recent client errors</CardTitle></CardHeader>
        <CardContent className="text-sm">
          {errors.length === 0 ? (
            <p className="text-muted-foreground">No client-side errors captured in this session.</p>
          ) : (
            errors.map((e) => (
              <p key={`${e.at}-${e.message}`} className="border-b border-border py-2">
                <span className="font-mono text-xs text-muted-foreground">{e.at} · {e.source}</span>
                <br />
                {e.message}
              </p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Diagnostics;
