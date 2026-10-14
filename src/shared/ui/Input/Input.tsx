import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@core/theme';

import { Typography } from '../Typography';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? t.colors.danger : focused ? t.colors.borderFocused : t.colors.border;

  return (
    <View style={{ gap: t.spacing.xs }}>
      {label ? (
        <Typography variant="caption" tone="secondary">
          {label}
        </Typography>
      ) : null}

      <Pressable>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: t.colors.surface,
              borderColor,
              borderRadius: t.radius.lg,
              paddingHorizontal: t.spacing.md,
              minHeight: 52,
            },
          ]}
        >
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <TextInput
            {...rest}
            style={[
              {
                flex: 1,
                color: t.colors.textPrimary,
                fontFamily: t.typography.body.fontFamily,
                fontSize: t.typography.body.fontSize,
                textAlign: 'right',
                writingDirection: 'rtl',
              },
              style,
            ]}
            placeholderTextColor={t.colors.textMuted}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
          />
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </View>
      </Pressable>

      {error ? (
        <Typography variant="caption" tone="danger">
          {error}
        </Typography>
      ) : hint ? (
        <Typography variant="caption" tone="muted">
          {hint}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: 8,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
