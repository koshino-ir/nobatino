export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  // پس‌زمینه‌ها
  background: string;
  surface: string;
  surfaceElevated: string;
  overlay: string;

  // متن
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // برند
  primary: string;
  primaryMuted: string;
  primaryContrast: string;

  // وضعیت‌ها
  success: string;
  warning: string;
  danger: string;
  info: string;

  // خط و مرز
  border: string;
  borderFocused: string;

  // سایه
  shadow: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

export interface ThemeTypography {
  h1: TextStyleToken;
  h2: TextStyleToken;
  h3: TextStyleToken;
  body: TextStyleToken;
  bodyStrong: TextStyleToken;
  caption: TextStyleToken;
  button: TextStyleToken;
}

export interface TextStyleToken {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700';
}

export interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
}
