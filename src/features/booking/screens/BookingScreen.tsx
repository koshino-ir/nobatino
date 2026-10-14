import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/app/navigation/types';
import { useTheme } from '@core/theme';
import { formatPrice, formatToJalali, toPersianDigits } from '@core/utils';
import { useService } from '@features/services/hooks';
import { useResponsive } from '@shared/hooks';
import { Button, EmptyState, Screen, Typography } from '@shared/ui';

import { BookingSummary, SlotGrid, StaffPicker, StepIndicator } from '../components';
import type { BookingStep, Slot, Staff } from '../domain/types';
import { useCreateBooking, useStaff, useTimeSlots } from '../hooks';
import { useBookingDraft } from '../store/bookingDraft.store';
import { BookingSuccessDialog } from '../components/BookingSuccessDialog';


const STEPS: { key: BookingStep; label: string }[] = [
    { key: 'staff', label: 'آرایشگر' },
    { key: 'datetime', label: 'زمان' },
    { key: 'confirm', label: 'تایید' },
];
type Nav = NativeStackNavigationProp<RootStackParamList>;

export function BookingScreen() {
    const t = useTheme();
    const nav = useNavigation<Nav>();
    const defaultStyles = useDefaultStyles(t.scheme);
    const r = useResponsive();
    const route = useRoute<RouteProp<RootStackParamList, 'Booking'>>();
    const { serviceId } = route.params;

    const [step, setStep] = useState<BookingStep>('staff');
    const [successVisible, setSuccessVisible] = useState(false);

    const { setService, setStaff, setDate, setSlot, reset, ...draft } = useBookingDraft();

    useEffect(() => {
        setService(serviceId);
        return () => reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceId]);

    const { data: service } = useService(serviceId);
    const { data: staff, isLoading: staffLoading } = useStaff(serviceId);
    const { data: slots, isLoading: slotsLoading } = useTimeSlots(draft.staffId, draft.date);
    const createBooking = useCreateBooking();

    const currentStepIndex = STEPS.findIndex((s) => s.key === step);

    const selectedStaff = useMemo(
        () => staff?.find((s) => s.id === draft.staffId) ?? null,
        [staff, draft.staffId],
    );

    const canContinue =
        (step === 'staff' && Boolean(draft.staffId)) ||
        (step === 'datetime' && Boolean(draft.date && draft.slotId)) ||
        step === 'confirm';

    const handleStaffSelect = (s: Staff) => {
        setStaff(s.id);
        setStep('datetime');
    };

    const handleSlotSelect = (slot: Slot) => {
        setSlot(slot.id, slot.startsAt);
    };

    const handleSubmit = () => {
        if (!draft.slotId || !draft.staffId) return;
        createBooking.mutate(
            {
                serviceId,
                staffId: draft.staffId,
                startsAt: draft.slotsStartAt!,
                serviceTitle: service?.title,
                staffName: selectedStaff?.name,
            },
            {
                onSuccess: () => {
                    setSuccessVisible(true);
                },
                onError: () => {
                    // اینجا هم بهتره از ConfirmDialog برای خطا استفاده کنی
                    // یا فعلاً همون Alert رو نگه دار
                    Alert.alert('خطا', 'ثبت نوبت انجام نشد. دوباره تلاش کنید.');
                },
            }
        );
    };

    const renderStep = () => {
        if (step === 'staff') {
            if (staffLoading) {
                return <EmptyState icon="⏳" title="در حال بارگذاری آرایشگران..." />;
            }
            return (
                <StaffPicker staff={staff ?? []} selected={draft.staffId} onSelect={handleStaffSelect} />
            );
        }

        if (step === 'datetime') {
            const selectedDate = draft.date ? new Date(draft.date) : undefined;

            return (
                <View style={{ gap: t.spacing.lg }}>
                    <View style={{ gap: t.spacing.sm }}>
                        <Typography variant="h3">انتخاب تاریخ</Typography>
                        <DateTimePicker
                            mode="single"
                            calendar="jalali"
                            locale="fa"
                            date={selectedDate}
                            minDate={new Date()}
                            firstDayOfWeek={6}
                            onChange={({ date }) => {
                                if (date) {
                                    const d = new Date(date as string | Date);
                                    const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                    setDate(ymd);
                                }
                            }}
                            styles={defaultStyles}
                        />
                    </View>

                    {draft.date ? (
                        <View style={{ gap: t.spacing.sm }}>
                            <Typography variant="h3">انتخاب ساعت</Typography>
                            {slotsLoading ? (
                                <Typography variant="body" tone="muted">
                                    در حال بارگذاری...
                                </Typography>
                            ) : slots && slots.length > 0 ? (
                                <SlotGrid slots={slots} selected={draft.slotId} onSelect={handleSlotSelect} />
                            ) : (
                                <Typography variant="body" tone="muted">
                                    زمان خالی موجود نیست
                                </Typography>
                            )}
                        </View>
                    ) : null}
                </View>
            );
        }

        // confirm
        const dateObj = draft.date ? new Date(draft.date) : null;
        const dateLabel = dateObj ? formatToJalali(dateObj) : '—';

        const timeLabel = draft.slotsStartAt
            ? toPersianDigits(new Date(draft.slotsStartAt).toTimeString().slice(0, 5))
            : '—';

        return (
            <View style={{ gap: t.spacing.lg }}>
                <BookingSummary
                    rows={[
                        { label: 'خدمت', value: service?.title ?? '—' },
                        { label: 'آرایشگر', value: selectedStaff?.name ?? '—' },
                        { label: 'تاریخ', value: dateLabel },
                        { label: 'ساعت', value: timeLabel },
                        { label: 'هزینه', value: service ? `${formatPrice(service.price)} تومان` : '—' },
                    ]}
                />
                <Typography variant="caption" tone="muted" align="center">
                    با ثبت نوبت، قوانین لغو ۲۴ ساعت قبل اعمال می‌شود
                </Typography>
            </View>
        );
    };

    return (
        <Screen padded={false}>
            <ScrollView
                contentContainerStyle={{
                    padding: r.gutter,
                    paddingBottom: 120,
                    gap: t.spacing.lg,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <StepIndicator steps={STEPS} current={currentStepIndex} />
                {renderStep()}
            </ScrollView>

            {/* Bottom bar */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: r.gutter,
                    paddingBottom: r.gutter + 8,
                    backgroundColor: t.colors.background,
                    borderTopWidth: 1,
                    borderTopColor: t.colors.border,
                    flexDirection: 'row',
                    gap: t.spacing.sm,
                }}
            >
                {step !== 'staff' ? (
                    <Button
                        label="بازگشت"
                        variant="outline"
                        onPress={() => setStep(step === 'confirm' ? 'datetime' : 'staff')}
                    />
                ) : null}
                {step !== 'confirm' ? (
                    <Button
                        label="ادامه"
                        fullWidth
                        disabled={!canContinue}
                        onPress={() => setStep(step === 'staff' ? 'datetime' : 'confirm')}
                    />
                ) : (
                    <Button
                        label="ثبت نوبت"
                        fullWidth
                        loading={createBooking.isPending}
                        disabled={!draft.isComplete()}
                        onPress={handleSubmit}
                    />
                )}
                <BookingSuccessDialog
                    visible={successVisible}
                    onClose={() => {
                        setSuccessVisible(false);
                        reset();
                        nav.reset({
                            index: 0,
                            routes: [{ name: 'Main', params: { screen: 'Appointments' } }],
                        });
                    }}
                />
            </View>
        </Screen>
    );
}
