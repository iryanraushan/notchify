import { Link, useLocation } from "react-router-dom";
import { Search, Github } from "lucide-react";
import { useCommandPalette } from "@/components/CommandPalette";

export default function Navbar() {
  const { open } = useCommandPalette();
  const loc = useLocation();

  const linkCls = (path) =>
    `text-sm transition-colors ${
      loc.pathname === path
        ? "text-[#FAFAFA]"
        : "text-[#B5B5B5] hover:text-[#FAFAFA]"
    }`;

  return (
    <header
      className="glass-nav fixed top-0 inset-x-0 z-50"
      data-testid="navbar"
    >
      <nav className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-testid="navbar-logo"
        >
          <span className="font-display font-semibold text-lg tracking-tight text-[#F59E0B]">
            Notchify
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/playground"
            className={linkCls("/playground")}
            data-testid="nav-playground"
          >
            Playground
          </Link>

          <Link to="/docs" className={linkCls("/docs")} data-testid="nav-docs">
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            data-testid="navbar-search-button"
            className="glass-control group flex items-center gap-2 px-3 h-10 rounded-md transition-colors"
          >
            <Search className="w-4 h-4 text-[#737373]" />

            <span className="hidden sm:inline text-sm text-[#737373]">
              Search…
            </span>

            <kbd className="hidden sm:inline-flex font-mono text-[10px] text-[#737373] border border-white/10 bg-white/[0.03] rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/iryanraushan/notchify"
            target="_blank"
            rel="noreferrer"
            data-testid="navbar-github"
            className="glass-control w-10 h-10 inline-flex items-center justify-center rounded-md transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 text-[#FAFAFA]" />
          </a>
        </div>
      </nav>
    </header>
  );
}
