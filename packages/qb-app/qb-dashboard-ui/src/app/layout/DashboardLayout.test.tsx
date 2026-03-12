
import * as ClientLogger from '@qb-dashboard-ui/logger/ClientLogger';
import { __puiMocks } from '@qb/platform-ui';
import type { LoggerAdapter } from '@qb/utils';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactNative from 'react-native';
import { Text } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { DashboardLayout, useDashboard, type DashboardContextT } from './DashboardLayout';

// mocks

jest.mock('@qb-dashboard-ui/app/redux/reducers/AppReduxStore', () => ({
  createReduxStore: jest.fn(() => ({
    getState: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  })),
}));

jest.mock('react-redux', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Provider: View,
  };
});

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AppLocalizationProvider: View,
  };
});

jest.mock('../error-handling/AppErrorHandlingProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AppErrorHandlingProvider: View,
  };
});

// tests

describe('DashboardLayout', () => {
  const { mock_getStorageItem, mock_setStorageItem } = __puiMocks;
  const lightTheme = {} as MD3Theme;
  const darkTheme = {} as MD3Theme;
  const rnuiStyles = {};
  const spy_useColorScheme = jest.spyOn(ReactNative, 'useColorScheme');

  const spy_useClientLogger = jest.spyOn(ClientLogger, 'useClientLogger');
  spy_useClientLogger.mockReturnValue({
    error: jest.fn(),
  } as unknown as LoggerAdapter);

  beforeEach(() => {
    jest.clearAllMocks();

    spy_useColorScheme.mockReturnValue(null);
    mock_setStorageItem.mockReset();
  });

  it('renders children after initialization', async () => {
    mock_getStorageItem.mockResolvedValue(null);

    const { getByText } = render(
      <DashboardLayout
        apiUrl="api"
        appHeaderHeight={10}
        productsPerPage={20}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        rnuiStyles={rnuiStyles}
      >
        <Text>Child</Text>
      </DashboardLayout>
    );

    await waitFor(() => {
      expect(getByText('Child')).toBeTruthy();
    });
  });

  it('loads theme from storage', async () => {
    mock_getStorageItem.mockResolvedValue('dark');

    let themeMode: string | undefined;

    const TestComponent = () => {
      const dashboard = useDashboard();
      themeMode = dashboard.themeMode;
      return null;
    };

    render(
      <DashboardLayout
        apiUrl="api"
        appHeaderHeight={10}
        productsPerPage={20}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        rnuiStyles={rnuiStyles}
      >
        <TestComponent />
      </DashboardLayout>
    );

    await waitFor(() => {
      expect(themeMode).toBe('dark');
    });
  });

  it('updates theme via onChangeThemeMode', async () => {
    spy_useColorScheme.mockReturnValue('light');
    mock_getStorageItem.mockResolvedValue(null);

    let onChangeThemeMode!: (themeMode: 'light' | 'dark') => Promise<void>;
    let themeMode!: 'light' | 'dark';

    const TestComponent = () => {
      const dashboard = useDashboard();
      onChangeThemeMode = dashboard.onChangeThemeMode;
      themeMode = dashboard.themeMode;
      return null;
    };

    render(
      <DashboardLayout
        apiUrl="api"
        appHeaderHeight={10}
        productsPerPage={20}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        rnuiStyles={rnuiStyles}
      >
        <TestComponent />
      </DashboardLayout>
    );

    await waitFor(() => expect(onChangeThemeMode).toBeDefined());
    expect(themeMode).toEqual('light');

    // change theme
    act(() => {
      onChangeThemeMode('dark');
    });

    // wait for change
    await waitFor(() =>
      expect(themeMode).toEqual('dark')
    );

    // wait for storage update
    await waitFor(() =>
      expect(mock_setStorageItem).toHaveBeenCalledWith('themeModeKey', 'dark')
    );
  });

  it('updates theme via onChangeThemeMode fails', async () => {
    spy_useColorScheme.mockReturnValue('light');
    mock_getStorageItem.mockResolvedValue(null);
    mock_setStorageItem.mockRejectedValue('ERROR');

    let onChangeThemeMode!: (themeMode: 'light' | 'dark') => Promise<void>;
    let themeMode!: 'light' | 'dark';

    const TestComponent = () => {
      const dashboard = useDashboard();
      onChangeThemeMode = dashboard.onChangeThemeMode;
      themeMode = dashboard.themeMode;
      return null;
    };

    render(
      <DashboardLayout
        apiUrl="api"
        appHeaderHeight={10}
        productsPerPage={20}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        rnuiStyles={rnuiStyles}
      >
        <TestComponent />
      </DashboardLayout>
    );

    await waitFor(() => expect(onChangeThemeMode).toBeDefined());
    expect(themeMode).toEqual('light');

    // change theme
    act(() => {
      onChangeThemeMode('dark');
    });

    // wait for change
    await waitFor(() =>
      expect(themeMode).toEqual('dark')
    );

    // wait for storage update
    await waitFor(() =>
      expect(mock_setStorageItem).toHaveBeenCalledWith('themeModeKey', 'dark')
    );

    // wait for revert
    await waitFor(() =>
      expect(themeMode).toEqual('light')
    );
  });

  it('provides context values', async () => {
    mock_getStorageItem.mockResolvedValue(null);

    let dashboard!: DashboardContextT;

    const TestComponent = () => {
      dashboard = useDashboard();
      return null;
    };

    render(
      <DashboardLayout
        apiUrl="api-url"
        appHeaderHeight={50}
        productsPerPage={30}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        rnuiStyles={rnuiStyles}
      >
        <TestComponent />
      </DashboardLayout>
    );

    await waitFor(() => {
      expect(dashboard).toBeDefined();
    });

    expect(dashboard.apiUrl).toBe('api-url');
    expect(dashboard.appHeaderHeight).toBe(50);
    expect(dashboard.productsPerPage).toBe(30);
  });
});
