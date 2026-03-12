
import { useClientLogger } from '@qb-dashboard-ui/logger/ClientLogger';
import { configureStore } from '@reduxjs/toolkit';
import { appRtkApiMiddleware, appRtkApiReducer, appRtkApiReducerPath } from '../rtk/AppRtkApi';
import { appRtkHttpAdapterGenerator } from './AppReduxUtils';
import {
  dashboardReducer,
  dashboardReducerPath
} from './DashboardReducer';

export const createReduxStore = (apiUrl: string) => configureStore({
  reducer: {
    [dashboardReducerPath]: dashboardReducer,
    [appRtkApiReducerPath]: appRtkApiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          appRtkHttpAdapterGeneratorProvider: appRtkHttpAdapterGenerator,
          logger: useClientLogger(),
        },
      },
    }).concat(appRtkApiMiddleware),
  preloadedState: {
    [dashboardReducerPath]: {
      apiUrl,
    },
  }
});

export type DashboardAppReduxStore = ReturnType<typeof createReduxStore>;
export type DashboardAppReduxRootState = ReturnType<DashboardAppReduxStore['getState']>;
export type DashboardAppReduxDispatch = DashboardAppReduxStore['dispatch'];
