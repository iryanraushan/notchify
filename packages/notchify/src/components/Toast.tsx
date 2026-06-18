import * as React from "react";
import { ToastVariant, ToastTheme, ToastMode, ToastPosition } from "../types";
import { ToastContext } from "./ToastProvider";

const defaultDotColors: Record<ToastVariant, string> = {
  default: "#3b82f6",
  destructive: "#ef4444",
  success: "#22c55e",
};

const defaultDark: Required<Omit<ToastTheme, "dotColors">> = {
  background: "#0c0b0b",
  border: "#1a1a1a",
  textColor: "#f5f5f5",
  boxShadow: "0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.14)",
  defaultDuration: 3000,
};

const defaultLight: Required<Omit<ToastTheme, "dotColors">> = {
  background: "#ffffff",
  border: "#e5e5e5",
  textColor: "#111111",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
  defaultDuration: 3000,
};

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function getViewportStyle(position: ToastPosition, isMobile: boolean): React.CSSProperties {
  const isTop = position.startsWith("top");

  if (isMobile) {
    return {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      ...(isTop ? { top: 16 } : { bottom: 24 }),
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "calc(100vw - 32px)",
      maxWidth: 420,
      padding: 0,
      pointerEvents: "none",
    };
  }

  const base: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 420,
    width: "calc(100vw - 32px)",
    padding: 0,
    pointerEvents: "none",
  };

  switch (position) {
    case "top-left": return { ...base, top: 16, left: 16 };
    case "top-center": return { ...base, top: 16, left: "50%", transform: "translateX(-50%)" };
    case "top-right": return { ...base, top: 16, right: 16 };
    case "bottom-left": return { ...base, bottom: 16, left: 16 };
    case "bottom-center": return { ...base, bottom: 16, left: "50%", transform: "translateX(-50%)" };
    case "bottom-right": return { ...base, bottom: 16, right: 16 };
  }
}

const animationStyle = `
@keyframes toast-slide-in-right { from { transform: translateX(calc(100% + 16px)); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toast-slide-in-left  { from { transform: translateX(calc(-100% - 16px)); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toast-slide-in-up    { from { transform: translateY(calc(100% + 8px)); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes toast-slide-in-down  { from { transform: translateY(calc(-100% - 8px)); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes toast-fade-out       { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
[data-state="open"][data-pos="top-left"]     { animation: toast-slide-in-left  180ms ease-out; }
[data-state="open"][data-pos="top-center"]   { animation: toast-slide-in-down  180ms ease-out; }
[data-state="open"][data-pos="top-right"]    { animation: toast-slide-in-right 180ms ease-out; }
[data-state="open"][data-pos="bottom-left"]  { animation: toast-slide-in-left  180ms ease-out; }
[data-state="open"][data-pos="bottom-center"]{ animation: toast-slide-in-up    180ms ease-out; }
[data-state="open"][data-pos="bottom-right"] { animation: toast-slide-in-right 180ms ease-out; }
[data-state="closed"] { animation: toast-fade-out 150ms ease-in forwards; }
`;

let styleInjected = false;
function injectAnimations() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = animationStyle;
  document.head.appendChild(el);
  styleInjected = true;
}

const CloseIcon = ({ color }: { color: string }) => (
  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <line x1="1" y1="1" x2="9" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="1" x2="1" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ToastProps {
  variant?: ToastVariant;
  duration?: number;
  message: string;
  onDismiss?: () => void;
  theme?: ToastTheme;
  mode?: ToastMode;
  style?: React.CSSProperties;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = "default", duration = 3000, message, onDismiss, style, theme, mode }, ref) => {
    const ctx = React.useContext(ToastContext);
    const resolvedMode = mode ?? ctx?.mode ?? "dark";
    const resolvedTheme = theme ?? ctx?.theme ?? {};
    const position = ctx?.position ?? "bottom-right";
    const isMobile = useIsMobile();
    const resolvedPosition: ToastPosition = isMobile
      ? position.startsWith("top") ? "top-center" : "bottom-center"
      : position;

    const [state, setState] = React.useState<"open" | "closed">("open");

    React.useEffect(() => { injectAnimations(); }, []);

    React.useEffect(() => {
      const dismiss = setTimeout(() => setState("closed"), duration);
      return () => clearTimeout(dismiss);
    }, [duration]);

    React.useEffect(() => {
      if (state !== "closed") return;
      const remove = setTimeout(() => onDismiss?.(), 150);
      return () => clearTimeout(remove);
    }, [state, onDismiss]);

    const base = resolvedMode === "light" ? defaultLight : defaultDark;
    const dotColor = resolvedTheme.dotColors?.[variant] ?? defaultDotColors[variant];
    const bg = resolvedTheme.background ?? base.background;
    const border = resolvedTheme.border ?? base.border;
    const textColor = resolvedTheme.textColor ?? base.textColor;
    const shadow = resolvedTheme.boxShadow ?? base.boxShadow;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-state={state}
        data-pos={resolvedPosition}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderRadius: 12,
          border: `1px solid ${border}`,
          background: bg,
          boxShadow: shadow,
          pointerEvents: "auto",
          fontSize: 14,
          color: textColor,
          lineHeight: 1.5,
          ...style,
        }}
      >
        <button
          aria-label="Dismiss"
          onClick={() => setState("closed")}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: dotColor,
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <CloseIcon color="#ffffff" />
        </button>
        <span style={{ flex: 1, color: textColor, fontSize: 14 }}>{message}</span>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const ctx = React.useContext(ToastContext);
    const position = ctx?.position ?? "bottom-right";
    const isMobile = useIsMobile();
    const resolvedPosition: ToastPosition = isMobile
      ? position.startsWith("top") ? "top-center" : "bottom-center"
      : position;

    return (
      <div
        ref={ref}
        style={{ ...getViewportStyle(resolvedPosition, isMobile), ...style }}
        {...props}
      />
    );
  }
);
ToastViewport.displayName = "ToastViewport";
