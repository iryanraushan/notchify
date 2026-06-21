import * as React from "react";

export type ToastVariant = "default" | "destructive" | "success" | "loading";
export type ToastMode = "dark" | "light";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastTheme {
  background?: string;
  border?: string;
  textColor?: string;
  borderRadius?: string | number;
  textSize?: string | number;
  dotColors?: Partial<Record<ToastVariant, string>>;
  boxShadow?: string;
  defaultDuration?: number;
}

export interface ToastAction {
  label: React.ReactNode;
  onClick: () => void | Promise<void>;
}

export interface ToastOptions {
  /** @deprecated use `variant` instead of `type` for standard toasts */
  type?: ToastVariant;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
  id?: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closeButtonClassName?: string;
  closeButtonStyle?: React.CSSProperties;
  action?: ToastAction;
  className?: string;
  style?: React.CSSProperties;
  /** Render a fully custom component instead of the default toast UI */
  custom?: React.ReactNode;
}

export interface ToastItem extends ToastOptions {
  id: string;
  /** internal: set to true to suppress auto-dismiss (e.g. while loading) */
  _persist?: boolean;
}

export interface ToastPromiseMessages<T = unknown> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: unknown) => string);
  /** duration for success/error states (ms). Defaults to provider default. */
  duration?: number;
}

export interface ToastAPI {
  (options: ToastOptions & { message: string }): string;
  success: (message: string, options?: Omit<ToastOptions, "message" | "variant">) => string;
  error: (message: string, options?: Omit<ToastOptions, "message" | "variant">) => string;
  loading: (message: string, options?: Omit<ToastOptions, "message" | "variant">) => string;
  custom: (content: React.ReactNode, options?: Omit<ToastOptions, "message" | "custom">) => string;
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>
  ) => Promise<T>;
  update: (id: string, options: Partial<ToastItem>) => void;
  dismiss: (id: string) => void;
}

export interface ToastContextValue {
  toast: ToastAPI;
  dismiss: (id: string) => void;
  theme: ToastTheme;
  mode: ToastMode;
  position: ToastPosition;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  theme?: ToastTheme;
  mode?: ToastMode;
  position?: ToastPosition;
  maxToasts?: number;
  toastClassName?: string;
  containerClassName?: string;
}
