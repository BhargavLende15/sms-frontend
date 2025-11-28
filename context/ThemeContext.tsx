import React, { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ThemeMode, toggleTheme, setTheme } from "../store/themeSlice";

const lightTheme = {
  background: "#ffffff",
  text: "#1c1c1e",
};

const darkTheme = {
  background: "#1c1c1e",
  text: "#f5f5f5",
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

