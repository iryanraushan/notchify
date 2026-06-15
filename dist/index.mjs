import * as React2 from 'react';
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
var ToastContext = React2.createContext(null);
function ToastProvider({ children, theme = {}, mode = "dark", position = "bottom-right" }) {
  const [toasts, setToasts] = React2.useState([]);
  const toast = React2.useCallback((options) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, __spreadValues({ id }, options)]);
  }, []);
  const dismiss = React2.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsx(ToastContext.Provider, { value: { toast, dismiss, theme, mode, position }, children: /* @__PURE__ */ jsxs(ToastPrimitives2.Provider, { swipeDirection: "right", children: [
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
function useIsMobile() {
  const [isMobile, setIsMobile] = React2.useState(
    () => typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  React2.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}
function getViewportStyle(position, isMobile) {
  const isTop = position.startsWith("top");
  if (isMobile) {
    return __spreadProps(__spreadValues({
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)"
    }, isTop ? { top: 16 } : { bottom: 24 }), {
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "calc(100vw - 32px)",
      maxWidth: 420,
      padding: 0,
      pointerEvents: "none"
    });
  }
  const base = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 420,
    width: "calc(100vw - 32px)",
    padding: 0,
    pointerEvents: "none"
  };
  switch (position) {
    case "top-left":
      return __spreadProps(__spreadValues({}, base), { top: 16, left: 16 });
    case "top-center":
      return __spreadProps(__spreadValues({}, base), { top: 16, left: "50%", transform: "translateX(-50%)" });
    case "top-right":
      return __spreadProps(__spreadValues({}, base), { top: 16, right: 16 });
    case "bottom-left":
      return __spreadProps(__spreadValues({}, base), { bottom: 16, left: 16 });
    case "bottom-center":
      return __spreadProps(__spreadValues({}, base), { bottom: 16, left: "50%", transform: "translateX(-50%)" });
    case "bottom-right":
      return __spreadProps(__spreadValues({}, base), { bottom: 16, right: 16 });
  }
}
var animationStyle = `
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
var styleInjected = false;
function injectAnimations() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = animationStyle;
  document.head.appendChild(el);
  styleInjected = true;
}
var CloseIcon = ({ color }) => /* @__PURE__ */ jsxs("svg", { width: "7", height: "7", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("line", { x1: "1", y1: "1", x2: "9", y2: "9", stroke: color, strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("line", { x1: "9", y1: "1", x2: "1", y2: "9", stroke: color, strokeWidth: "2", strokeLinecap: "round" })
] });
var ToastViewport = React2.forwardRef((_a, ref) => {
  var _b = _a, { style } = _b, props = __objRest(_b, ["style"]);
  var _a2;
  const ctx = React2.useContext(ToastContext);
  const position = (_a2 = ctx == null ? void 0 : ctx.position) != null ? _a2 : "bottom-right";
  const isMobile = useIsMobile();
  const resolvedPosition = isMobile ? position.startsWith("top") ? "top-center" : "bottom-center" : position;
  return /* @__PURE__ */ jsx(
    ToastPrimitives2.Viewport,
    __spreadValues({
      ref,
      style: __spreadValues(__spreadValues({}, getViewportStyle(resolvedPosition, isMobile)), style)
    }, props)
  );
});
ToastViewport.displayName = "ToastViewport";
var Toast = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { variant = "default", duration = 3e3, message, onDismiss, style, theme, mode } = _b, props = __objRest(_b, ["variant", "duration", "message", "onDismiss", "style", "theme", "mode"]);
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
    const ctx = React2.useContext(ToastContext);
    const resolvedMode = (_a2 = mode != null ? mode : ctx == null ? void 0 : ctx.mode) != null ? _a2 : "dark";
    const resolvedTheme = (_b2 = theme != null ? theme : ctx == null ? void 0 : ctx.theme) != null ? _b2 : {};
    const position = (_c = ctx == null ? void 0 : ctx.position) != null ? _c : "bottom-right";
    const isMobile = useIsMobile();
    const resolvedPosition = isMobile ? position.startsWith("top") ? "top-center" : "bottom-center" : position;
    React2.useEffect(() => {
      injectAnimations();
    }, []);
    const base = resolvedMode === "light" ? defaultLight : defaultDark;
    const dotColor = (_e = (_d = resolvedTheme.dotColors) == null ? void 0 : _d[variant]) != null ? _e : defaultDotColors[variant];
    const bg = (_f = resolvedTheme.background) != null ? _f : base.background;
    const border = (_g = resolvedTheme.border) != null ? _g : base.border;
    const textColor = (_h = resolvedTheme.textColor) != null ? _h : base.textColor;
    const shadow = (_i = resolvedTheme.boxShadow) != null ? _i : base.boxShadow;
    return /* @__PURE__ */ jsxs(
      ToastPrimitives2.Root,
      __spreadProps(__spreadValues({
        ref,
        duration,
        onOpenChange: (open) => !open && (onDismiss == null ? void 0 : onDismiss()),
        "data-pos": resolvedPosition,
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