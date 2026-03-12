
import type { ExpoEnvVarsT } from '@/src/types/ExpoTypes';
import { contentPaddingHorizontal, useAppTheme } from '@/src/utils/ThemeAssetDefs';
import { getI18nResources } from '@/src/utils/TranslationsAssetDefs';
import {
  createMockApiServer,
  DashboardLayout, initI18n,
  SettingsButton, useAppLocalization, useDashboard
} from '@qb/dashboard-ui';
import Constants from 'expo-constants';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// init i18n must be made once, before any rendering, because i18n is a singleton
const resources = getI18nResources();
initI18n(resources);

export default function RootLayout() {
  const expoEnvVars: ExpoEnvVarsT = Constants.expoConfig?.extra?.env.expoEnvVars;
  const server = createMockApiServer(expoEnvVars.apiUrl);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const startMockApiServer = async (): Promise<void> => {
      if (__DEV__) {
        await server.start();
      }
      setInitialized(true);
    }

    startMockApiServer();

    return () => {
      if (__DEV__) {
        server.stop(); // Clean up on unmount
      }
    };
  }, [server, initialized]);

  if (!initialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ConfiguredDashboarfdLayout>
        <StackLayout />
      </ConfiguredDashboarfdLayout>
    </SafeAreaProvider>
  )
}

function ConfiguredDashboarfdLayout(props: PropsWithChildren) {
  const appTheme = useAppTheme();
  const expoEnvVars: ExpoEnvVarsT = Constants.expoConfig?.extra?.env.expoEnvVars;

  return (
    <DashboardLayout
      lightTheme={appTheme.lightTheme}
      darkTheme={appTheme.darkTheme}
      rnuiStyles={appTheme.rnuiStyles}
      apiUrl={expoEnvVars.apiUrl}
      appHeaderHeight={expoEnvVars.appHeaderHeight}
      productsPerPage={expoEnvVars.productsPerPage}
    >
      {props.children}
    </DashboardLayout>
  )
}

function StackLayout() {
  // keep this as an inner layout - it uses hooks provided by DashboardLayout
  const { t } = useAppLocalization();
  const theme = useTheme();
  const expoEnvVars: ExpoEnvVarsT = Constants.expoConfig?.extra?.env.expoEnvVars;
  const headerMenuButtonPadding = 8;
  const headerMenuButtonMargin = 5;
  const headerLeftMarginCompensation = contentPaddingHorizontal - headerMenuButtonPadding - headerMenuButtonMargin;
  const headerRightMargin = 6;
  const headerRightMarginCompensation = contentPaddingHorizontal - headerRightMargin;
  const { themeMode, onChangeThemeMode } = useDashboard();

  return (
    <Drawer
      backBehavior='fullHistory'
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primaryContainer,
          borderBottomWidth: 0,
          height: expoEnvVars.appHeaderHeight,
        },
        headerLeftContainerStyle: {
          marginStart: headerLeftMarginCompensation,
        },
        headerRightContainerStyle: {
          marginEnd: headerRightMarginCompensation,
        },
        headerTintColor: theme.colors.onPrimaryContainer,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () =>
          <SettingsButton
            iconColor={theme.colors.onPrimary}
            backgroundColor={theme.colors.primary}
            themeMode={themeMode}
            onChangeThemeMode={onChangeThemeMode}
          />
      }}
    >
      <Drawer.Screen name='index' options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name='app/index' options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name='app/dashboard/index' options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen
        name='app/dashboard/listing'
        options={{ title: t('app:productListing'), drawerLabel: t('app:productListing') }}
      />
      <Drawer.Screen
        name='app/dashboard/product/[productId]'
        options={{ title: t('app:productDetails'), drawerLabel: t('app:productDetails') }}
      />
      <Drawer.Screen
        name='app/dashboard/inventory'
        options={{ title: t('app:inventoryManagement'), drawerLabel: t('app:inventoryManagement') }}
      />
    </Drawer>
  )
}
