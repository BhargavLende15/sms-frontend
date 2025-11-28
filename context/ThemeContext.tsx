import React, { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ThemeMode, toggleTheme, setTheme } from "../store/themeSlice";

const lightTheme = {
  background: "#ffffff",
  surface: "#f9fafb",
  text: "#111827",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  error: "#dc2626",
  success: "#10b981",
  card: "#ffffff",
  input: "#ffffff",
};

const darkTheme = {
  background: "#111827",
  surface: "#1f2937",
  text: "#f9fafb",
  textSecondary: "#d1d5db",
  border: "#374151",
  primary: "#60a5fa",
  primaryDark: "#3b82f6",
  error: "#ef4444",
  success: "#34d399",
  card: "#1f2937",
  input: "#374151",
};

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  theme: typeof lightTheme;
}

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  const value: ThemeContextValue = {
    mode,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (themeMode) => dispatch(setTheme(themeMode)),
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

