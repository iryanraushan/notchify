export type ToastVariant = "default" | "destructive" | "success";
export type ToastMode = "dark" | "light";

export interface ToastTheme {
  background?: string;
  border?: string;
  textColor?: string;
  dotColors?: Partial<Record<ToastVariant, string>>;
  boxShadow?: string;
  defaultDuration?: number;
}

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
  theme: ToastTheme;
  mode: ToastMode;
}
