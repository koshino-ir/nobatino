import { Modal, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';

import { useTheme } from '@core/theme';
import { Button, Typography } from '@shared/ui';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function BookingSuccessDialog({ visible, onClose }: Props) {
    const t = useTheme();

    return (
        <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
            <Animated.View
                entering={FadeIn.duration(180)}
                exiting={FadeOut.duration(180)}
                style={{
                    flex: 1,
                    backgroundColor: t.colors.overlay,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: t.spacing.xl,
                }}
            >
                <Animated.View
                    entering={ZoomIn.duration(220)}
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: t.colors.surface,
                        borderRadius: t.radius['2xl'],
                        padding: t.spacing.xl,
                        alignItems: 'center',
                        gap: t.spacing.md,
                    }}
                >
                    <View
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: t.radius.full,
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography style={{ fontSize: 36 }}>✓</Typography>
                    </View>

                    <Typography variant="h2" align="center">
                        نوبت ثبت شد
                    </Typography>
                    <Typography variant="body" tone="secondary" align="center">
                        می‌توانید در تب «نوبت‌ها» وضعیت آن را ببینید
                    </Typography>

                    <Button
                        label="مشاهده نوبت‌ها"
                        fullWidth
                        onPress={onClose}
                        style={{ marginTop: t.spacing.md }}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}