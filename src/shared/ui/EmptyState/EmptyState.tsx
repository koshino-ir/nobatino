import { View } from 'react-native';

import { useTheme } from '@core/theme';

import { Button } from '../Button';
import { Typography } from '../Typography';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = '✨', title, description, actionLabel, onAction }: Props) {
  const t = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: t.spacing['2xl'],
        gap: t.spacing.sm,
      }}
    >
      <Typography style={{ fontSize: 48 }}>{icon}</Typography>
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body" tone="secondary" align="center">
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          variant="secondary"
          onPress={onAction}
          style={{ marginTop: t.spacing.md }}
        />
      ) : null}
    </View>
  );
}
