import { View } from 'react-native';

import { useTheme } from '@core/theme';
import { Card, Skeleton } from '@shared/ui';

interface Props {
  count?: number;
}

export function ServiceListSkeleton({ count = 3 }: Props) {
  const t = useTheme();

  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} style={{ marginBottom: t.spacing.md }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing.md,
            }}
          >
            <Skeleton width={56} height={56} radius={t.radius.lg} />
            <View style={{ flex: 1, gap: t.spacing.sm }}>
              <Skeleton width="50%" height={18} />
              <Skeleton width="80%" height={12} />
            </View>
          </View>
          <View style={{ marginTop: t.spacing.md }}>
            <Skeleton width="40%" height={14} />
          </View>
        </Card>
      ))}
    </View>
  );
}
