
import * as ClientUtils from '@qb/client-utils';
import { AxiosClient } from '@qb/client-utils';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { appRtkHttpAdapterGenerator } from './AppReduxUtils.web';
import { dashboardReducerPath } from './DashboardReducer';

// mocks

jest.mock('@qb/client-utils', () => ({
  AxiosClient: jest.fn(),
}));

// tests

describe('AppReduxUtils', () => {
  const spy_AxiosClient = jest.spyOn(ClientUtils, 'AxiosClient');

  beforeEach(() => {
    spy_AxiosClient.mockClear();
  });

  it('returns null when apiUrl is null', () => {
    const api = {
      getState: () => ({ [dashboardReducerPath]: { apiUrl: null } }),
    } as unknown as BaseQueryApi;

    const adapter = appRtkHttpAdapterGenerator.generateHttpAdapter(api);
    expect(adapter).toBeNull();
    expect(spy_AxiosClient).not.toHaveBeenCalled();
  });

  it('returns Axios', () => {
    // setup mocks
    const mockAxiosInstance = { value: 'AXIOS' };
    spy_AxiosClient.mockImplementation(() => mockAxiosInstance as unknown as AxiosClient);

    const apiUrl = 'http://dev.example';
    const api = {
      getState: () => ({ [dashboardReducerPath]: { apiUrl } }),
    } as unknown as BaseQueryApi;

    const adapter = appRtkHttpAdapterGenerator.generateHttpAdapter(api, 'url/graphql');
    expect(spy_AxiosClient).toHaveBeenCalledTimes(1);
    expect(spy_AxiosClient.mock.calls[0][0]).toBe(apiUrl);
    expect(adapter).toEqual(mockAxiosInstance);
  });
});
