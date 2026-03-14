
import type { Calendar, Locale } from 'expo-localization';
import * as ExpoLocalization from 'expo-localization';
import { usePlatformUiDeviceLocale, usePlatformUiLocalization } from './PlatformUiLocalization';

// mocks

jest.mock('expo-localization', () => ({
  // Provide a mocked getLocales function that tests can control.
  getLocales: jest.fn(),
  getCalendars: jest.fn(),
}));

// tests

describe('usePlatformUiLocalization', () => {
  const spy_getLocales = jest.spyOn(ExpoLocalization, 'getLocales');

  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(getLocale()).toEqual(first);
    expect(getLangCodeStr()).toEqual(first.languageCode);
  });
});

describe('usePlatformUiDeviceLocale', () => {
  const spy_getLocales = jest.spyOn(ExpoLocalization, 'getLocales');
  const spy_getCalendars = jest.spyOn(ExpoLocalization, 'getCalendars');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns values from first Locale and first Calendar, not all values present', () => {
    const firstLocale: Locale = {
      languageTag: 'MOCK_LANG_TAG_1',
    } as unknown as Locale;

    const secondLocale: Locale = {
      languageTag: 'MOCK_LANG_TAG_2',
    } as unknown as Locale;

    const firstCalendar: Calendar = {
    } as unknown as Calendar;

    const secondCalendar: Calendar = {
    } as unknown as Calendar;

    spy_getLocales.mockReturnValue([firstLocale, secondLocale]);
    spy_getCalendars.mockReturnValue([firstCalendar, secondCalendar]);

    const { langTag, langCode, timeZone } = usePlatformUiDeviceLocale();

    expect(spy_getLocales).toHaveBeenCalled();
    expect(spy_getCalendars).toHaveBeenCalled();
    expect(langTag).toEqual('MOCK_LANG_TAG_1');
    expect(langCode).toBeUndefined();
    expect(timeZone).toBeUndefined();
  });

  it('returns values from first Locale and first Calendar, all values present', () => {
    const firstLocale: Locale = {
      languageTag: 'MOCK_LANG_TAG_1',
      languageCode: 'MOCK_LANG_CODE_1',
    } as unknown as Locale;

    const secondLocale: Locale = {
      languageTag: 'MOCK_LANG_TAG_2',
      languageCode: 'MOCK_LANG_CODE_2',
    } as unknown as Locale;

    const firstCalendar: Calendar = {
      timeZone: 'MOCK_TIMEZONE_1',
    } as unknown as Calendar;

    const secondCalendar: Calendar = {
      timeZone: 'MOCK_TIMEZONE_2',
    } as unknown as Calendar;

    spy_getLocales.mockReturnValue([firstLocale, secondLocale]);
    spy_getCalendars.mockReturnValue([firstCalendar, secondCalendar]);

    const { langTag, langCode, timeZone } = usePlatformUiDeviceLocale();

    expect(spy_getLocales).toHaveBeenCalled();
    expect(spy_getCalendars).toHaveBeenCalled();
    expect(langTag).toEqual('MOCK_LANG_TAG_1');
    expect(langCode).toEqual('MOCK_LANG_CODE_1');
    expect(timeZone).toEqual('MOCK_TIMEZONE_1');
  });
});
