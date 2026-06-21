import { Github, Package } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/[0.08] bg-black/[0.08] backdrop-blur-xl mt-32"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display font-semibold">
              Notchify
            </span>
          </div>

          <p className="text-sm text-[#737373] max-w-md">
            Toast notifications done beautifully. Built by Raushan Kumar.
            MIT License.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/iryanraushan/notchify"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-github"
            className="glass-control flex items-center gap-2 px-4 h-9 rounded-md text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href="https://www.npmjs.com/package/@iryanraushan/notchify"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-npm"
            className="glass-control flex items-center gap-2 px-4 h-9 rounded-md text-sm"
          >
            <Package className="w-4 h-4" />
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
