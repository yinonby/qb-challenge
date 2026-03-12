
import type { MockAxiosClient } from '@qb-dashboard-ui/mocks/MockAxiosClient';
import * as MockAxiosClientModule from '@qb-dashboard-ui/mocks/MockAxiosClient';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { appRtkHttpAdapterGenerator } from './AppReduxUtils';

// mocks

jest.mock('@qb-dashboard-ui/mocks/MockAxiosClient', () => ({
  MockAxiosClient: jest.fn(),
}));

// tests

describe('AppReduxUtils', () => {
  const spy_MockAxiosClient = jest.spyOn(MockAxiosClientModule, 'MockAxiosClient');

  beforeEach(() => {
    spy_MockAxiosClient.mockClear();
  });

  it('returns MockAxiosClient', () => {
    // setup mocks
    const mockAxiosInstance = { value: 'AXIOS' };
    spy_MockAxiosClient.mockImplementation(() => mockAxiosInstance as unknown as MockAxiosClient);

    const api = {} as unknown as BaseQueryApi;

    const adapter = appRtkHttpAdapterGenerator.generateHttpAdapter(api, 'url/graphql');
    expect(spy_MockAxiosClient).toHaveBeenCalledTimes(1);
    expect(adapter).toEqual(mockAxiosInstance);
  });
});
