import { Modal, Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';

import { useTheme } from '@core/theme';

import { Button } from '../Button';
import { Typography } from '../Typography';

export interface ConfirmDialogAction {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    loading?: boolean;
}

interface Props {
    visible: boolean;
    title: string;
    description?: string;
    confirm: ConfirmDialogAction;
    cancel?: ConfirmDialogAction;
    onRequestClose?: () => void;
}

export function ConfirmDialog({
    visible,
    title,
    description,
    confirm,
    cancel,
    onRequestClose,
}: Props) {
    const t = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onRequestClose}
        >
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
                <Pressable
                    style={{ position: 'absolute', inset: 0 }}
                    onPress={onRequestClose}
                    accessibilityLabel="بستن"
                />

                <Animated.View
                    entering={ZoomIn.duration(200)}
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: t.colors.surface,
                        borderRadius: t.radius['2xl'],
                        padding: t.spacing.xl,
                        gap: t.spacing.md,
                    }}
                >
                    <Typography variant="h3" align="right">
                        {title}
                    </Typography>

                    {description ? (
                        <Typography variant="body" tone="secondary" align="right">
                            {description}
                        </Typography>
                    ) : null}

                    <View
                        style={{
                            flexDirection: 'row',
                            gap: t.spacing.sm,
                            marginTop: t.spacing.md,
                        }}
                    >
                        {cancel ? (
                            <Button
                                label={cancel.label}
                                variant={cancel.variant ?? 'outline'}
                                onPress={cancel.onPress}
                                loading={cancel.loading}
                                style={{ flex: 1 }}
                            />
                        ) : null}
                        <Button
                            label={confirm.label}
                            variant={confirm.variant ?? 'primary'}
                            onPress={confirm.onPress}
                            loading={confirm.loading}
                            style={{ flex: 1 }}
                        />
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}