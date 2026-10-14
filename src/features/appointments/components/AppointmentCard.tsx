import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '@core/theme';
import { formatJalaliShort, formatTime, isWithin24h } from '@core/utils';
import { Button, Card, ConfirmDialog, Typography } from '@shared/ui';

import type { Appointment } from '../domain/types';
import { StatusBadge } from './StatusBadge';

interface Props {
    appointment: Appointment;
    index?: number;
    onCancel?: (id: string) => void;
    isCancelling?: boolean;
}

export function AppointmentCard({
    appointment,
    index = 0,
    onCancel,
    isCancelling,
}: Props) {
    const t = useTheme();
    const [confirmVisible, setConfirmVisible] = useState(false);

    const isCancellable =
        appointment.status === 'confirmed' || appointment.status === 'pending';
    const late = isWithin24h(appointment.startsAt);

    const handleConfirm = () => {
        setConfirmVisible(false);
        onCancel?.(appointment.id);
    };

    return (
        <>
            <Animated.View entering={FadeInDown.duration(280).delay(index * 50)}>
                <Card style={{ marginBottom: t.spacing.md }}>
                    <Card.Body>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h3">{appointment.serviceTitle}</Typography>
                            <StatusBadge status={appointment.status} />
                        </View>

                        <View style={{ marginTop: t.spacing.md, gap: t.spacing.xs }}>
                            <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
                                <Typography variant="caption" tone="muted">📅</Typography>
                                <Typography variant="body" tone="secondary">
                                    {formatJalaliShort(appointment.startsAt)} — ساعت{' '}
                                    {formatTime(appointment.startsAt)}
                                </Typography>
                            </View>

                            <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
                                <Typography variant="caption" tone="muted">👤</Typography>
                                <Typography variant="body" tone="secondary">
                                    {appointment.staffName}
                                </Typography>
                            </View>
                        </View>

                        {isCancellable && onCancel ? (
                            <View
                                style={{
                                    marginTop: t.spacing.md,
                                    paddingTop: t.spacing.md,
                                    borderTopWidth: 1,
                                    borderTopColor: t.colors.border,
                                }}
                            >
                                <Button
                                    label="لغو نوبت"
                                    variant="outline"
                                    size="sm"
                                    loading={isCancelling}
                                    onPress={() => setConfirmVisible(true)}
                                    fullWidth
                                />
                            </View>
                        ) : null}
                    </Card.Body>
                </Card>
            </Animated.View>

            <ConfirmDialog
                visible={confirmVisible}
                title={late ? 'لغو دیرهنگام' : 'لغو نوبت'}
                description={
                    late
                        ? 'زمان نوبت شما کمتر از ۲۴ ساعت دیگر است. با این حال می‌خواهید لغو کنید؟'
                        : 'آیا از لغو این نوبت مطمئن هستید؟'
                }
                confirm={{
                    label: 'لغو نوبت',
                    variant: 'danger',
                    onPress: handleConfirm,
                    loading: isCancelling,
                }}
                cancel={{
                    label: 'انصراف',
                    onPress: () => setConfirmVisible(false),
                }}
                onRequestClose={() => setConfirmVisible(false)}
            />
        </>
    );
}