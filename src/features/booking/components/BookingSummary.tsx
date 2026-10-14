import { View } from 'react-native';

import { useTheme } from '@core/theme';
import { Card, Typography } from '@shared/ui';

interface Row {
  label: string;
  value: string;
}

export function BookingSummary({ rows }: { rows: Row[] }) {
  const t = useTheme();

  return (
    <Card>
      <Card.Body>
        <View style={{ gap: t.spacing.sm }}>
          {rows.map((row, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body" tone="secondary">
                {row.label}
              </Typography>
              <Typography variant="bodyStrong">{row.value}</Typography>
            </View>
          ))}
        </View>
      </Card.Body>
    </Card>
  );
}
