
import type { Locale } from 'expo-localization';
import * as ExpoLocalization from 'expo-localization';
import { usePlatformUiLocalization } from './PlatformUiLocalization';

// mocks

jest.mock('expo-localization', () => ({
  // Provide a mocked getLocales function that tests can control.
  getLocales: jest.fn(),
}));

// tests

describe('usePlatformUiLocalization', () => {
  const spy_getLocales = jest.spyOn(ExpoLocalization, "getLocales");

  beforeEach(() => {
    spy_getLocales.mockReset();
  });

  it('returns the first locale from getLocales', () => {
    const first: Locale = {
      languageTag: 'en-US',
    } as unknown as Locale;

    const second: Locale = {
      languageTag: 'fr-FR',
    } as unknown as Locale;

    spy_getLocales.mockReturnValue([first, second]);

    const { getDeviceLangCodeStr: getLangCodeStr, getDeviceLocale: getLocale } = usePlatformUiLocalization();

    expect(spy_getLocales).toHaveBeenCalled();
    expect(getLocale()).toBe(first);
    expect(getLangCodeStr()).toBe(first.languageCode);
  });
});
