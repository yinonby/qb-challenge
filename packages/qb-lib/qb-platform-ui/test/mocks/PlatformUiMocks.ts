
export const initPlatformUiMocks = () => {
  jest.mock('@qb/platform-ui', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require('react-native');

    const mock_usePlatformUiLocalization = jest.fn().mockReturnValue({ languageCode: 'en' });
    const mock_navigate = jest.fn();
    const mock_navigateReplace = jest.fn();
    const mock_useSearchParams = jest.fn();
    const mock_useSetSearchParams = jest.fn();

    return {
      __esModule: true,
      usePlatformUiLocalization: mock_usePlatformUiLocalization,
      usePlatformUiNavigation: () => ({
        navigate: mock_navigate,
        navigateReplace: mock_navigateReplace,
      }),
      useSearchParams: mock_useSearchParams,
      useSetSearchParams: mock_useSetSearchParams,
      PlatformUiLink: View,

      // expose for tests
      __puiMocks: {
        mock_navigate,
        mock_navigateReplace,
        mock_useSearchParams,
        mock_useSetSearchParams,
        mock_usePlatformUiLocalization,
      },
    };
  });
}
