import { Github, Package, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/[0.08] bg-black/[0.08] backdrop-blur-xl mt-32"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-semibold">Notchify</span>
            </div>
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

        {/* Divider */}
        <div className="h-px my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-[#737373]">
          <span>&copy; {year} Notchify. All rights reserved.</span>

          <a
            href="https://github.com/iryanraushan"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-credit"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            Made with
            <Heart
              className="w-3.5 h-3.5 text-red-500 fill-red-500"
              aria-label="love"
            />
            by Raushan Kumar
          </a>
        </div>
      </div>
    </footer>
  );
}