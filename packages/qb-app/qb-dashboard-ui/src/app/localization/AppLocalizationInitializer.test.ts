
import { DEFAULT_QB_LANG_CODE } from '@qb/models';
import { __puiMocks } from '@qb/platform-ui';
import type { PostProcessorModule, Resource } from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { initI18n } from './AppLocalizationInitializer';

jest.mock('i18next', () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
}));

describe('AppLocalizationInitializer', () => {
  const { mock_getDeviceLangCodeStr } = __puiMocks;
  const spy_use = jest.spyOn(i18next, 'use');
  const spy_init = jest.spyOn(i18next, 'init');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls i18next.use with initReactI18next, postProcessor, and init with provided languageCode', () => {
    mock_getDeviceLangCodeStr.mockReturnValue('MOCK_DEVICE_LANG');

    const resources = { fr: { translation: { key: 'val' } } } as unknown as Resource;
    initI18n(resources);

    expect(spy_use).toHaveBeenCalledTimes(2);
    expect(spy_use).toHaveBeenNthCalledWith(1, initReactI18next);

    const postProcessor = spy_use.mock.calls[1][0] as PostProcessorModule;
    expect(postProcessor.type).toEqual('postProcessor');
    expect(postProcessor.name).toEqual('lowercase');
    expect(postProcessor.process('AaA', 'key', {}, {})).toEqual('aaa');

    expect(spy_init).toHaveBeenCalledWith(
      expect.objectContaining({
        resources,
        lng: 'MOCK_DEVICE_LANG',
        fallbackLng: DEFAULT_QB_LANG_CODE,
        compatibilityJSON: 'v4',
        interpolation: { escapeValue: false },
      })
    );
  });

  it('falls back to "en" when languageCode is not provided', () => {
    mock_getDeviceLangCodeStr.mockReturnValue(null);

    const resources = { en: { translation: { key: 'val' } } } as unknown as Resource;
    initI18n(resources);

    expect(spy_use).toHaveBeenCalledWith(initReactI18next);
    expect(spy_init).toHaveBeenCalledWith(
      expect.objectContaining({
        resources,
        lng: DEFAULT_QB_LANG_CODE,
        fallbackLng: DEFAULT_QB_LANG_CODE,
      })
    );
  });
});