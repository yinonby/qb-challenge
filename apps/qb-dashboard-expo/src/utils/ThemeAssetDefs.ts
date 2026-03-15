
import type { RnuiStylesT } from '@qb/rnui';
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';
import darkThemeJson from '../../assets/theme/darkTheme.json';
import lightThemeJson from '../../assets/theme/lightTheme.json';

export const contentPaddingHorizontal = 24;
export const contentPaddingVertical = 16;

// app theme hook
type AppThemeT = {
  lightTheme: MD3Theme,
  darkTheme: MD3Theme,
  rnuiStyles: RnuiStylesT,
}

export const useAppTheme = (): AppThemeT => {
  return {
    lightTheme: {
      ...MD3LightTheme,
      roundness: 8,
      colors: {
        ...MD3LightTheme.colors,
        ...lightThemeJson.colors,
      },
    },
    darkTheme: {
      ...MD3DarkTheme,
      roundness: 8,
      colors: {
        ...MD3DarkTheme.colors,
        ...darkThemeJson.colors,
      },
    },
    rnuiStyles: {
      xsButtonLabelStyle: {
        fontSize: 12,
        lineHeight: 16,
      },
      content: {
        paddingHorizontal: contentPaddingHorizontal,
        paddingVertical: contentPaddingVertical,
      },
    },
  };
}
