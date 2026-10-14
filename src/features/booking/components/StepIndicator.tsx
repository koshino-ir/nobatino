import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@core/theme';
import { Typography } from '@shared/ui';

interface Props {
  steps: { key: string; label: string }[];
  current: number;
}

export function StepIndicator({ steps, current }: Props) {
  const t = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <React.Fragment key={s.key}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: t.radius.full,
                  backgroundColor: done
                    ? t.colors.primary
                    : active
                      ? t.colors.primary
                      : t.colors.surface,
                  borderWidth: active ? 0 : 1,
                  borderColor: t.colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  style={{
                    color: done || active ? t.colors.primaryContrast : t.colors.textMuted,
                    fontFamily: t.typography.bodyStrong.fontFamily,
                  }}
                >
                  {done ? '✓' : `${i + 1}`}
                </Typography>
              </View>
              <Typography variant="caption" tone={active ? 'brand' : 'muted'}>
                {s.label}
              </Typography>
            </View>
            {i < steps.length - 1 ? (
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: done ? t.colors.primary : t.colors.border,
                  marginBottom: 20,
                }}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
}
