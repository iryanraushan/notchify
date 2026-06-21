import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Code,
  BookOpen,
  Play,
  Hash,
} from "lucide-react";

const Ctx = createContext({
  open: () => {},
  close: () => {},
});

export const useCommandPalette = () => useContext(Ctx);

const ITEMS = [
  { group: "Pages", label: "Home", href: "/", icon: Hash, kw: "home landing hero" },
  { group: "Pages", label: "Playground", href: "/playground", icon: Play, kw: "playground sandbox editor" },
  { group: "Pages", label: "Docs", href: "/docs", icon: BookOpen, kw: "documentation api reference" },

  { group: "Docs", label: "Installation", href: "/docs#installation", icon: BookOpen, kw: "install npm yarn" },
  { group: "Docs", label: "Quick Start", href: "/docs#quick-start", icon: BookOpen, kw: "getting started" },
  { group: "Docs", label: "Variants", href: "/docs#variants", icon: BookOpen, kw: "default success error loading" },
  { group: "Docs", label: "Promise Toasts", href: "/docs#promise", icon: BookOpen, kw: "promise async" },
  { group: "Docs", label: "Update Toasts", href: "/docs#update", icon: BookOpen, kw: "update mutate" },
  { group: "Docs", label: "Dismiss Toasts", href: "/docs#dismiss", icon: BookOpen, kw: "dismiss remove" },
  { group: "Docs", label: "Action Buttons", href: "/docs#action", icon: BookOpen, kw: "action button undo" },
  { group: "Docs", label: "Custom Icons", href: "/docs#icons", icon: BookOpen, kw: "icon lucide svg emoji" },
  { group: "Docs", label: "Custom Toasts", href: "/docs#custom", icon: BookOpen, kw: "custom" },
  { group: "Docs", label: "Positioning", href: "/docs#position", icon: BookOpen, kw: "position top bottom" },
  { group: "Docs", label: "Themes", href: "/docs#themes", icon: BookOpen, kw: "theme dark light" },
  { group: "Docs", label: "Styling", href: "/docs#styling", icon: BookOpen, kw: "styling tailwind" },
  { group: "Docs", label: "Accessibility", href: "/docs#a11y", icon: BookOpen, kw: "accessible aria" },
  { group: "Docs", label: "API Reference", href: "/docs#api", icon: BookOpen, kw: "api reference props" },

  { group: "API", label: "toast()", href: "/docs#api", icon: Code, kw: "toast" },
  { group: "API", label: "toast.success()", href: "/docs#variants", icon: Code, kw: "success" },
  { group: "API", label: "toast.error()", href: "/docs#variants", icon: Code, kw: "error destructive" },
  { group: "API", label: "toast.loading()", href: "/docs#variants", icon: Code, kw: "loading" },
  { group: "API", label: "toast.promise()", href: "/docs#promise", icon: Code, kw: "promise" },
  { group: "API", label: "toast.update()", href: "/docs#update", icon: Code, kw: "update" },
  { group: "API", label: "toast.dismiss()", href: "/docs#dismiss", icon: Code, kw: "dismiss" },
  { group: "API", label: "toast.custom()", href: "/docs#custom", icon: Code, kw: "custom" },
];

export function CommandPaletteProvider({
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQ("");
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    if (!term) return ITEMS;

    return ITEMS.filter((it) =>
      (it.label + " " + it.kw + " " + it.group)
        .toLowerCase()
        .includes(term)
    );
  }, [q]);

  const grouped = useMemo(() => {
    const g = {};

    for (const it of filtered) {
      if (!g[it.group]) g[it.group] = [];
      g[it.group].push(it);
    }

    return g;
  }, [filtered]);

  const go = (href) => {
    close();

    if (href.startsWith("/docs#")) {
      const [path, hash] = href.split("#");

      navigate(path);

      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    } else {
      navigate(href);
    }
  };

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
          data-testid="command-palette"
        >
          <div
            className="command-overlay absolute inset-0"
            onClick={close}
          />

          <div className="command-panel relative w-full max-w-xl rounded-xl overflow-hidden">
            <div className="code-titlebar flex items-center gap-3 px-4 h-12">
              <Search className="w-4 h-4 text-[#737373]" />

              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search docs, playground, API…"
                data-testid="command-input"
                className="flex-1 bg-transparent outline-none text-sm text-[#FAFAFA] placeholder:text-[#737373] font-body"
              />

              <kbd className="font-mono text-[10px] text-[#737373] border border-white/10 bg-white/[0.03] rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {Object.keys(grouped).length === 0 && (
                <div className="text-center text-sm text-[#737373] py-12 font-mono">
                  No results.
                </div>
              )}

              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-2">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#737373] font-mono">
                    {group}
                  </div>

                  {items.map((it) => {
                    const Icon = it.icon;

                    return (
                      <button
                        key={it.label}
                        onClick={() => go(it.href)}
                        data-testid={`command-item-${it.label
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")}`}
                        className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-left transition-colors group hover:bg-[#F59E0B]/[0.075] hover:shadow-[inset_0_0_0_1px_rgba(245,158,11,0.16)]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#737373] group-hover:text-[#F59E0B]" />

                          <span className="text-sm text-[#FAFAFA]">
                            {it.label}
                          </span>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-[#737373] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
