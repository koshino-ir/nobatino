// src/app/navigation/MainTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@core/theme';
import { AppointmentsScreen } from '@features/appointments/screens/AppointmentsScreen';
import { ProfileScreen } from '@features/profile/screens/ProfileScreen';
import { ServicesScreen } from '@features/services/screens/ServicesScreen';

import type { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export function MainTabs() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  // ارتفاع پایه‌ی تب‌بار + فاصله‌ی امن پایین گوشی
  const baseHeight = 64;
  const bottomInset = insets.bottom;
  const tabBarHeight = baseHeight + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.colors.primary,
        tabBarInactiveTintColor: t.colors.textMuted,
        tabBarStyle: {
          backgroundColor: t.colors.surface,
          borderTopColor: t.colors.border,
          height: tabBarHeight,
          paddingBottom: bottomInset > 0 ? bottomInset : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: t.typography.caption.fontFamily,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          title: 'خدمات',
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: 'نوبت‌ها',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'پروفایل',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}