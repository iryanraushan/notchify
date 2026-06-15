import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "../src/components/ToastProvider";
import { useToast } from "../src/hooks/useToast";
import type { ToastMode, ToastTheme, ToastPosition } from "../src/types";

const VARIANTS = [
  { label: "Default", variant: "default" as const, message: "Profile updated successfully.", color: "#3b82f6" },
  { label: "Success", variant: "success" as const, message: "Payment processed — you're all set!", color: "#22c55e" },
  { label: "Destructive", variant: "destructive" as const, message: "Failed to save. Please try again.", color: "#ef4444" },
  { label: "Long · 6s", variant: "default" as const, message: "This notification stays for 6 seconds.", color: "#a855f7", duration: 6000 },
];

const DESKTOP_POSITIONS: ToastPosition[] = [
  "top-left", "top-center", "top-right",
  "bottom-left", "bottom-center", "bottom-right",
];

const MOBILE_POSITIONS: { label: string; value: ToastPosition }[] = [
  { label: "Top", value: "top-center" },
  { label: "Bottom", value: "bottom-center" },
];

const INSTALL_CMD = "npm i @iryanraushan/notchify";

function useIsMobile() {
  const [v, setV] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const h = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return v;
}

function ToastButtons({ isDark }: { isDark: boolean }) {
  const { toast } = useToast();
  const btnBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const btnHover = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)";

  return (
    <>
      {VARIANTS.map(({ label, variant, message, color, duration }) => (
        <button
          key={label}
          onClick={() => toast({ message, variant, duration })}
          onMouseEnter={(e) => (e.currentTarget.style.background = btnHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: `1.5px solid ${color}`,
            background: btnBg,
            color,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </button>
      ))}
    </>
  );
}

function PositionGrid({
  selected,
  onSelect,
  isDark,
}: {
  selected: ToastPosition;
  onSelect: (p: ToastPosition) => void;
  isDark: boolean;
}) {
  const activeBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const inactiveBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const activeBorder = isDark ? "#555" : "#999";
  const inactiveBorder = isDark ? "#2a2a2a" : "#ddd";
  const activeColor = isDark ? "#f5f5f5" : "#111";
  const inactiveColor = isDark ? "#666" : "#aaa";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6,
        width: "100%",
      }}
    >
      {DESKTOP_POSITIONS.map((p) => {
        const active = p === selected;
        return (
          <button
            key={p}
            onClick={() => onSelect(p)}
            style={{
              padding: "7px 4px",
              borderRadius: 8,
              border: `1.5px solid ${active ? activeBorder : inactiveBorder}`,
              background: active ? activeBg : inactiveBg,
              color: active ? activeColor : inactiveColor,
              fontSize: 11,
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              letterSpacing: "0.01em",
            }}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

function PositionToggle({
  selected,
  onSelect,
  isDark,
}: {
  selected: ToastPosition;
  onSelect: (p: ToastPosition) => void;
  isDark: boolean;
}) {
  const resolvedSelected = selected.startsWith("top") ? "top-center" : "bottom-center";

  return (
    <div
      style={{
        display: "flex",
        borderRadius: 10,
        overflow: "hidden",
        border: `1.5px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
        width: "100%",
      }}
    >
      {MOBILE_POSITIONS.map(({ label, value }) => {
        const active = resolvedSelected === value;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            style={{
              flex: 1,
              padding: "9px 0",
              border: "none",
              borderRight: value === "top-center" ? `1px solid ${isDark ? "#2a2a2a" : "#ddd"}` : "none",
              background: active
                ? isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"
                : "transparent",
              color: active
                ? isDark ? "#f5f5f5" : "#111"
                : isDark ? "#555" : "#aaa",
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ModeToggle({ mode, onChange, isDark }: { mode: ToastMode; onChange: (m: ToastMode) => void; isDark: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: 10,
        overflow: "hidden",
        border: `1.5px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
        width: "100%",
      }}
    >
      {(["dark", "light"] as ToastMode[]).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            style={{
              flex: 1,
              padding: "9px 0",
              border: "none",
              borderRight: m === "dark" ? `1px solid ${isDark ? "#2a2a2a" : "#ddd"}` : "none",
              background: active
                ? isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"
                : "transparent",
              color: active
                ? isDark ? "#f5f5f5" : "#111"
                : isDark ? "#555" : "#aaa",
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              textTransform: "capitalize",
            }}
          >
            {m === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        );
      })}
    </div>
  );
}

function VariantLegend({ isDark }: { isDark: boolean }) {
  const labelColor = isDark ? "#555" : "#bbb";
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {VARIANTS.map(({ label, color }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: labelColor }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function CopyButton({ text, isDark }: { text: string; isDark: boolean }) {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast({ message: "Command copied to clipboard!", variant: "success" });
    } catch {
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy install command"
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: isDark ? "#666" : "#999",
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
      }}
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}

function SectionLabel({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: isDark ? "#444" : "#bbb",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  );
}

function App() {
  const [mode, setMode] = React.useState<ToastMode>("dark");
  const [position, setPosition] = React.useState<ToastPosition>("bottom-right");
  const isMobile = useIsMobile();

  const isDark = mode === "dark";
  const pageBg = isDark ? "#0e0e0e" : "#f4f4f4";
  const cardBg = isDark ? "#161616" : "#ffffff";
  const cardBorder = isDark ? "#1f1f1f" : "#e8e8e8";
  const headingColor = isDark ? "#f5f5f5" : "#111";
  const subColor = isDark ? "#555" : "#aaa";
  const badgeBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const badgeBorder = isDark ? "#1f1f1f" : "#e8e8e8";
  const badgeColor = isDark ? "#888" : "#888";
  const codeBg = isDark ? "#0a0a0a" : "#f7f7f7";
  const codeColor = isDark ? "#a3a3a3" : "#555";

  const theme: ToastTheme = {};

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }

        @media (max-width: 768px) {
          .preview-layout { flex-direction: column !important; gap: 32px !important; }
          .preview-card   { width: 100% !important; max-width: 100% !important; }
          .controls-card  { width: 100% !important; }
          .badge-row      { flex-wrap: wrap !important; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: pageBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "48px 16px 64px" : "64px 24px",
          gap: isMobile ? 32 : 48,
          transition: "background 0.2s",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <h1
              style={{
                fontSize: isMobile ? 26 : 34,
                fontWeight: 700,
                color: headingColor,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              notchify
            </h1>
          </div>
          <p style={{ fontSize: isMobile ? 13 : 14, color: subColor, lineHeight: 1.6, marginBottom: 14 }}>
            toast notifications for React &amp; Next.js.
          </p>
        </div>

        <div
          className="preview-layout"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: isMobile ? 16 : 20,
            width: "100%",
            maxWidth: 900,
          }}
        >
          <ToastProvider mode={mode} theme={theme} position={position}>
            <div
              className="preview-card"
              style={{
                flex: isMobile ? "unset" : "1 1 0",
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 16,
                padding: isMobile ? "24px 16px" : "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  <ToastButtons isDark={isDark} />
                </div>
              </div>
              <VariantLegend isDark={isDark} />

              <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${cardBorder}` }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: codeBg,
                    border: `1px solid ${cardBorder}`,
                    borderRadius: 8,
                    padding: "8px 12px",
                  }}
                >
                  <code style={{ fontSize: 12, color: codeColor, fontFamily: "monospace" }}>
                    {INSTALL_CMD}
                  </code>
                  <CopyButton text={INSTALL_CMD} isDark={isDark} />
                </div>
              </div>
            </div>
          </ToastProvider>

          <div
            className="controls-card"
            style={{
              flex: isMobile ? "unset" : "0 0 350px",
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 16,
              padding: isMobile ? "24px 16px" : "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <SectionLabel isDark={isDark}>Mode</SectionLabel>
              <ModeToggle mode={mode} onChange={setMode} isDark={isDark} />
            </div>

            <div>
              <SectionLabel isDark={isDark}>Position{isMobile ? " (mobile)" : ""}</SectionLabel>
              {isMobile ? (
                <>
                  <PositionToggle selected={position} onSelect={setPosition} isDark={isDark} />
                  <p style={{ fontSize: 11, color: subColor, marginTop: 8 }}>
                    On mobile, left/right positions auto-center.
                  </p>
                </>
              ) : (
                <PositionGrid selected={position} onSelect={setPosition} isDark={isDark} />
              )}
            </div>
          </div>
        </div>

        {/* ── footer ── */}
        <p style={{ fontSize: 11, color: isDark ? "#333" : "#ccc", textAlign: "center" }}>
          notchify · MIT ·{" "}
          <a
            href="https://github.com/iryanraushan"
            style={{ color: isDark ? "#444" : "#bbb", textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            @iryanraushan
          </a>
        </p>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);