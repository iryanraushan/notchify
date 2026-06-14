import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { Toast, ToastViewport } from "./Toast";
import { ToastItem, ToastOptions, ToastContextValue, ToastTheme, ToastMode, ToastPosition } from "../types";

export const ToastContext = React.createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  theme?: ToastTheme;
  mode?: ToastMode;
  position?: ToastPosition;
}

export function ToastProvider({ children, theme = {}, mode = "dark", position = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...options }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, theme, mode, position }}>
      <ToastPrimitives.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            open
            variant={t.variant}
            duration={t.duration ?? theme.defaultDuration ?? 3000}
            message={t.message}
            onDismiss={() => dismiss(t.id)}
          />
        ))}
        <ToastViewport />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}
