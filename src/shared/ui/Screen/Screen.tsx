import { ScrollView, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@core/theme';

interface Props extends ViewProps {
  scroll?: boolean;
  padded?: boolean;
  edges?: ('top' | 'bottom')[];
}

export function Screen({
  scroll = false,
  padded = true,
  edges = ['top', 'bottom'],
  style,
  children,
  ...rest
}: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = edges.includes('top') ? insets.top : 0;
  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;

  const content = (
    <View
      {...rest}
      style={[
        {
          flex: 1,
          backgroundColor: t.colors.background,
          paddingTop,
          paddingBottom,
          paddingHorizontal: padded ? t.spacing.lg : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!scroll) return content;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.colors.background }}
      contentContainerStyle={{
        paddingTop,
        paddingBottom: paddingBottom + t.spacing.xl,
        paddingHorizontal: padded ? t.spacing.lg : 0,
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
