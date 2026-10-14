import { useWindowDimensions } from 'react-native';

const BREAKPOINTS = { sm: 0, md: 480, lg: 768, xl: 1024 } as const;
export type ScreenSize = keyof typeof BREAKPOINTS;

export interface Responsive {
  width: number;
  height: number;
  size: ScreenSize;
  isTablet: boolean;
  isLandscape: boolean;
  columns: number;
  gutter: number;
}

export function useResponsive(): Responsive {
  const { width, height } = useWindowDimensions();

  const size: ScreenSize =
    width >= BREAKPOINTS.xl
      ? 'xl'
      : width >= BREAKPOINTS.lg
        ? 'lg'
        : width >= BREAKPOINTS.md
          ? 'md'
          : 'sm';

  const isTablet = size === 'lg' || size === 'xl';
  const isLandscape = width > height;

  const columns = size === 'xl' ? 3 : size === 'lg' ? 2 : 1;
  const gutter = isTablet ? 24 : 16;

  return { width, height, size, isTablet, isLandscape, columns, gutter };
}
