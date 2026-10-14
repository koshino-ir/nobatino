import { palette } from './tokens';
import type { ThemeColors } from './types';

export const lightColors: ThemeColors = {
  background: palette.slate[50],
  surface: palette.slate[0],
  surfaceElevated: palette.slate[0],
  overlay: 'rgba(15, 23, 42, 0.5)',

  textPrimary: palette.slate[900],
  textSecondary: palette.slate[600],
  textMuted: palette.slate[400],
  textInverse: palette.slate[0],

  primary: palette.indigo[600],
  primaryMuted: palette.indigo[100],
  primaryContrast: palette.slate[0],

  success: palette.green[500],
  warning: palette.yellow[500],
  danger: palette.red[500],
  info: palette.blue[500],

  border: palette.slate[200],
  borderFocused: palette.indigo[500],

  shadow: 'rgba(15, 23, 42, 0.08)',
};

export const darkColors: ThemeColors = {
  background: palette.slate[950],
  surface: palette.slate[900],
  surfaceElevated: palette.slate[800],
  overlay: 'rgba(0, 0, 0, 0.6)',

  textPrimary: palette.slate[50],
  textSecondary: palette.slate[300],
  textMuted: palette.slate[500],
  textInverse: palette.slate[900],

  primary: palette.indigo[400],
  primaryMuted: palette.indigo[900],
  primaryContrast: palette.slate[0],

  success: palette.green[500],
  warning: palette.yellow[500],
  danger: palette.red[500],
  info: palette.blue[500],

  border: palette.slate[700],
  borderFocused: palette.indigo[400],

  shadow: 'rgba(0, 0, 0, 0.4)',
};
