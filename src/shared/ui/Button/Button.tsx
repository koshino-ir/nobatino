import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@core/theme';

import { Typography } from '../Typography';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  onPress,
  ...rest
}: Props) {
  const t = useTheme();

  const heights: Record<Size, number> = { sm: 40, md: 52, lg: 60 };
  const paddingHorizontal: Record<Size, number> = { sm: 16, md: 20, lg: 24 };
  const height = heights[size];

  const variantStyle = (pressed: boolean): { bg: string; fg: string; border?: string } => {
    switch (variant) {
      case 'primary':
        return { bg: pressed ? t.colors.primary : t.colors.primary, fg: t.colors.primaryContrast };
      case 'secondary':
        return { bg: t.colors.primaryMuted, fg: t.colors.primary };
      case 'outline':
        return { bg: 'transparent', fg: t.colors.textPrimary, border: t.colors.border };
      case 'ghost':
        return { bg: 'transparent', fg: t.colors.primary };
      case 'danger':
        return { bg: t.colors.danger, fg: t.colors.textInverse };
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={label}
      style={({ pressed }) => {
        const v = variantStyle(pressed);
        return [
          styles.base,
          {
            height,
            paddingHorizontal: paddingHorizontal[size],
            borderRadius: t.radius.lg,
            backgroundColor: v.bg,
            borderWidth: v.border ? 1 : 0,
            borderColor: v.border,
            alignSelf: fullWidth ? 'stretch' : 'flex-start',
            opacity: isDisabled ? 0.5 : pressed ? 0.9 : 1,
          },
          style,
        ];
      }}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle(false).fg} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Typography variant="button" style={{ color: variantStyle(false).fg }}>
            {label}
          </Typography>
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
