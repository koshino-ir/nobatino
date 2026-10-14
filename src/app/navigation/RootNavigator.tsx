import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookingScreen } from '@/features/booking/screens/BookingScreen';
import { useTheme } from '@core/theme';
import { LoginScreen } from '@features/auth/screens/LoginScreen';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const t = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: t.scheme === 'dark',
        colors: {
          primary: t.colors.primary,
          background: t.colors.background,
          card: t.colors.surface,
          text: t.colors.textPrimary,
          border: t.colors.border,
          notification: t.colors.danger,
        },
        fonts: {
          regular: {
            fontFamily: t.typography.body.fontFamily,
            fontWeight: t.typography.body.fontWeight,
          },
          medium: {
            fontFamily: t.typography.bodyStrong.fontFamily,
            fontWeight: t.typography.bodyStrong.fontWeight,
          },
          bold: {
            fontFamily: t.typography.h3.fontFamily,
            fontWeight: t.typography.h3.fontWeight,
          },
          heavy: {
            fontFamily: t.typography.h1.fontFamily,
            fontWeight: t.typography.h1.fontWeight,
          },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: t.colors.background },
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            headerShown: true,
            title: 'رزرو نوبت',
            headerBackTitle: 'بازگشت',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
