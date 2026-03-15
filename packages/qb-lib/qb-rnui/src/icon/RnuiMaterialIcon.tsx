
import { MaterialIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

// Get all props for the component
type MaterialIconPropsT = ComponentProps<typeof MaterialIcons>;

// Get just the 'name' prop
export type RnuiMaterialIconNameT = MaterialIconPropsT['name'];
export type RnuiMaterialIconGlyphT = RnuiMaterialIconNameT;

export function RnuiMaterialIcon({
  name,
  size,
  style,
  indicateDisabled,
}: {
  name: RnuiMaterialIconGlyphT,
  size?: number,
  style?: StyleProp<TextStyle>,
  indicateDisabled?: boolean,
}) {
  const theme = useTheme();
  const textColor = indicateDisabled ? theme.colors.surfaceVariant : theme.colors.onSurface;
  const iconStyle = {
    color: textColor,
  }

  return <MaterialIcons testID='MaterialIconsTid' name={name} size={size} style={[iconStyle, style]}/>;
};
