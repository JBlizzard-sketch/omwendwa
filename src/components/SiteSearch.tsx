import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown, Clock, Scale, FileText, HelpCircle, ListChecks, Compass } from "lucide-react";
import { searchSite, type SearchGroup, type SearchItem } from "@/data/searchIndex";
import { cn } from "@/lib/utils";

const GROUP_ORDER: SearchGroup[] = ["Pages", "Practice Areas", "Insights", "FAQs", "Checklists"];

const GROUP_ICON: Record<SearchGroup, typeof Search> = {
  Pages: Compass,
  "Practice Areas": Scale,
  Insights: FileText,
  FAQs: HelpCircle,
  Checklists: ListChecks,
};

const SUGGESTIONS = ["Tax dispute", "Succession", "Employment", "Conveyancing", "Arbitration", "Land"];
const RECENT_KEY = "omw-recent-searches";

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SiteSearch = ({ open, onOpenChange }: SiteSearchProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored).slice(0, 5));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => searchSite(query), [query]);

  const grouped = useMemo(() => {
    const map = new Map<SearchGroup, SearchItem[]>();
    for (const item of results) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const);
  }, [results]);

  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  const rememberQuery = useCallback((value: string) => {
    if (!value.trim()) return;
    setRecent((prev) => {
      const next = [value.trim(), ...prev.filter((r) => r.toLowerCase() !== value.trim().toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const select = useCallback(
    (item: SearchItem) => {
      rememberQuery(query);
      onOpenChange(false);
      navigate(item.href);
    },
    [navigate, onOpenChange, query, rememberQuery],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (event.key === "Enter" && flat[active]) {
      event.preventDefault();
      select(flat[active]);
    } else if (event.key === "Escape") {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-plum/40 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-[0_40px_80px_-32px_hsl(336_38%_16%/0.35)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search practice areas, insights, FAQs, checklists…"
                aria-label="Search"
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close search"
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={listRef} className="max-h-[58vh] overflow-y-auto px-2 py-2">
              {!query && (
                <div className="px-3 py-4">
                  {recent.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Recent</p>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((r) => (
                          <button
                            key={r}
                            onClick={() => setQuery(r)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                          >
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Try searching</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && flat.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="font-heading text-lg">No matches for “{query}”</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a practice area, a statute, or{" "}
                    <button className="font-semibold text-primary underline" onClick={() => { onOpenChange(false); navigate("/contact"); }}>
                      talk to us directly
                    </button>
                    .
                  </p>
                </div>
              )}

              {query &&
                grouped.map(([group, items]) => {
                  const Icon = GROUP_ICON[group];
                  return (
                    <div key={group} className="mb-2">
                      <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{group}</p>
                      {items.map((item) => {
                        const index = flat.indexOf(item);
                        return (
                          <button
                            key={item.id}
                            data-index={index}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => select(item)}
                            className={cn(
                              "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              index === active ? "bg-secondary" : "hover:bg-muted",
                            )}
                          >
                            <span className="mt-0.5 rounded-lg bg-background p-1.5 text-primary shadow-sm">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-foreground">{item.title}</span>
                              {item.subtitle && (
                                <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
            </div>

            <div className="hidden items-center gap-4 border-t border-border bg-muted/60 px-4 py-2.5 text-[11px] text-muted-foreground sm:flex">
              <span className="flex items-center gap-1"><ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> open</span>
              <span>esc to close</span>
              <span className="ml-auto">{flat.length ? `${flat.length} result${flat.length === 1 ? "" : "s"}` : "O. Mwendwa & Company Advocates"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteSearch;
