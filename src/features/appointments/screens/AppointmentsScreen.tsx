import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, RefreshControl, View } from 'react-native';

import { useTheme } from '@core/theme';
import { useResponsive } from '@shared/hooks';
import { EmptyState, Screen, Typography } from '@shared/ui';

import { AppointmentCard, AppointmentListSkeleton } from '../components';
import { useAppointments, useCancelAppointment } from '../hooks';
import { FILTER_LABELS, filterAppointments, type AppointmentFilter } from '../utils/filters';

export function AppointmentsScreen() {
  const t = useTheme();
  const r = useResponsive();
  const [filter, setFilter] = useState<AppointmentFilter>('upcoming');

  const { data, isLoading, isError, refetch, isRefetching } = useAppointments();
  const cancelMutation = useCancelAppointment();

  const filtered = useMemo(() => filterAppointments(data ?? [], filter), [data, filter]);

  const handleCancel = (id: string) => {
    cancelMutation.mutate(id);
  };

  if (isError) {
    return (
      <Screen>
        <EmptyState
          icon="😕"
          title="مشکلی پیش آمد"
          description="اتصال به سرور برقرار نشد"
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
        <Typography variant="h1">نوبت‌های من</Typography>
        <Typography variant="body" tone="secondary">
          مدیریت و پیگیری نوبت‌ها
        </Typography>
      </View>

      {/* فیلترها */}
      <View
        style={{
          flexDirection: 'row',
          gap: t.spacing.sm,
          paddingHorizontal: r.gutter,
          marginBottom: t.spacing.lg,
        }}
      >
        {(Object.keys(FILTER_LABELS) as AppointmentFilter[]).map((f) => {
          const active = f === filter;
          const count = filterAppointments(data ?? [], f).length;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={{
                paddingHorizontal: t.spacing.md,
                paddingVertical: t.spacing.sm,
                borderRadius: t.radius.full,
                backgroundColor: active ? t.colors.primary : t.colors.surface,
                borderWidth: 1,
                borderColor: active ? t.colors.primary : t.colors.border,
              }}
            >
              <Typography
                variant="caption"
                style={{
                  color: active ? t.colors.primaryContrast : t.colors.textSecondary,
                  fontFamily: t.typography.bodyStrong.fontFamily,
                }}
              >
                {FILTER_LABELS[f]} ({count})
              </Typography>
            </Pressable>
          );
        })}
      </View>

      {/* لیست */}
      {isLoading ? (
        <View style={{ paddingHorizontal: r.gutter }}>
          <AppointmentListSkeleton count={3} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AppointmentCard
              appointment={item}
              index={index}
              onCancel={handleCancel}
              isCancelling={cancelMutation.isPending && cancelMutation.variables === item.id}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: r.gutter,
            paddingBottom: t.spacing['2xl'],
          }}
          ListEmptyComponent={
            <EmptyState
              icon={filter === 'upcoming' ? '🗓' : '📭'}
              title={
                filter === 'upcoming'
                  ? 'نوبت پیش‌رویی نداری'
                  : filter === 'past'
                    ? 'نوبتی در گذشته نداری'
                    : 'هنوز نوبتی ثبت نکردی'
              }
              description={filter === 'upcoming' ? 'از تب خدمات یک نوبت جدید رزرو کن' : undefined}
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
