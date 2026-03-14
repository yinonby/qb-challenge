
import { getCalendars, getLocales, type Locale } from 'expo-localization';

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

type PlatformUiDeviceLocaleT = {
  langTag: string,
  langCode?: string,
  timeZone?: string,
}

export const usePlatformUiDeviceLocale = (): PlatformUiDeviceLocaleT => {
  const locale = getLocales()[0]; // Guaranteed to contain at least 1 element.
  const calendar = getCalendars()[0]; // Guaranteed to contain at least 1 element.

  return {
    langTag: locale.languageTag,
    langCode: locale.languageCode || undefined,
    timeZone: calendar.timeZone || undefined,
  }
}
