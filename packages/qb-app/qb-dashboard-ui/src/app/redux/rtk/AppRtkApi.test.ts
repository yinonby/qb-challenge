
import {
  appRtkApi,
  appRtkApiEndpoints,
  appRtkApiMiddleware,
  appRtkApiReducer,
  appRtkApiReducerPath,
  appRtkUtil
} from './AppRtkApi';

describe('appRtkApi', () => {
  test('has correct reducerPath', () => {
    expect(appRtkApiReducerPath).toBe('appRtkApiReducer');
    expect(appRtkApi.reducerPath).toBe('appRtkApiReducer');
  });

  test('exports reducer', () => {
    expect(appRtkApiReducer).toBeDefined();
    expect(typeof appRtkApiReducer).toBe('function');
  });

  test('exports middleware', () => {
    expect(appRtkApiMiddleware).toBeDefined();
    expect(typeof appRtkApiMiddleware).toBe('function');
  });

  test('exports endpoints object', () => {
    expect(appRtkApiEndpoints).toBeDefined();
    expect(typeof appRtkApiEndpoints).toBe('object');
  });

  test('exports util helpers', () => {
    expect(appRtkUtil).toBeDefined();
    expect(appRtkUtil.resetApiState).toBeDefined();
  });
});
