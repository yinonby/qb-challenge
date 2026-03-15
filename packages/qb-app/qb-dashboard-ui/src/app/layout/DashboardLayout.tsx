
import { AppLocalizationProvider } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { createReduxStore } from '@qb-dashboard-ui/app/redux/reducers/AppReduxStore';
import { CartProvider } from '@qb-dashboard-ui/features/cart/context/CartProvider';
import { InventoryUpdateProvider } from '@qb-dashboard-ui/features/dashboard/inventory/context/InventoryUpdateProvider';
import { useClientLogger } from '@qb-dashboard-ui/logger/ClientLogger';
import type { DashboardRouterAdapter } from '@qb-dashboard-ui/types/DashboardTypes';
import { useStorage } from '@qb/platform-ui';
import { RnuiProvider, type RnuiStylesT } from '@qb/rnui';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { AppErrorHandlingProvider } from '../error-handling/AppErrorHandlingProvider';

const themeModeStorageKey = 'themeModeKey';

export interface DashboardContextT {
  apiUrl: string,
  appHeaderHeight: number,
  productsPerPage: number,
  themeMode: 'light' | 'dark',
  onChangeThemeMode: (newThemeMode: 'light' | 'dark') => Promise<void>,
  dashboardRouterAdapter: DashboardRouterAdapter,
}

const DashboardContext = createContext<DashboardContextT | undefined>(undefined);

export type DashboardLayoutPropsT = {
  lightTheme: MD3Theme,
  darkTheme: MD3Theme,
  rnuiStyles: RnuiStylesT,
  apiUrl: string,
  appHeaderHeight: number,
  productsPerPage: number,
  dashboardRouterAdapter: DashboardRouterAdapter,
}

export const DashboardLayout: FC<PropsWithChildren<DashboardLayoutPropsT>> = (props) => {
  const { lightTheme, darkTheme, rnuiStyles, apiUrl, children } = props;
  const colorSchemeName: ColorSchemeName = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(colorSchemeName ?? 'light');
  const reduxStore = createReduxStore(apiUrl);
  const [isInitialized, setIsInitialized] = useState(false);
  const { getStorageItem, setStorageItem } = useStorage();
  const isDarkMode = themeMode === 'dark';
  const logger = useClientLogger();

  const handleChangeThemeMode = async (newThemeMode: 'light' | 'dark'): Promise<void> => {
    const curThemeMode = themeMode;

    setThemeMode(newThemeMode); // optimistic update

    try {
      await setStorageItem(themeModeStorageKey, newThemeMode);
    } catch (error: unknown) {
      logger.error('Unexpected error when updating theme, reverting', error);
      setThemeMode(curThemeMode);
    }
  }

  const context: DashboardContextT = {
    apiUrl,
    appHeaderHeight: props.appHeaderHeight,
    productsPerPage: props.productsPerPage,
    themeMode,
    onChangeThemeMode: handleChangeThemeMode,
    dashboardRouterAdapter: props.dashboardRouterAdapter,
  }

  useEffect(() => {
    if (!isInitialized) {
      (async (): Promise<void> => {
        const _themeMode: string | null = await getStorageItem(themeModeStorageKey);
        if (_themeMode !== null) {
          setThemeMode(_themeMode as 'light' | 'dark');
        }
        setIsInitialized(true);
      })();
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return (
    <RnuiProvider testID='RnuiProviderTid' theme={isDarkMode ? darkTheme : lightTheme} rnuiStyles={rnuiStyles}>
      <AppLocalizationProvider testID='AppLocalizationProviderTid'>
        <RnuiProvider testID='RnuiProviderTid' theme={isDarkMode ? darkTheme : lightTheme} rnuiStyles={rnuiStyles}>
          <AppErrorHandlingProvider testID='AppErrorHandlingProviderTid'>
            <ReduxProvider store={reduxStore}>
              <DashboardContext.Provider value={context}>
                <CartProvider testID='CartProviderTid'>
                  <InventoryUpdateProvider>
                    <StatusBar style='auto' />

                    {children}
                  </InventoryUpdateProvider>
                </CartProvider>
              </DashboardContext.Provider>
            </ReduxProvider>
          </AppErrorHandlingProvider>
        </RnuiProvider>
      </AppLocalizationProvider>
    </RnuiProvider>
  );
}

export const useDashboard = (): DashboardContextT => useContext(DashboardContext) as DashboardContextT;
