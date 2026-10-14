// src/app/HomePreview.tsx
import { View } from 'react-native';

import { useTheme, useThemeController } from '@core/theme';
import { formatPrice, toPersianDigits } from '@core/utils';
import { Button, Card, Input, Screen, Typography } from '@shared/ui';

export function HomePreview() {
  const t = useTheme();
  const { scheme, toggleScheme } = useThemeController();

  return (
    <Screen scroll>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: t.spacing.lg,
        }}
      >
        <Typography variant="h1">نوبتینو</Typography>
        <Button
          variant="ghost"
          size="sm"
          label={scheme === 'dark' ? '☀️ روشن' : '🌙 تیره'}
          onPress={toggleScheme}
        />
      </View>

      <Card>
        <Card.Header>
          <Typography variant="h3">اصلاح مو</Typography>
        </Card.Header>
        <Card.Body>
          <Typography variant="body" tone="secondary">
            زمان تقریبی: {toPersianDigits(45)} دقیقه
          </Typography>
        </Card.Body>
        <Card.Footer>
          <Typography variant="bodyStrong" tone="brand">
            {formatPrice(350000)} تومان
          </Typography>
        </Card.Footer>
      </Card>

      <View style={{ gap: t.spacing.md, marginTop: t.spacing.lg }}>
        <Input label="شماره موبایل" placeholder="۰۹۱۲..." keyboardType="phone-pad" />
        <Input
          label="نام و نام خانوادگی"
          placeholder="مثلاً: سارا احمدی"
          error="این فیلد اجباری است"
        />
      </View>

      <View style={{ gap: t.spacing.sm, marginTop: t.spacing.lg }}>
        <Button label="رزرو نوبت" fullWidth onPress={() => {}} />
        <Button label="ادامه" variant="secondary" fullWidth onPress={() => {}} />
        <Button label="انصراف" variant="outline" fullWidth onPress={() => {}} />
        <Button label="حذف" variant="danger" fullWidth onPress={() => {}} />
      </View>
    </Screen>
  );
}
