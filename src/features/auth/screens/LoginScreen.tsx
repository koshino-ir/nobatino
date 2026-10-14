import { Typography, Screen, Button } from '@shared/ui';

export function LoginScreen() {
  return (
    <Screen>
      <Typography variant="h1">ورود به نوبتینو</Typography>
      <Typography variant="body" tone="secondary" style={{ marginTop: 8 }}>
        برای شروع، شماره موبایل خود را وارد کنید
      </Typography>
      <Button label="ادامه (نمایشی)" fullWidth onPress={() => {}} style={{ marginTop: 24 }} />
    </Screen>
  );
}
