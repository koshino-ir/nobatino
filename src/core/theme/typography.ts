import type { ThemeTypography } from './types';

const FONT = {
  regular: 'Vazirmatn-Regular',
  medium: 'Vazirmatn-Medium',
  semibold: 'Vazirmatn-SemiBold',
  bold: 'Vazirmatn-Bold',
} as const;

export const typography: ThemeTypography = {
  h1: {
    fontFamily: FONT.bold,
    fontSize: 28,
    lineHeight: 40,
    fontWeight: '700',
  },
  h2: {
    fontFamily: FONT.bold,
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '700',
  },
  h3: {
    fontFamily: FONT.semibold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontFamily: FONT.regular,
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '400',
  },
  bodyStrong: {
    fontFamily: FONT.semibold,
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '600',
  },
  caption: {
    fontFamily: FONT.regular,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
  },
  button: {
    fontFamily: FONT.semibold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
};
