import { Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '@core/theme';
import { Typography } from '@shared/ui';

import type { Staff } from '../domain/types';

interface Props {
  staff: Staff[];
  selected: string | null;
  onSelect: (staff: Staff) => void;
}

export function StaffPicker({ staff, selected, onSelect }: Props) {
  const t = useTheme();

  return (
    <View style={{ gap: t.spacing.md }}>
      {staff.map((s, i) => {
        const isSelected = s.id === selected;
        return (
          <Animated.View key={s.id} entering={FadeInDown.duration(280).delay(i * 60)}>
            <Pressable
              onPress={() => onSelect(s)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${s.name}، ${s.role}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing.md,
                padding: t.spacing.md,
                borderRadius: t.radius.xl,
                borderWidth: 2,
                borderColor: isSelected ? t.colors.primary : t.colors.border,
                backgroundColor: isSelected ? t.colors.primaryMuted : t.colors.surface,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: t.radius.full,
                  backgroundColor: t.colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography style={{ fontSize: 30 }}>{s.avatar}</Typography>
              </View>

              <View style={{ flex: 1 }}>
                <Typography variant="bodyStrong">{s.name}</Typography>
                <Typography variant="caption" tone="secondary">
                  {s.role}
                </Typography>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Typography variant="caption">⭐</Typography>
                <Typography variant="caption" tone="secondary">
                  {s.rating}
                </Typography>
              </View>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}
