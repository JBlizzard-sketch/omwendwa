import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface SiteSearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openSearch: () => void;
}

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export const SiteSearchProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, setOpen, openSearch }), [open, openSearch]);

  return <SiteSearchContext.Provider value={value}>{children}</SiteSearchContext.Provider>;
};

export const useSiteSearch = () => {
  const ctx = useContext(SiteSearchContext);
  if (!ctx) throw new Error("useSiteSearch must be used within SiteSearchProvider");
  return ctx;
};
