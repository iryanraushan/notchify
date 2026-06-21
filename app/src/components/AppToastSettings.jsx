import { createContext, useContext } from "react";

const AppToastSettingsContext = createContext({
  mode: "dark",
  setMode: () => {},
  position: "bottom-right",
  setPosition: () => {},
  background: "#0A0A0A",
  setBackground: () => {},
  borderColor: "#2A2A2A",
  setBorderColor: () => {},
  textColor: "#FAFAFA",
  setTextColor: () => {},
  borderRadius: 12,
  setBorderRadius: () => {},
  textSize: 14,
  setTextSize: () => {},
});

export function AppToastSettingsProvider({ value, children }) {
  return (
    <AppToastSettingsContext.Provider value={value}>
      {children}
    </AppToastSettingsContext.Provider>
  );
}

export function useAppToastSettings() {
  return useContext(AppToastSettingsContext);
}
