
export const initPlatformUiMocks = () => {
  jest.mock('@qb/platform-ui', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require('react-native');

    const mock_getDeviceLangCodeStr = jest.fn();
    const mock_navigate = jest.fn();
    const mock_navigateReplace = jest.fn();
    const mock_useSearchParams = jest.fn();
    const mock_useSetParams = jest.fn();
    const mock_useSetSearchParams = jest.fn().mockReturnValue({
      setParams: mock_useSetParams,
    });
    const mock_getStorageItem = jest.fn();
    const mock_setStorageItem = jest.fn();
    const mock_isWeb = jest.fn();
    const mock_isIos = jest.fn();
    const mock_usePlatformUiDeviceLocale = jest.fn();

    return {
      __esModule: true,
      PlatformUiLink: View,

      usePlatformUiDeviceLocale: mock_usePlatformUiDeviceLocale,
      usePlatformUiLocalization: () => ({
        getDeviceLangCodeStr: mock_getDeviceLangCodeStr,
      }),
      usePlatformUiNavigation: () => ({
        navigate: mock_navigate,
        navigateReplace: mock_navigateReplace,
      }),
      useSearchParams: mock_useSearchParams,
      useSetSearchParams: mock_useSetSearchParams,
      useStorage: () => ({
        getStorageItem: mock_getStorageItem,
        setStorageItem: mock_setStorageItem,
      }),
      isWeb: mock_isWeb,
      isIos: mock_isIos,

      // expose for tests
      __puiMocks: {
        mock_usePlatformUiDeviceLocale,
        mock_getDeviceLangCodeStr,
        mock_navigate,
        mock_navigateReplace,
        mock_useSearchParams,
        mock_useSetSearchParams,
        mock_useSetParams,
        mock_getStorageItem,
        mock_setStorageItem,
        mock_isWeb,
        mock_isIos,
      },
    };
  });
}
