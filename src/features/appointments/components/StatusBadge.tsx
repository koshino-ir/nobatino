import { View } from 'react-native';

import { useTheme } from '@core/theme';
import { Typography } from '@shared/ui';

import type { AppointmentStatus } from '../domain/types';

interface Props {
  status: AppointmentStatus;
}

const LABELS: Record<AppointmentStatus, string> = {
  confirmed: 'تایید شده',
  pending: 'در انتظار',
  cancelled: 'لغو شده',
  done: 'انجام شده',
};

export function StatusBadge({ status }: Props) {
  const t = useTheme();

  const palette: Record<AppointmentStatus, { bg: string; fg: string }> = {
    confirmed: { bg: t.colors.primaryMuted, fg: t.colors.primary },
    pending: { bg: 'rgba(245, 158, 11, 0.15)', fg: t.colors.warning },
    cancelled: { bg: 'rgba(239, 68, 68, 0.15)', fg: t.colors.danger },
    done: { bg: 'rgba(16, 185, 129, 0.15)', fg: t.colors.success },
  };

  const c = palette[status];

  return (
    <View
      style={{
        backgroundColor: c.bg,
        paddingHorizontal: t.spacing.sm,
        paddingVertical: 4,
        borderRadius: t.radius.full,
      }}
    >
      <Typography variant="caption" style={{ color: c.fg }}>
        {LABELS[status]}
      </Typography>
    </View>
  );
}
