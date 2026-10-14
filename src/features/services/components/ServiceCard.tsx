import { Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '@core/theme';
import { formatPrice, toPersianDigits } from '@core/utils';
import { Card, Typography } from '@shared/ui';

import type { Service } from '../domain/types';

interface Props {
  service: Service;
  index?: number;
  onPress?: (service: Service) => void;
}

export function ServiceCard({ service, index = 0, onPress }: Props) {
  const t = useTheme();

  return (
    <Animated.View entering={FadeInDown.duration(320).delay(index * 60)}>
      <Pressable
        onPress={() => onPress?.(service)}
        accessibilityRole="button"
        accessibilityLabel={`${service.title}، ${service.durationMinutes} دقیقه، ${service.price} تومان`}
      >
        <Card style={{ marginBottom: t.spacing.md }}>
          <Card.Body>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing.md,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: t.radius.lg,
                  backgroundColor: t.colors.primaryMuted,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography style={{ fontSize: 28 }}>{service.icon}</Typography>
              </View>

              <View style={{ flex: 1, gap: 4 }}>
                <Typography variant="h3">{service.title}</Typography>
                <Typography variant="caption" tone="secondary" numberOfLines={1}>
                  {service.description}
                </Typography>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: t.spacing.md,
                paddingTop: t.spacing.md,
                borderTopWidth: 1,
                borderTopColor: t.colors.border,
              }}
            >
              <Typography variant="caption" tone="muted">
                ⏱ {toPersianDigits(service.durationMinutes)} دقیقه
              </Typography>
              <Typography variant="bodyStrong" tone="brand">
                {formatPrice(service.price)} تومان
              </Typography>
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    </Animated.View>
  );
}
