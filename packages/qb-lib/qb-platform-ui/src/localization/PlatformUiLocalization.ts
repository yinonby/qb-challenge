
import { getLocales, type Locale } from 'expo-localization';

type PlatformUiLocalizationT = {
  getDeviceLangCodeStr: () => string | null;
  getDeviceLocale: () => Locale;
}

export const usePlatformUiLocalization = (): PlatformUiLocalizationT => {
  const locales = getLocales() as [Locale, ...Locale[]]; // Guaranteed to contain at least 1 element.
  const firstLocale: Locale = locales[0];

  return {
    getDeviceLangCodeStr: () => firstLocale.languageCode,
    getDeviceLocale: () => locales[0],
  }
}
