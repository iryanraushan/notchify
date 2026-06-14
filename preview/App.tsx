import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ToastProvider } from "../src/components/ToastProvider";
import { useToast } from "../src/hooks/useToast";
import type { ToastMode, ToastTheme } from "../src/types";

const variants = [
  { label: "Default", variant: "default" as const, message: "This is a default notification." },
  { label: "Success", variant: "success" as const, message: "Changes saved successfully!" },
  { label: "Destructive", variant: "destructive" as const, message: "Something went wrong. Try again." },
  { label: "Long (6s)", variant: "default" as const, message: "This toast lasts 6 seconds.", duration: 6000 },
];

const dotAccent: Record<string, string> = {
  default: "#3b82f6",
  success: "#22c55e",
  destructive: "#ef4444",
  "Long (6s)": "#a855f7",
};

function Demo({ mode }: { mode: ToastMode }) {
  const { toast } = useToast();

  const isDark = mode === "dark";
  const textColor = isDark ? "#f5f5f5" : "#111111";
  const subColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const btnBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const btnHoverBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: textColor, marginBottom: 6, lineHeight: 1.2, textTransform: "uppercase" }}>
          notchify preview
        </h1>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {variants.map(({ label, variant, message, duration }) => (
          <button
            key={label}
            onClick={() => toast({ message, variant, duration })}
            style={{
              padding: "9px 20px",
              borderRadius: 10,
              border: `1px solid ${dotAccent[label] ?? dotAccent[variant]}`,
              background: btnBg,
              color: dotAccent[label] ?? dotAccent[variant],
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = btnHoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = React.useState<ToastMode>("dark");

  const customTheme: ToastTheme = {
    dotColors: { default: "#3b82f6", success: "#22c55e", destructive: "#ef4444" },
  };

  const isDark = mode === "dark";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: isDark ? "#111" : "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        transition: "background 0.2s, color 0.2s",
      }}
    >
      <ToastProvider mode={mode} theme={customTheme}>
        <Demo mode={mode} />
      </ToastProvider>

      <button
        onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        style={{
          padding: "8px 18px",
          borderRadius: 8,
          border: `1px solid ${isDark ? "#333" : "#ccc"}`,
          background: isDark ? "#1a1a1a" : "#ffffff",
          color: isDark ? "#f5f5f5" : "#111",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
