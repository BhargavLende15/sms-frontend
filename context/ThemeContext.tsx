import React, { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ThemeMode, toggleTheme, setTheme } from "../store/themeSlice";

import { Colors, Gradients } from "../constants/colors";

const lightTheme = {
  background: Colors.lightBackground,
  surface: Colors.lightSurface,
  text: Colors.textPrimaryLight,
  textSecondary: Colors.textSecondaryLight,
  border: Colors.gray200,
  primary: Colors.primary,
  primaryDark: Colors.primaryDark,
  secondary: Colors.secondary,
  error: Colors.error,
  success: Colors.success,
  card: Colors.lightSurface,
  input: Colors.gray50,
  gradient: Gradients.light,
  primaryGradient: Gradients.primary,
};

const darkTheme = {
  background: Colors.darkBackground,
  surface: Colors.darkSurface,
  text: Colors.textPrimaryDark,
  textSecondary: Colors.textSecondaryDark,
  border: Colors.gray700,
  primary: Colors.primaryLight,
  primaryDark: Colors.primary,
  secondary: Colors.secondaryLight,
  error: Colors.error,
  success: Colors.success,
  card: Colors.darkSurface,
  input: Colors.gray800,
  gradient: Gradients.dark,
  primaryGradient: Gradients.primary,
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

