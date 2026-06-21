import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useToast } from "@iryanraushan/notchify";
import { Check, Copy, Flame, Github, PackageCheck, Sparkles } from "lucide-react";

const INSTALL_COMMAND = "npm i @iryanraushan/notchify";

function HeroToast({ title, message, icon }) {
  return (
    <div className="glass-panel rounded-xl px-4 py-3 text-[#FAFAFA]">
      <div className="flex items-center gap-3">
        <div className="primary-gradient h-9 w-9 rounded-md text-black flex items-center justify-center">
          {icon}
        </div>

        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-[#B5B5B5]">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    toast({message: "Install command copied to clipboard.", variant: "success"})
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fireRandomToast = () => {
    const demos = [
      () => toast({ message: "New release v2.2 is live." }),
      () => toast.success("Profile updated successfully."),
      () => toast.error("Failed to delete file."),
      () => {
        const id = toast.loading("Deploying to production...");

        setTimeout(() => {
          toast.update(id, {
            variant: "success",
            message: "Deploy complete.",
            duration: 2800,
          });
        }, 1400);
      },
    ];

    demos[Math.floor(Math.random() * demos.length)]();
  };

  useEffect(() => {
    const t1 = setTimeout(() => {
      toast.custom(
        <HeroToast
          title="Welcome to Notchify"
          message="Custom toast with icons, glass, and motion."
          icon={<Sparkles className="w-4 h-4" />}
        />,
        { duration: 3600 }
      );
    }, 800);

    return () => {
      clearTimeout(t1);
    };
  }, []);

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] pt-28 pb-24 md:pt-32 md:pb-28 overflow-hidden flex items-center"
      data-testid="hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-ambient absolute top-10 left-1/2 -translate-x-1/2 w-[760px] h-[380px] rounded-full opacity-80" />
        <div className="absolute top-24 left-[18%] w-72 h-72 rounded-full bg-[#F59E0B]/[0.055] blur-[110px]" />
        <div className="absolute bottom-16 right-[14%] w-80 h-80 rounded-full bg-[#FB923C]/[0.045] blur-[120px]" />
        <span className="hero-particle top-[24%] left-[22%]" />
        <span className="hero-particle top-[36%] right-[24%] [animation-delay:1.8s]" />
        <span className="hero-particle bottom-[30%] left-[58%] [animation-delay:3.2s]" />
        <div className="absolute inset-0 bg-grid-dots opacity-60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-badge inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full"
          data-testid="hero-badge"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span className="text-xs font-mono text-[#B5B5B5] p-2">
            v2.2 — Now with custom toasts
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-tighter leading-[0.96] max-w-5xl mx-auto"
          data-testid="hero-headline"
        >
          Good apps deserve
          <span className="text-[#F59E0B] amber-text-glow italic font-normal">
            NOTCHYFY.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-base md:text-lg lg:text-xl text-[#B5B5B5] max-w-3xl mx-auto leading-relaxed"
          data-testid="hero-subhead"
        >
          Lightweight, customizable and accessible toast notifications for React
          and Next.js. Zero dependencies, fully typed, beautifully animated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={fireRandomToast}
            data-testid="hero-fire-toast"
            className="primary-gradient group inline-flex items-center gap-2 px-8 h-14 rounded-md text-black text-base font-semibold amber-glow"
          >
            Fire a toast
            <Flame className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          <a
            href="https://github.com/iryanraushan/notchify"
            target="_blank"
            rel="noreferrer"
            data-testid="hero-github"
            className="glass-control inline-flex items-center gap-2 px-8 h-14 rounded-md text-[#FAFAFA] text-base transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <div className="glass-command flex items-center rounded-md overflow-hidden">
            <div className="font-mono text-sm px-4 h-10 flex items-center gap-2 text-[#B5B5B5]"
            onClick={handleCopy}
            >
              <span className="text-[#F59E0B]">$</span>
              {INSTALL_COMMAND}
            </div>

            <button
              onClick={handleCopy}
              data-testid="hero-copy-install"
              aria-label="Copy install command"
              className="h-10 w-10 border-l border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center text-[#FAFAFA]"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
