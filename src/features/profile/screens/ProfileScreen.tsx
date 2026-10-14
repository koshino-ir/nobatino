import { ScrollView, View } from 'react-native';

import { useTheme, useThemeController } from '@core/theme';
import { Button, Card, Screen, Typography } from '@shared/ui';
import { useResponsive } from '@shared/hooks';

export function ProfileScreen() {
  const t = useTheme();
  const r = useResponsive();
  const { scheme, toggleScheme } = useThemeController();

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={{
          padding: r.gutter,
          paddingTop: t.spacing.lg,
          gap: t.spacing.lg,
        }}
      >
        <View>
          <Typography variant="h1">پروفایل</Typography>
          <Typography variant="body" tone="secondary" style={{ marginTop: 4 }}>
            تنظیمات و اطلاعات
          </Typography>
        </View>

        {/* کارت خوش‌آمد */}
        <Card>
          <Card.Body>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: t.radius.full,
                  backgroundColor: t.colors.primaryMuted,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography style={{ fontSize: 32 }}>👤</Typography>
              </View>
              <View style={{ flex: 1 }}>
                <Typography variant="h3">کاربر مهمان</Typography>
                <Typography variant="caption" tone="secondary">
                  برای ورود، روی دکمه‌ی زیر بزن
                </Typography>
              </View>
            </View>
            <Button
              label="ورود / ثبت‌نام"
              variant="secondary"
              fullWidth
              style={{ marginTop: t.spacing.md }}
              onPress={() => { }}
            />
          </Card.Body>
        </Card>

        {/* تنظیمات */}
        <Typography variant="h3">تنظیمات</Typography>

        <Card>
          <Card.Body>
            <View style={{ gap: t.spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body">حالت نمایش</Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  label={scheme === 'dark' ? '☀️ روشن' : '🌙 تیره'}
                  onPress={toggleScheme}
                />
              </View>
            </View>
          </Card.Body>
        </Card>

        {/* درباره */}
        <Typography variant="h3">درباره</Typography>

        <Card>
          <Card.Body>
            <View style={{ gap: t.spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body" tone="secondary">نسخه</Typography>
                <Typography variant="bodyStrong">۱.۰.۰</Typography>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body" tone="secondary">ساخته شده با</Typography>
                <Typography variant="bodyStrong">React Native + Expo</Typography>
              </View>
            </View>
          </Card.Body>
        </Card>

        <Typography variant="caption" tone="muted" align="center">
          نوبتینو © ۱۴۰۳ — همه حقوق محفوظ است
        </Typography>
      </ScrollView>
    </Screen>
  );
}