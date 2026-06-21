import { useState, useMemo } from "react";
import { useToast } from "@iryanraushan/notchify";
import { Sparkles, Copy, Check } from "lucide-react";
import { useAppToastSettings } from "@/components/AppToastSettings";
import CodeBlock from "@/components/CodeBlock";

const PANEL = "glass-panel rounded-xl";

const LABEL =
  "font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2 block";

const INPUT =
  "glass-input w-full px-3 h-9 rounded-md border outline-none text-sm text-[#FAFAFA] font-body";

const VARIANTS = ["default", "success", "destructive", "loading"];

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const ICON_OPTIONS = ["none", "🎉", "⚡", "🔥", "✨"];

const THEME_PRESETS = {
  dark: {
    background: "#0A0A0A",
    borderColor: "#2A2A2A",
    textColor: "#FAFAFA",
  },
  light: {
    background: "#FFFFFF",
    borderColor: "#E5E5E5",
    textColor: "#111111",
  },
};

const COLOR_KEYWORDS = {
  black: "#000000",
  white: "#ffffff",
  transparent: "transparent",
  current: "currentColor",
};

const TAILWIND_COLORS = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
};

const FONT_SIZES = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
};

const RADII = {
  none: "0px",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

const BORDER_WIDTHS = {
  0: "0px",
  2: "2px",
  4: "4px",
  8: "8px",
};

function hexToRgb(value) {
  const clean = value.replace("#", "");
  const hex =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean.slice(0, 6);

  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function withOpacity(value, opacity) {
  if (!opacity || value === "transparent" || value === "currentColor") {
    return value;
  }

  const alpha = Number(opacity);
  if (Number.isNaN(alpha)) return value;

  const rgb = value.startsWith("#") ? hexToRgb(value) : null;
  if (!rgb) return value;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha > 1 ? alpha / 100 : alpha})`;
}

function isColorValue(value) {
  return (
    value.startsWith("#") ||
    /^(rgb|hsl|hwb|lab|lch|oklch|color|var)\(/i.test(value) ||
    COLOR_KEYWORDS[value] ||
    (typeof CSS !== "undefined" && CSS.supports("color", value))
  );
}

function resolveColor(value) {
  const [rawBase, opacity] = value.split("/");
  const base = rawBase.trim();

  if (base.startsWith("[") && base.endsWith("]")) {
    const raw = base.slice(1, -1).replace(/_/g, " ");
    return isColorValue(raw) ? withOpacity(raw, opacity) : null;
  }

  if (COLOR_KEYWORDS[base]) {
    return withOpacity(COLOR_KEYWORDS[base], opacity);
  }

  const parts = base.split("-");
  const shade = parts.pop();
  const family = parts.join("-");
  const color = TAILWIND_COLORS[family]?.[shade];

  return color ? withOpacity(color, opacity) : null;
}

function styleFromClassName(value = "") {
  const next = {};

  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .forEach((token) => {
      if (token.includes(":")) return;

      if (token === "border") {
        next.borderWidth = "1px";
        return;
      }

      if (token.startsWith("border-")) {
        const suffix = token.slice(7);

        if (BORDER_WIDTHS[suffix]) {
          next.borderWidth = BORDER_WIDTHS[suffix];
          return;
        }

        const color = resolveColor(suffix);
        if (color) next.borderColor = color;
        return;
      }

      if (token.startsWith("bg-")) {
        const color = resolveColor(token.slice(3));
        if (color) next.backgroundColor = color;
        return;
      }

      if (token === "rounded") {
        next.borderRadius = "0.25rem";
        return;
      }

      if (token.startsWith("rounded-")) {
        const suffix = token.slice(8);

        if (suffix.startsWith("[") && suffix.endsWith("]")) {
          next.borderRadius = suffix.slice(1, -1).replace(/_/g, " ");
          return;
        }

        if (RADII[suffix]) next.borderRadius = RADII[suffix];
        return;
      }

      if (token.startsWith("text-")) {
        const suffix = token.slice(5);

        if (suffix.startsWith("[") && suffix.endsWith("]")) {
          const raw = suffix.slice(1, -1).replace(/_/g, " ");

          if (isColorValue(raw)) {
            next.color = raw;
          } else {
            next.fontSize = raw;
          }

          return;
        }

        if (FONT_SIZES[suffix]) {
          next.fontSize = FONT_SIZES[suffix];
          return;
        }

        const color = resolveColor(suffix);
        if (color) next.color = color;
      }
    });

  return next;
}

function getFloatingCloseButtonStyle(corner, size, offset) {
  const x = corner === "right" ? offset : -offset;

  return {
    left: corner === "right" ? "auto" : 0,
    right: corner === "right" ? 0 : "auto",
    width: size,
    height: size,
    transform: `translate(${x}%, -${offset}%)`,
  };
}

export default function PlaygroundCore({ compact = false }) {
  const { toast } = useToast();
  const {
    mode,
    setMode,
    position,
    setPosition,
    background,
    setBackground,
    borderColor,
    setBorderColor,
    textColor,
    setTextColor,
    borderRadius,
    setBorderRadius,
    textSize,
    setTextSize,
  } = useAppToastSettings();

  const [message, setMessage] = useState("Profile updated successfully.");

  const [variant, setVariant] = useState("success");

  const [duration, setDuration] = useState(3500);

  const [iconOpt, setIconOpt] = useState("none");

  const [closeCorner, setCloseCorner] = useState("left");

  const [closeButtonSize, setCloseButtonSize] = useState(16);

  const [closeButtonOffset, setCloseButtonOffset] = useState(50);

  const [actionEnabled, setActionEnabled] = useState(false);

  const [actionLabel, setActionLabel] = useState("Undo");

  const [className, setClassName] = useState("");

  const applyTheme = (nextMode) => {
    const preset = THEME_PRESETS[nextMode];

    setMode(nextMode);
    setBackground(preset.background);
    setBorderColor(preset.borderColor);
    setTextColor(preset.textColor);
  };

  const generated = useMemo(() => {
    const opts = [];

    opts.push(`  message: '${message.replace(/'/g, "\\'")}'`);

    if (variant !== "default") {
      opts.push(`  variant: '${variant}'`);
    }

    if (duration !== 3500) {
      opts.push(`  duration: ${duration}`);
    }

    if (iconOpt !== "none") {
      opts.push(`  icon: <span>${iconOpt}</span>`);
    }

    if (
      iconOpt !== "none" &&
      (closeCorner !== "left" ||
        closeButtonSize !== 16 ||
        closeButtonOffset !== 50)
    ) {
      const x =
        closeCorner === "right" ? closeButtonOffset : -closeButtonOffset;

      opts.push(`  closeButtonStyle: {
    left: ${closeCorner === "right" ? "'auto'" : "0"},
    right: ${closeCorner === "right" ? "0" : "'auto'"},
    width: ${closeButtonSize},
    height: ${closeButtonSize},
    transform: 'translate(${x}%, -${closeButtonOffset}%)',
  }`);
    }

    if (actionEnabled) {
      opts.push(
        `  action: { label: '${actionLabel.replace(/'/g, "\\'")}', onClick: async () => {} }`,
      );
    }

    if (className) {
      opts.push(`  className: '${className}'`);
    }

    const provider = `<ToastProvider
  mode="${mode}"
  position="${position}"
  theme={{
    background: '${background}',
    border: '${borderColor}',
    textColor: '${textColor}',
    borderRadius: ${borderRadius},
    textSize: ${textSize},
  }}
>`;

    return `${provider}

toast({
${opts.join(",\n")}
});`;
  }, [
    message,
    variant,
    duration,
    position,
    iconOpt,
    closeCorner,
    closeButtonSize,
    closeButtonOffset,
    actionEnabled,
    actionLabel,
    mode,
    background,
    borderColor,
    textColor,
    borderRadius,
    textSize,
    className,
  ]);

  const fire = () => {
    const opts = {
      message,
      variant,
      duration,
    };

    if (iconOpt !== "none") {
      opts.icon = <span>{iconOpt}</span>;

      if (
        closeCorner !== "left" ||
        closeButtonSize !== 16 ||
        closeButtonOffset !== 50
      ) {
        opts.closeButtonStyle = getFloatingCloseButtonStyle(
          closeCorner,
          closeButtonSize,
          closeButtonOffset,
        );
      }
    }

    if (actionEnabled) {
      opts.action = {
        label: actionLabel.trim() || "Action",
        onClick: async () => {
          await new Promise((r) => setTimeout(r, 800));
        },
      };
    }

    if (className) {
      opts.className = className;

      const classStyle = styleFromClassName(className);

      if (Object.keys(classStyle).length > 0) {
        opts.style = classStyle;
      }
    }

    toast(opts);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div
      className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] w-full"
      data-testid="playground-core"
    >
      <div
        className={`${PANEL} p-5`}
        data-testid="playground-config"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#F59E0B] mb-4">
          Config
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className={LABEL}>Message</label>

              <input
                className={INPUT}
                data-testid="pg-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div>
              <label className={LABEL}>Variant</label>

              <div className="grid grid-cols-2 gap-1.5">
                {VARIANTS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    data-testid={`pg-variant-${v}`}
                    className={`h-8 rounded-md text-xs font-body font-medium transition-colors ${
                      variant === v
                        ? "glass-control glass-control-active text-[#F59E0B]"
                        : "glass-control text-[#B5B5B5]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={LABEL}>Position</label>

              <div className="grid grid-cols-3 gap-1.5">
                {POSITIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    data-testid={`pg-position-${p}`}
                    className={`h-7 rounded text-[10px] font-body font-medium transition-colors ${
                      position === p
                        ? "glass-control glass-control-active text-[#F59E0B]"
                        : "glass-control text-[#737373] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {p.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={LABEL}>Custom icon</label>

              <div className="flex gap-1.5 flex-wrap">
                {ICON_OPTIONS.map((i) => (
                  <button
                    key={i}
                    onClick={() => setIconOpt(i)}
                    data-testid={`pg-icon-${i}`}
                    className={`h-8 w-8 rounded-md text-sm font-body transition-colors ${
                      iconOpt === i
                        ? "glass-control glass-control-active text-[#F59E0B]"
                        : "glass-control"
                    }`}
                  >
                    {i === "none" ? "∅" : i}
                  </button>
                ))}
              </div>

              {iconOpt !== "none" && (
                <div className="glass-panel mt-3 rounded-md p-3 space-y-3">
                  <div>
                    <label className={LABEL}>Close corner</label>

                    <div className="grid grid-cols-2 gap-1.5">
                      {["left", "right"].map((corner) => (
                        <button
                          key={corner}
                          type="button"
                          onClick={() => setCloseCorner(corner)}
                          data-testid={`pg-close-corner-${corner}`}
                          className={`h-8 rounded-md text-xs font-body font-medium transition-colors ${
                            closeCorner === corner
                              ? "glass-control glass-control-active text-[#F59E0B]"
                              : "glass-control text-[#B5B5B5]"
                          }`}
                        >
                          {corner}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>
                      Close size:{" "}
                      <span className="text-[#FAFAFA]">{closeButtonSize}px</span>
                    </label>

                    <input
                      type="range"
                      min={12}
                      max={28}
                      step={1}
                      value={closeButtonSize}
                      onChange={(e) => setCloseButtonSize(Number(e.target.value))}
                      data-testid="pg-close-size"
                      className="w-full accent-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className={LABEL}>
                      Float:{" "}
                      <span className="text-[#FAFAFA]">{closeButtonOffset}%</span>
                    </label>

                    <input
                      type="range"
                      min={25}
                      max={75}
                      step={5}
                      value={closeButtonOffset}
                      onChange={(e) =>
                        setCloseButtonOffset(Number(e.target.value))
                      }
                      data-testid="pg-close-offset"
                      className="w-full accent-[#F59E0B]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={LABEL}>Theme</label>

              <div className="flex gap-1.5">
                {["dark", "light"].map((t) => (
                  <button
                    key={t}
                    onClick={() => applyTheme(t)}
                    data-testid={`pg-theme-${t}`}
                    className={`flex-1 h-8 rounded-md text-xs font-body font-medium transition-colors ${
                      mode === t
                        ? "glass-control glass-control-active text-[#F59E0B]"
                        : "glass-control text-[#B5B5B5]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={LABEL}>
                Duration: <span className="text-[#FAFAFA]">{duration}ms</span>
              </label>

              <input
                type="range"
                min={1000}
                max={8000}
                step={250}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                data-testid="pg-duration"
                className="w-full accent-[#F59E0B]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label className={`${LABEL} mb-0`}>Action button</label>

                <button
                  type="button"
                  role="switch"
                  aria-checked={actionEnabled}
                  onClick={() => setActionEnabled((value) => !value)}
                  data-testid="pg-action-toggle"
                  className={`relative h-7 w-12 rounded-full border transition-colors ${
                    actionEnabled
                      ? "border-[#F59E0B]/70 bg-[#F59E0B]/20 shadow-[0_0_24px_-14px_rgba(245,158,11,0.9)]"
                      : "glass-control"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1 h-5 w-5 rounded-full transition-transform ${
                      actionEnabled
                        ? "translate-x-5 bg-[#F59E0B]"
                        : "translate-x-1 bg-[#737373]"
                    }`}
                  />
                </button>
              </div>

              {actionEnabled && (
                <div className="mt-3">
                  <label className={LABEL}>Action text</label>

                  <input
                    className={INPUT}
                    placeholder="e.g. Undo"
                    value={actionLabel}
                    onChange={(e) => setActionLabel(e.target.value)}
                    data-testid="pg-action"
                  />
                </div>
              )}
            </div>

            <div>
              <label className={LABEL}>Appearance</label>

              <div className="grid grid-cols-3 gap-2">
                <label className="text-[10px] text-[#737373]">
                  Background
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    data-testid="pg-bg-color"
                    className="glass-input mt-1 h-8 w-full rounded-md border p-1"
                  />
                </label>

                <label className="text-[10px] text-[#737373]">
                  Border
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    data-testid="pg-border-color"
                    className="glass-input mt-1 h-8 w-full rounded-md border p-1"
                  />
                </label>

                <label className="text-[10px] text-[#737373]">
                  Text
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    data-testid="pg-text-color"
                    className="glass-input mt-1 h-8 w-full rounded-md border p-1"
                  />
                </label>
              </div>

              <label className={`${LABEL} mt-3`}>
                Border radius:{" "}
                <span className="text-[#FAFAFA]">{borderRadius}px</span>
              </label>

              <input
                type="range"
                min={0}
                max={32}
                step={1}
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                data-testid="pg-border-radius"
                className="w-full accent-[#F59E0B]"
              />

              <label className={`${LABEL} mt-3`}>
                Text size: <span className="text-[#FAFAFA]">{textSize}px</span>
              </label>

              <input
                type="range"
                min={12}
                max={22}
                step={1}
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                data-testid="pg-text-size"
                className="w-full accent-[#F59E0B]"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={LABEL}>className</label>

            <input
              className={INPUT}
              placeholder="bg-zinc-950 border-amber-500 rounded-xl text-white text-sm"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              data-testid="pg-classname"
            />
          </div>
        </div>
      </div>

      <div className="grid min-w-0 grid-rows-[minmax(260px,0.8fr)_auto] gap-6">
        {/* PREVIEW */}
        <div
          className={`${PANEL} soft-reflection p-5 flex flex-col items-center justify-center relative overflow-hidden w-full min-h-[260px]`}
          data-testid="playground-preview"
        >
          <div className="relative text-center">
            <button
              onClick={fire}
              data-testid="pg-fire"
              className="primary-gradient group px-8 h-14 rounded-md text-black font-body font-semibold amber-glow inline-flex items-center gap-2 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Trigger Toast
            </button>
          </div>
        </div>

        {/* CODE */}
        <div className="relative min-w-0" data-testid="playground-code">
          <CodeBlock testId="pg-code" code={generated} />

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(generated);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
            data-testid="pg-copy"
            className="absolute -top-1 right-2 translate-y-[60%] hidden"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
