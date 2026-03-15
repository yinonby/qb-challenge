
import { useWindowDimensions } from 'react-native';

export const smWidth = 480;
export const mdWidth = 768;
export const lgWidth = 1024;
export const xlWidth = 1280;

export type RnuiDimensionsT = {
  width: number,
  height: number,
  isXsScreen: boolean,
  isSmScreen: boolean,
  isMdScreen: boolean,
  isLgScreen: boolean,
  isXlScreen: boolean,
}

export const useRnuiDimensions = (): RnuiDimensionsT => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isXsScreen: width < smWidth,
    isSmScreen: width >= smWidth,
    isMdScreen: width >= mdWidth,
    isLgScreen: width >= lgWidth,
    isXlScreen: width >= xlWidth,
  };
}
