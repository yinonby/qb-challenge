

import type { AppLocalizationContextT } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import type { AppTranslationKeyT, QbLangCodeT } from '@qb/models';
import { initPlatformUiMocks } from '@qb/platform-ui/test-utils';
import { initReactNativeMocks } from '@qb/rn-testing';
import { initRnuiMocks } from '@qb/rnui/test-utils';
import '@testing-library/jest-native/extend-expect';


beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

initReactNativeMocks();
initRnuiMocks();
initPlatformUiMocks();

declare module '@qb/rnui' {
  export const __rnuiMocks: {
    mock_useRnuiDimensions: jest.Mock,
  };
}

declare module '@qb/platform-ui' {
  export const __puiMocks: {
    mock_usePlatformUiDeviceLocale: jest.Mock,
    mock_getDeviceLangCodeStr: jest.Mock,
    mock_navigate: jest.Mock,
    mock_navigateReplace: jest.Mock,
    mock_useSearchParams: jest.Mock,
    mock_useSetSearchParams: jest.Mock,
    mock_useSetParams: jest.Mock,
    mock_usePlatformUiLocalization: jest.Mock,
    mock_getStorageItem: jest.Mock,
    mock_setStorageItem: jest.Mock,
    mock_isIos: jest.Mock,
    mock_isWeb: jest.Mock,
  };
}

jest.mock('expo-status-bar', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    StatusBar: View,
  };
});

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => {
  const mock_t = jest.fn();
  const mock_onLangCodeChange = jest.fn();
  const mock_langCode = 'en';
  const mock_useAppLocalization = (): AppLocalizationContextT => ({
    langCode: mock_langCode,
    onLangCodeChange: mock_onLangCodeChange,
    t: mock_t.mockImplementation((tKey: AppTranslationKeyT) => "mocked-t-" + tKey),
  });

  return {
    useAppLocalization: mock_useAppLocalization,

    __appLocalizationMocks: {
      mock_useAppLocalization,
      mock_langCode,
      mock_onLangCodeChange,
      mock_t,
    }
  }
});

declare module '@qb-dashboard-ui/app/localization/AppLocalizationProvider' {
  export const __appLocalizationMocks: {
    mock_useAppLocalization: jest.Mock,
    mock_langCode: QbLangCodeT,
    mock_onLangCodeChange: jest.Mock,
    mock_t: jest.Mock,
  };
}
