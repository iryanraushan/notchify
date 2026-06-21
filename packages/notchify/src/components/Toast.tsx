import * as React from "react";
import { ToastVariant, ToastTheme, ToastMode, ToastPosition, ToastAction } from "../types";
import { ToastContext } from "./ToastProvider";

// ─── Theme defaults ───────────────────────────────────────────────────────────

const defaultDotColors: Record<ToastVariant, string> = {
  default: "#3b82f6",
  destructive: "#ef4444",
  success: "#22c55e",
  loading: "#a855f7",
};

const defaultDark: Required<Omit<ToastTheme, "dotColors">> = {
  background: "#0c0b0b",
  border: "#1a1a1a",
  textColor: "#f5f5f5",
  borderRadius: 12,
  textSize: 14,
  boxShadow: "0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.14)",
  defaultDuration: 3000,
};

const defaultLight: Required<Omit<ToastTheme, "dotColors">> = {
  background: "#ffffff",
  border: "#e5e5e5",
  textColor: "#111111",
  borderRadius: 12,
  textSize: 14,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
  defaultDuration: 3000,
};

// ─── Animations ───────────────────────────────────────────────────────────────

const animationStyle = `
@keyframes toast-slide-in-right  { from { transform: translateX(calc(100% + 16px)); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toast-slide-in-left   { from { transform: translateX(calc(-100% - 16px)); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toast-slide-in-up     { from { transform: translateY(calc(100% + 8px)); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes toast-slide-in-down   { from { transform: translateY(calc(-100% - 8px)); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes toast-fade-out        { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
@keyframes toast-spin            { to { transform: rotate(360deg); } }
:where([data-notchify-toast="true"]) {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid var(--notchify-border);
  border-radius: var(--notchify-radius);
  background: var(--notchify-bg);
  box-shadow: var(--notchify-shadow);
  color: var(--notchify-text);
  font-size: var(--notchify-text-size);
  line-height: 1.5;
  pointer-events: auto;
  overflow: visible;
  transition: transform 0.15s, opacity 0.15s;
}
:where([data-notchify-toast="true"][data-notchify-has-icon="true"]) {
  padding: 13px 16px 13px 14px;
}
:where([data-notchify-close]) {
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  border: 0;
  border-radius: 9999px;
  background: var(--notchify-dot);
  cursor: pointer;
  pointer-events: auto;
  color: #ffffff;
  flex-shrink: 0;
}
:where([data-notchify-close="inline"]) {
  position: static;
}
:where([data-notchify-close="floating"]) {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--notchify-close-size);
  height: var(--notchify-close-size);
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 0 2px var(--notchify-bg), 0 4px 12px rgba(0, 0, 0, 0.28);
}
:where([data-notchify-icon="true"]) {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
:where([data-notchify-message="true"]) {
  flex: 1;
  color: inherit;
  font-size: inherit;
}
[data-state="open"][data-pos="top-left"]      { animation: toast-slide-in-left  180ms ease-out; }
[data-state="open"][data-pos="top-center"]    { animation: toast-slide-in-down  180ms ease-out; }
[data-state="open"][data-pos="top-right"]     { animation: toast-slide-in-right 180ms ease-out; }
[data-state="open"][data-pos="bottom-left"]   { animation: toast-slide-in-left  180ms ease-out; }
[data-state="open"][data-pos="bottom-center"] { animation: toast-slide-in-up    180ms ease-out; }
[data-state="open"][data-pos="bottom-right"]  { animation: toast-slide-in-right 180ms ease-out; }
[data-state="closed"] { animation: toast-fade-out 150ms ease-in forwards; }
@media (prefers-reduced-motion: reduce) {
  [data-state="open"], [data-state="closed"] { animation: none !important; }
}
`;

let styleInjected = false;
function injectAnimations() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = animationStyle;
  document.head.appendChild(el);
  styleInjected = true;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── Viewport positioning ─────────────────────────────────────────────────────

function getViewportStyle(position: ToastPosition, isMobile: boolean): React.CSSProperties {
  const isTop = position.startsWith("top");
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

  if (isMobile) {
    return { ...base, left: "50%", transform: "translateX(-50%)", ...(isTop ? { top: 16 } : { bottom: 24 }) };
  }

  switch (position) {
    case "top-left":      return { ...base, top: 16, left: 16 };
    case "top-center":    return { ...base, top: 16, left: "50%", transform: "translateX(-50%)" };
    case "top-right":     return { ...base, top: 16, right: 16 };
    case "bottom-left":   return { ...base, bottom: 16, left: 16 };
    case "bottom-center": return { ...base, bottom: 16, left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":  return { ...base, bottom: 16, right: 16 };
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon = ({ color }: { color: string }) => (
  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <line x1="1" y1="1" x2="9" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="1" x2="1" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SpinnerIcon = ({ color }: { color: string }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
    style={{ animation: "toast-spin 0.75s linear infinite" }}
  >
    <circle cx="5" cy="5" r="4" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M5 1 A4 4 0 0 1 9 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function cssValue(value: string | number) {
  return typeof value === "number" ? `${value}px` : value;
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionButton({ action, textColor }: { action: ToastAction; textColor: string }) {
  const [pending, setPending] = React.useState(false);

  const handleClick = async () => {
    const result = action.onClick();
    if (result instanceof Promise) {
      setPending(true);
      try { await result; } finally { setPending(false); }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-label={typeof action.label === "string" ? action.label : "Action"}
      style={{
        marginLeft: 8,
        padding: "3px 10px",
        borderRadius: 6,
        border: `1px solid ${textColor}33`,
        background: "transparent",
        color: textColor,
        fontSize: 12,
        fontWeight: 600,
        cursor: pending ? "wait" : "pointer",
        opacity: pending ? 0.6 : 1,
        flexShrink: 0,
        pointerEvents: "auto",
        transition: "opacity 0.15s",
      }}
    >
      {action.label}
    </button>
  );
}

// ─── Toast component ──────────────────────────────────────────────────────────

export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  duration?: number;
  message?: string;
  onDismiss?: () => void;
  theme?: ToastTheme;
  mode?: ToastMode;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closeButtonClassName?: string;
  closeButtonStyle?: React.CSSProperties;
  action?: ToastAction;
  className?: string;
  toastClassName?: string;
  custom?: React.ReactNode;
  /** If true, auto-dismiss timer is not started (used for loading toasts) */
  persist?: boolean;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, variant = "default", duration = 3000, message, onDismiss, style, theme, mode, icon, closeIcon, closeButtonClassName, closeButtonStyle, action, className, toastClassName, custom, persist }, ref) => {
    const ctx = React.useContext(ToastContext);
    const resolvedMode = mode ?? ctx?.mode ?? "dark";
    const resolvedTheme = theme ?? ctx?.theme ?? {};
    const position = ctx?.position ?? "bottom-right";
    const isMobile = useIsMobile();
    const resolvedPosition: ToastPosition = isMobile
      ? position.startsWith("top") ? "top-center" : "bottom-center"
      : position;

    const [state, setState] = React.useState<"open" | "closed">("open");
    const remainingRef = React.useRef(duration);
    const startRef = React.useRef<number>(0);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => { injectAnimations(); }, []);

    // ── Auto-dismiss timer with pause-on-hover support ──
    const startTimer = React.useCallback((remaining: number) => {
      if (persist) return;
      timerRef.current = setTimeout(() => setState("closed"), remaining);
      startRef.current = Date.now();
    }, [persist]);

    const pauseTimer = React.useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        remainingRef.current -= Date.now() - startRef.current;
      }
    }, []);

    const resumeTimer = React.useCallback(() => {
      startTimer(Math.max(remainingRef.current, 0));
    }, [startTimer]);

    React.useEffect(() => {
      remainingRef.current = duration;
      startTimer(duration);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [duration, startTimer]);

    React.useEffect(() => {
      if (state !== "closed") return;
      const t = setTimeout(() => onDismiss?.(), 150);
      return () => clearTimeout(t);
    }, [state, onDismiss]);

    // ── Swipe to dismiss (touch) ──
    const touchStartX = React.useRef(0);
    const touchStartY = React.useRef(0);
    const swipeRef = React.useRef<HTMLDivElement | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: React.TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && swipeRef.current) {
        swipeRef.current.style.transform = `translateX(${dx}px)`;
        swipeRef.current.style.opacity = String(1 - Math.min(Math.abs(dx) / 150, 1));
      }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 80) {
        setState("closed");
      } else if (swipeRef.current) {
        swipeRef.current.style.transform = "";
        swipeRef.current.style.opacity = "";
      }
    };

    const base = resolvedMode === "light" ? defaultLight : defaultDark;
    const dotColor = resolvedTheme.dotColors?.[variant] ?? defaultDotColors[variant];
    const bg = resolvedTheme.background ?? base.background;
    const border = resolvedTheme.border ?? base.border;
    const textColor = resolvedTheme.textColor ?? base.textColor;
    const radius = cssValue(resolvedTheme.borderRadius ?? base.borderRadius);
    const textSize = cssValue(resolvedTheme.textSize ?? base.textSize);
    const shadow = resolvedTheme.boxShadow ?? base.boxShadow;

    const mergedClassName = [toastClassName, className].filter(Boolean).join(" ") || undefined;
    const cssVars = {
      "--notchify-bg": bg,
      "--notchify-border": border,
      "--notchify-text": textColor,
      "--notchify-radius": radius,
      "--notchify-text-size": textSize,
      "--notchify-shadow": shadow,
      "--notchify-dot": dotColor,
      "--notchify-close-size": "16px",
    } as React.CSSProperties & Record<string, string | number>;

    // ── Custom toast ──
    if (custom != null) {
      return (
        <div
          ref={(node) => {
            swipeRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="status"
          aria-live="polite"
          data-state={state}
          data-pos={resolvedPosition}
          className={mergedClassName}
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ pointerEvents: "auto", transition: "transform 0.15s, opacity 0.15s", ...style }}
        >
          {custom}
        </div>
      );
    }

    const closeContent = closeIcon ?? (
      variant === "loading" ? <SpinnerIcon color="#ffffff" /> : <CloseIcon color="#ffffff" />
    );
    const hasIcon = icon != null;

    return (
      <div
        ref={(node) => {
          swipeRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-state={state}
        data-pos={resolvedPosition}
        data-toast-id={id}
        data-notchify-toast="true"
        data-notchify-has-icon={hasIcon ? "true" : undefined}
        className={mergedClassName}
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ ...cssVars, ...style }}
      >
        <button
          type="button"
          aria-label="Dismiss"
          data-notchify-close={hasIcon ? "floating" : "inline"}
          className={closeButtonClassName}
          style={closeButtonStyle}
          onClick={() => setState("closed")}
        >
          {closeContent}
        </button>
        {icon != null && <span data-notchify-icon="true">{icon}</span>}
        <span data-notchify-message="true">{message}</span>
        {action && <ActionButton action={action} textColor={textColor} />}
      </div>
    );
  }
);
Toast.displayName = "Toast";

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { containerClassName?: string }>(
  ({ style, containerClassName, ...props }, ref) => {
    const ctx = React.useContext(ToastContext);
    const position = ctx?.position ?? "bottom-right";
    const isMobile = useIsMobile();
    const resolvedPosition: ToastPosition = isMobile
      ? position.startsWith("top") ? "top-center" : "bottom-center"
      : position;

    return (
      <div
        ref={ref}
        aria-label="Notifications"
        role="region"
        className={containerClassName}
        style={{ ...getViewportStyle(resolvedPosition, isMobile), ...style }}
        {...props}
      />
    );
  }
);
ToastViewport.displayName = "ToastViewport";
