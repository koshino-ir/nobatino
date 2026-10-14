import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { RootStackParamList } from '@/app/navigation/types';
import { useTheme } from '@core/theme';
import { useResponsive } from '@shared/hooks';
import { EmptyState, Screen, Typography } from '@shared/ui';

import { ServiceCard, ServiceListSkeleton } from '../components';
import type { Service } from '../domain/types';
import { useServices } from '../hooks';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ServicesScreen() {
  const t = useTheme();
  const r = useResponsive();
  const nav = useNavigation<Nav>();
  const { data, isLoading, isError, refetch, isRefetching } = useServices();

  const handlePress = useCallback(
    (service: Service) => {
      nav.navigate('Booking', { serviceId: service.id });
    },
    [nav],
  );

  // صفحه‌ی خطا
  if (isError) {
    return (
      <Screen>
        <EmptyState
          icon="😕"
          title="مشکلی پیش آمد"
          description="اتصال به سرور برقرار نشد. دوباره تلاش کنید."
          actionLabel="تلاش مجدد"
          onAction={() => refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      {/* هدر */}
      <View
        style={{
          paddingHorizontal: r.gutter,
          paddingTop: t.spacing.md,
          paddingBottom: t.spacing.lg,
          gap: t.spacing.xs,
        }}
      >
        <Typography variant="h1">خدمات</Typography>
        <Typography variant="body" tone="secondary">
          یکی از خدمات زیر را انتخاب کنید
        </Typography>
      </View>

      {/* لیست */}
      {isLoading ? (
        <View style={{ paddingHorizontal: r.gutter }}>
          <ServiceListSkeleton count={4} />
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ServiceCard service={item} index={index} onPress={handlePress} />
          )}
          key={r.columns} // گرید با تغییر ستون‌ها دوباره رندر می‌شود
          numColumns={r.columns}
          columnWrapperStyle={
            r.columns > 1 ? { gap: r.gutter, paddingHorizontal: r.gutter } : undefined
          }
          contentContainerStyle={{
            paddingHorizontal: r.columns === 1 ? r.gutter : 0,
            paddingBottom: t.spacing['2xl'],
          }}
          ListEmptyComponent={
            <EmptyState
              icon="🗂"
              title="خدمتی موجود نیست"
              description="به‌زودی خدمات جدید اضافه می‌شود"
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isLoading}
              onRefresh={refetch}
              tintColor={t.colors.primary}
              colors={[t.colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
