import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { ToastVariant, ToastTheme, ToastMode } from "../types";
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

const CloseIcon = ({ color }: { color: string }) => (
  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <line x1="1" y1="1" x2="9" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="1" x2="1" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ style, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: "fixed",
      top: 16,
      right: 16,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      maxWidth: 420,
      width: "calc(100vw - 32px)",
      padding: 8,
      pointerEvents: "none",
      ...style,
    }}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

interface ToastRootProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: ToastVariant;
  message: string;
  onDismiss?: () => void;
  theme?: ToastTheme;
  mode?: ToastMode;
}

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastRootProps>(
  ({ variant = "default", duration = 3000, message, onDismiss, style, theme, mode, ...props }, ref) => {
    const ctx = React.useContext(ToastContext);
    const resolvedMode = mode ?? ctx?.mode ?? "dark";
    const resolvedTheme = theme ?? ctx?.theme ?? {};

    const base = resolvedMode === "light" ? defaultLight : defaultDark;
    const dotColor = resolvedTheme.dotColors?.[variant] ?? defaultDotColors[variant];
    const bg = resolvedTheme.background ?? base.background;
    const border = resolvedTheme.border ?? base.border;
    const textColor = resolvedTheme.textColor ?? base.textColor;
    const shadow = resolvedTheme.boxShadow ?? base.boxShadow;

    return (
      <ToastPrimitives.Root
        ref={ref}
        duration={duration}
        onOpenChange={(open) => !open && onDismiss?.()}
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
        {...props}
      >
        <ToastPrimitives.Close asChild>
          <button
            aria-label="Dismiss"
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
            <CloseIcon color={"#ffffff"} />
          </button>
        </ToastPrimitives.Close>

        <ToastPrimitives.Description style={{ flex: 1, color: textColor, fontSize: 14 }}>
          {message}
        </ToastPrimitives.Description>
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = "Toast";
