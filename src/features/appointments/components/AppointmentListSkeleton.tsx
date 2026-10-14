import { View } from 'react-native';

import { useTheme } from '@core/theme';
import { Card, Skeleton } from '@shared/ui';

export function AppointmentListSkeleton({ count = 3 }: { count?: number }) {
  const t = useTheme();

  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} style={{ marginBottom: t.spacing.md }}>
          <View style={{ gap: t.spacing.sm }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Skeleton width="50%" height={20} />
              <Skeleton width={70} height={20} radius={t.radius.full} />
            </View>
            <Skeleton width="70%" height={14} />
            <Skeleton width="40%" height={14} />
          </View>
        </Card>
      ))}
    </View>
  );
}
