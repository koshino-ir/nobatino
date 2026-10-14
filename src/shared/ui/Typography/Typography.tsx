import React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

import { useTheme } from '@core/theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyStrong' | 'caption' | 'button';
type Tone = 'primary' | 'secondary' | 'muted' | 'inverse' | 'brand' | 'danger' | 'success';
type Align = 'auto' | 'left' | 'right' | 'center';

interface Props extends TextProps {
  variant?: Variant;
  tone?: Tone;
  align?: Align;
  children?: React.ReactNode;
}

function resolveTextAlign(align: Align): TextStyle['textAlign'] {
  if (align === 'center' || align === 'auto') return align;
  return align === 'left' ? 'right' : 'left';
}

export function Typography({
  variant = 'body',
  tone = 'primary',
  align = 'auto',
  style,
  children,
  ...rest
}: Props) {
  const t = useTheme();

  const colorMap: Record<Tone, string> = {
    primary: t.colors.textPrimary,
    secondary: t.colors.textSecondary,
    muted: t.colors.textMuted,
    inverse: t.colors.textInverse,
    brand: t.colors.primary,
    danger: t.colors.danger,
    success: t.colors.success,
  };

  return (
    <Text
      {...rest}
      style={[
        t.typography[variant],
        {
          color: colorMap[tone],
          textAlign: resolveTextAlign(align),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}