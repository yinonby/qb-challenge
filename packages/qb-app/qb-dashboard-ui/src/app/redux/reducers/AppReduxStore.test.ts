
import { configureStore } from '@reduxjs/toolkit';
import { appRtkApiMiddleware, appRtkApiReducer, appRtkApiReducerPath } from '../rtk/AppRtkApi';
import './AppReduxStore';
import { createReduxStore } from './AppReduxStore';
import { dashboardReducer, dashboardReducerPath } from './DashboardReducer';

// mocks

jest.mock('@reduxjs/toolkit', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configureStore: jest.fn(({ reducer, middleware }: any) => {
    return {
      getState: jest.fn(),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      replaceReducer: jest.fn(),
      reducer,
      middleware,
    };
  }),
}));

jest.mock('../rtk/AppRtkApi', () => ({
  appRtkApi: {
    reducerPath: 'appRtkApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
}));

jest.mock('./DashboardReducer', () => ({
  dashboardReducer: jest.fn(),
  dashboardReducerPath: 'dashboardReducer',
}));

jest.mock('@qb-dashboard-ui/features/cart/reducer/CartSlice', () => ({
  cartReducer: jest.fn(),
  cartReducerPath: 'cartReducer',
}));

// tests

describe('AppReduxStore', () => {
  it('calls configureStore with correct reducers and middleware', () => {
    const reduxStore = createReduxStore('fake-url');

    expect(reduxStore).not.toBeNull();
    expect(configureStore).toHaveBeenCalledTimes(1);

    const callArg = (configureStore as jest.Mock).mock.calls[0][0];

    // Check reducers
    expect(callArg.reducer).toMatchObject({
      [dashboardReducerPath]: dashboardReducer,
      [appRtkApiReducerPath]: appRtkApiReducer,
      //[dataSrcVersionReducerPath]: dataSrcVersionReducer,
    });

    // Check middleware includes appRtkApiMiddleware
    const defaultMiddlewareResult = { concat: jest.fn().mockReturnValue('middlewareResult') };
    const middlewareFn = callArg.middleware;
    const middlewareResult = middlewareFn(() => defaultMiddlewareResult);

    expect(defaultMiddlewareResult.concat).toHaveBeenCalledWith(appRtkApiMiddleware);
    expect(middlewareResult).toBe('middlewareResult');
  });
});
