import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@iryanraushan/notchify";
import type {
  ToastMode,
  ToastPosition,
  ToastTheme,
} from "@iryanraushan/notchify";
import { useMemo, useState } from "react";

import Home from "@/pages/Home";
import Playground from "@/pages/Playground";
import Docs from "@/pages/Docs";

import {
  AppToastSettingsProvider,
} from "@/components/AppToastSettings";
import { CommandPaletteProvider } from "@/components/CommandPalette";

function App() {
  const [toastMode, setToastMode] =
    useState<ToastMode>("dark");

  const [toastPosition, setToastPosition] =
    useState<ToastPosition>("top-right");

  const [toastBackground, setToastBackground] =
    useState("#0A0A0A");

  const [toastBorderColor, setToastBorderColor] =
    useState("#2A2A2A");

  const [toastTextColor, setToastTextColor] =
    useState("#FAFAFA");

  const [toastBorderRadius, setToastBorderRadius] =
    useState(12);

  const [toastTextSize, setToastTextSize] =
    useState(14);

  const toastTheme = useMemo<ToastTheme>(
    () => ({
      background: toastBackground,
      border: toastBorderColor,
      textColor: toastTextColor,
      borderRadius: toastBorderRadius,
      textSize: toastTextSize,
      boxShadow:
        toastMode === "light"
          ? "0 20px 60px -20px rgba(0,0,0,0.18), 0 0 40px -20px rgba(245,158,11,0.18)"
          : "0 20px 60px -20px rgba(0,0,0,0.7), 0 0 40px -20px rgba(245,158,11,0.15)",
      dotColors: {
        default: "#3B82F6",
        success: "#22C55E",
        destructive: "#EF4444",
        loading: "#F59E0B",
      },
      defaultDuration: 3500,
    }),
    [
      toastMode,
      toastBackground,
      toastBorderColor,
      toastTextColor,
      toastBorderRadius,
      toastTextSize,
    ]
  );

  const toastSettings = useMemo(
    () => ({
      mode: toastMode,
      setMode: setToastMode,
      position: toastPosition,
      setPosition: setToastPosition,
      background: toastBackground,
      setBackground: setToastBackground,
      borderColor: toastBorderColor,
      setBorderColor: setToastBorderColor,
      textColor: toastTextColor,
      setTextColor: setToastTextColor,
      borderRadius: toastBorderRadius,
      setBorderRadius: setToastBorderRadius,
      textSize: toastTextSize,
      setTextSize: setToastTextSize,
    }),
    [
      toastMode,
      toastPosition,
      toastBackground,
      toastBorderColor,
      toastTextColor,
      toastBorderRadius,
      toastTextSize,
    ]
  );

  return (
    <div
      className="App app-shell min-h-screen text-[#FAFAFA] font-body"
      data-testid="app-root"
    >
      <ToastProvider
        mode={toastMode}
        position={toastPosition}
        maxToasts={5}
        theme={toastTheme}
      >
        <BrowserRouter>
          <AppToastSettingsProvider value={toastSettings}>
            <CommandPaletteProvider>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/playground"
                  element={<Playground />}
                />

                <Route
                  path="/docs"
                  element={<Docs />}
                />
              </Routes>
            </CommandPaletteProvider>
          </AppToastSettingsProvider>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
