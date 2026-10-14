import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors } from './colors';
import { radius, spacing } from './tokens';
import type { ColorScheme, Theme } from './types';
import { typography } from './typography';

interface ThemeContextValue {
  theme: Theme;
  scheme: ColorScheme;
  toggleScheme: () => void;
  setScheme: (s: ColorScheme | 'system') => void;
  preference: ColorScheme | 'system';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const rawScheme = useColorScheme();
  const systemScheme: ColorScheme = rawScheme === 'dark' ? 'dark' : 'light';

  const [preference, setPreference] = React.useState<ColorScheme | 'system'>('system');

  const scheme: ColorScheme = preference === 'system' ? systemScheme : preference;

  const theme = useMemo<Theme>(
    () => ({
      scheme,
      colors: scheme === 'dark' ? darkColors : lightColors,
      spacing,
      radius,
      typography,
    }),
    [scheme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      scheme,
      preference,
      setScheme: setPreference,
      toggleScheme: () => setPreference(scheme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, scheme, preference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider>');
  }
  return ctx.theme;
}

export function useThemeController() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeController must be used within <ThemeProvider>');
  }
  return ctx;
}
