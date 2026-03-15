
import { DEFAULT_QB_LANG_CODE } from '@qb/models';
import { usePlatformUiLocalization } from '@qb/platform-ui';
import i18next, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// must be called from root _layout, before anything is rendered
export const initI18n = (resources: Resource) => {
  const { getDeviceLangCodeStr } = usePlatformUiLocalization();
  const fallbackLng = DEFAULT_QB_LANG_CODE;

  i18next
    .use(initReactI18next)
    .use({
      type: 'postProcessor',
      name: 'lowercase',
      process: (value: string) => value.toLowerCase(),
    })
    .init({
      resources,
      lng: getDeviceLangCodeStr() || DEFAULT_QB_LANG_CODE,
      fallbackLng,
      compatibilityJSON: 'v4',
      interpolation: {
        escapeValue: false
      }
    });
}
