import * as React from "react";
import { Toast, ToastViewport } from "./Toast";
import {
  ToastItem,
  ToastOptions,
  ToastContextValue,
  ToastAPI,
  ToastProviderProps,
  ToastPromiseMessages,
} from "../types";

export const ToastContext = React.createContext<ToastContextValue | null>(null);

function genId() {
  return Math.random().toString(36).slice(2);
}

export function ToastProvider({
  children,
  theme = {},
  mode = "dark",
  position = "bottom-right",
  maxToasts,
  toastClassName,
  containerClassName,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  // ── Core add/update/remove ─────────────────────────────────────────────────

  const addOrReplace = React.useCallback(
    (options: Omit<ToastItem, "id"> & { id?: string }): string => {
      const id = options.id ?? genId();
      setToasts((prev) => {
        // If an id already exists, replace it (update in place)
        if (options.id && prev.some((t) => t.id === id)) {
          return prev.map((t) => (t.id === id ? { ...t, ...options, id } : t));
        }
        const next = [...prev, { ...options, id }];
        // Apply maxToasts limit — drop oldest
        if (maxToasts && next.length > maxToasts) {
          return next.slice(next.length - maxToasts);
        }
        return next;
      });
      return id;
    },
    [maxToasts]
  );

  const update = React.useCallback((id: string, options: Partial<ToastItem>) => {
    setToasts((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...options,
              // normalise: map `type` → `variant` if caller uses the old field
              variant: options.variant ?? options.type ?? t.variant,
              _persist: options.variant === "loading" || options.type === "loading"
                ? true
                : options.variant != null || options.type != null
                ? false
                : t._persist,
            }
          : t
      )
    );
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Public toast API ───────────────────────────────────────────────────────

  const toastFn = React.useCallback(
    (options: ToastOptions & { message: string }): string => {
      const variant = options.variant ?? options.type ?? "default";
      return addOrReplace({ ...options, variant, _persist: variant === "loading" });
    },
    [addOrReplace]
  );

  const toastSuccess = React.useCallback(
    (message: string, options?: Omit<ToastOptions, "message" | "variant">): string =>
      addOrReplace({ ...options, message, variant: "success" }),
    [addOrReplace]
  );

  const toastError = React.useCallback(
    (message: string, options?: Omit<ToastOptions, "message" | "variant">): string =>
      addOrReplace({ ...options, message, variant: "destructive" }),
    [addOrReplace]
  );

  const toastLoading = React.useCallback(
    (message: string, options?: Omit<ToastOptions, "message" | "variant">): string =>
      addOrReplace({ ...options, message, variant: "loading", _persist: true }),
    [addOrReplace]
  );

  const toastCustom = React.useCallback(
    (content: React.ReactNode, options?: Omit<ToastOptions, "message" | "custom">): string =>
      addOrReplace({ ...options, custom: content }),
    [addOrReplace]
  );

  const toastPromise = React.useCallback(
    async <T,>(
      promise: Promise<T> | (() => Promise<T>),
      messages: ToastPromiseMessages<T>
    ): Promise<T> => {
      const id = toastLoading(messages.loading, { id: genId() });
      const p = typeof promise === "function" ? promise() : promise;
      try {
        const data = await p;
        const msg = typeof messages.success === "function" ? messages.success(data) : messages.success;
        update(id, { variant: "success", message: msg, duration: messages.duration ?? theme.defaultDuration ?? 3000 });
        return data;
      } catch (err) {
        const msg = typeof messages.error === "function" ? messages.error(err) : messages.error;
        update(id, { variant: "destructive", message: msg, duration: messages.duration ?? theme.defaultDuration ?? 3000 });
        throw err;
      }
    },
    [toastLoading, update, theme.defaultDuration]
  );

  const toast: ToastAPI = React.useMemo(() => {
    const fn = toastFn as ToastAPI;
    fn.success = toastSuccess;
    fn.error = toastError;
    fn.loading = toastLoading;
    fn.custom = toastCustom;
    fn.promise = toastPromise;
    fn.update = update;
    fn.dismiss = dismiss;
    return fn;
  }, [toastFn, toastSuccess, toastError, toastLoading, toastCustom, toastPromise, update, dismiss]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <ToastContext.Provider value={{ toast, dismiss, theme, mode, position }}>
      {children}
      <ToastViewport containerClassName={containerClassName}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            variant={t.variant ?? (t.type as typeof t.variant)}
            duration={t._persist ? undefined : (t.duration ?? theme.defaultDuration ?? 3000)}
            message={t.message}
            icon={t.icon}
            closeIcon={t.closeIcon}
            closeButtonClassName={t.closeButtonClassName}
            closeButtonStyle={t.closeButtonStyle}
            action={t.action}
            className={t.className}
            toastClassName={toastClassName}
            custom={t.custom}
            style={t.style}
            persist={t._persist}
            onDismiss={() => dismiss(t.id)}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}
