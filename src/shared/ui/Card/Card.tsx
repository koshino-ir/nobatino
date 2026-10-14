import { View, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '@core/theme';

interface CardProps extends ViewProps {
  padded?: boolean;
  elevated?: boolean;
  style?: ViewStyle | ViewStyle[];
}

function CardRoot({ padded = true, elevated = true, style, children, ...rest }: CardProps) {
  const t = useTheme();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: t.colors.surface,
          borderRadius: t.radius.xl,
          borderWidth: 1,
          borderColor: t.colors.border,
          padding: padded ? t.spacing.lg : 0,
          shadowColor: elevated ? t.colors.shadow : 'transparent',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: elevated ? 2 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function CardHeader({ children, style, ...rest }: ViewProps) {
  return (
    <View {...rest} style={[{ marginBottom: 8 }, style]}>
      {children}
    </View>
  );
}

function CardBody({ children, style, ...rest }: ViewProps) {
  return (
    <View {...rest} style={style}>
      {children}
    </View>
  );
}

function CardFooter({ children, style, ...rest }: ViewProps) {
  return (
    <View {...rest} style={[{ marginTop: 12 }, style]}>
      {children}
    </View>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
