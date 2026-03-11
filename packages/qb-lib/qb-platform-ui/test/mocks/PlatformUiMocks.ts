
export const initPlatformUiMocks = () => {
  jest.mock('@qb/platform-ui', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require('react-native');

    const navigateMock = jest.fn();
    const navigateReplaceMock = jest.fn();

    return {
      __esModule: true,
      usePlatformUiNavigation: () => ({
        navigate: navigateMock,
        navigateReplace: navigateReplaceMock,
      }),
      PlatformUiLink: View,

      // expose for tests
      __puiMocks: {
        navigateMock,
        navigateReplaceMock,
      },
    };
  });
}
