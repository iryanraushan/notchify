import * as React from 'react';
import { useContext } from 'react';
import * as ToastPrimitives2 from '@radix-ui/react-toast';
import { jsx, jsxs } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var ToastContext = React.createContext(null);
function ToastProvider({ children, theme = {}, mode = "dark" }) {
  const [toasts, setToasts] = React.useState([]);
  const toast = React.useCallback((options) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, __spreadValues({ id }, options)]);
  }, []);
  const dismiss = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsx(ToastContext.Provider, { value: { toast, dismiss, theme, mode }, children: /* @__PURE__ */ jsxs(ToastPrimitives2.Provider, { swipeDirection: "right", children: [
    children,
    toasts.map((t) => {
      var _a, _b;
      return /* @__PURE__ */ jsx(
        Toast,
        {
          open: true,
          variant: t.variant,
          duration: (_b = (_a = t.duration) != null ? _a : theme.defaultDuration) != null ? _b : 3e3,
          message: t.message,
          onDismiss: () => dismiss(t.id)
        },
        t.id
      );
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] }) });
}
var defaultDotColors = {
  default: "#3b82f6",
  destructive: "#ef4444",
  success: "#22c55e"
};
var defaultDark = {
  background: "#0c0b0b",
  border: "#1a1a1a",
  textColor: "#f5f5f5",
  boxShadow: "0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.14)"};
var defaultLight = {
  background: "#ffffff",
  border: "#e5e5e5",
  textColor: "#111111",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)"};
var CloseIcon = ({ color }) => /* @__PURE__ */ jsxs("svg", { width: "7", height: "7", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("line", { x1: "1", y1: "1", x2: "9", y2: "9", stroke: color, strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("line", { x1: "9", y1: "1", x2: "1", y2: "9", stroke: color, strokeWidth: "2", strokeLinecap: "round" })
] });
var ToastViewport = React.forwardRef((_a, ref) => {
  var _b = _a, { style } = _b, props = __objRest(_b, ["style"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives2.Viewport,
    __spreadValues({
      ref,
      style: __spreadValues({
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
        pointerEvents: "none"
      }, style)
    }, props)
  );
});
ToastViewport.displayName = "ToastViewport";
var Toast = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { variant = "default", duration = 3e3, message, onDismiss, style, theme, mode } = _b, props = __objRest(_b, ["variant", "duration", "message", "onDismiss", "style", "theme", "mode"]);
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const ctx = React.useContext(ToastContext);
    const resolvedMode = (_a2 = mode != null ? mode : ctx == null ? void 0 : ctx.mode) != null ? _a2 : "dark";
    const resolvedTheme = (_b2 = theme != null ? theme : ctx == null ? void 0 : ctx.theme) != null ? _b2 : {};
    const base = resolvedMode === "light" ? defaultLight : defaultDark;
    const dotColor = (_d = (_c = resolvedTheme.dotColors) == null ? void 0 : _c[variant]) != null ? _d : defaultDotColors[variant];
    const bg = (_e = resolvedTheme.background) != null ? _e : base.background;
    const border = (_f = resolvedTheme.border) != null ? _f : base.border;
    const textColor = (_g = resolvedTheme.textColor) != null ? _g : base.textColor;
    const shadow = (_h = resolvedTheme.boxShadow) != null ? _h : base.boxShadow;
    return /* @__PURE__ */ jsxs(
      ToastPrimitives2.Root,
      __spreadProps(__spreadValues({
        ref,
        duration,
        onOpenChange: (open) => !open && (onDismiss == null ? void 0 : onDismiss()),
        style: __spreadValues({
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
          lineHeight: 1.5
        }, style)
      }, props), {
        children: [
          /* @__PURE__ */ jsx(ToastPrimitives2.Close, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Dismiss",
              style: {
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
                padding: 1
              },
              children: /* @__PURE__ */ jsx(CloseIcon, { color: "#ffffff" })
            }
          ) }),
          /* @__PURE__ */ jsx(ToastPrimitives2.Description, { style: { flex: 1, color: textColor, fontSize: 14 }, children: message })
        ]
      })
    );
  }
);
Toast.displayName = "Toast";
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export { Toast, ToastProvider, ToastViewport, useToast };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map