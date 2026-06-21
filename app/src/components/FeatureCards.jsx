import { motion } from "framer-motion";
import {
  Zap,
  Package,
  FileCode2,
  Accessibility,
  Smartphone,
  Palette,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightweight",
    desc: "Tiny footprint, zero overhead. Just React.",
    testId: "feature-lightweight",
  },
  {
    icon: Package,
    title: "Zero Dependencies",
    desc: "No extra packages. Only React as a peer.",
    testId: "feature-zero-deps",
  },
  {
    icon: FileCode2,
    title: "TypeScript First",
    desc: "Fully typed API. Every prop autocompletes.",
    testId: "feature-typescript",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    desc: "ARIA live regions. Respects reduced motion.",
    testId: "feature-accessible",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Auto-center on mobile, swipe to dismiss.",
    testId: "feature-mobile",
  },
  {
    icon: Palette,
    title: "Customizable",
    desc: "Themeable colors, borders, shadows, classes.",
    testId: "feature-customizable",
  },
];

export default function FeatureCards() {
  return (
    <section
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      data-testid="feature-cards"
    >
      <div className="text-center mb-14">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#F59E0B] mb-3">
          Why Notchify
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tighter">
          Built for serious developers.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;

          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.06 }}
              data-testid={f.testId}
              className="glass-card soft-reflection group p-6 rounded-xl relative overflow-hidden"
            >
              <div className="glass-control w-10 h-10 rounded-md flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-[18px] h-[18px] text-[#F59E0B]" />
              </div>

              <h3 className="font-display text-lg font-medium tracking-tight">
                {f.title}
              </h3>

              <p className="text-sm text-[#B5B5B5] mt-1.5 leading-relaxed">
                {f.desc}
              </p>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#F59E0B] blur-3xl opacity-0 group-hover:opacity-[0.07] transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
