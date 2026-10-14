import { Pressable, View } from 'react-native';

import { useTheme } from '@core/theme';
import { toPersianDigits } from '@core/utils';
import { useResponsive } from '@shared/hooks';
import { Typography } from '@shared/ui';

import type { Slot } from '../domain/types';

interface Props {
  slots: Slot[];
  selected: string | null;
  onSelect: (slot: Slot) => void;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return toPersianDigits(`${h}:${m}`);
}

export function SlotGrid({ slots, selected, onSelect }: Props) {
  const t = useTheme();
  const r = useResponsive();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: t.spacing.sm,
      }}
    >
      {slots.map((s) => {
        const isSelected = s.id === selected;
        const disabled = !s.available;

        return (
          <Pressable
            key={s.id}
            disabled={disabled}
            onPress={() => onSelect(s)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected, disabled }}
            accessibilityLabel={formatTime(s.startsAt)}
            style={{
              width: r.isTablet ? '23%' : '30%',
              paddingVertical: t.spacing.sm,
              borderRadius: t.radius.md,
              alignItems: 'center',
              backgroundColor: isSelected
                ? t.colors.primary
                : disabled
                  ? t.colors.background
                  : t.colors.surface,
              borderWidth: 1,
              borderColor: isSelected
                ? t.colors.primary
                : disabled
                  ? t.colors.border
                  : t.colors.border,
              opacity: disabled ? 0.4 : 1,
            }}
          >
            <Typography
              variant="body"
              style={{
                color: isSelected ? t.colors.primaryContrast : t.colors.textPrimary,
              }}
            >
              {formatTime(s.startsAt)}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
