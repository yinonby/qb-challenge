
import type { AppRtkHttpAdapterGeneratorProvider } from '@qb-dashboard-ui/types/NetworkTypes';
import { AxiosClient, type HttpAdapter } from '@qb/client-utils';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { type DashboardPartialReducerStateT, dashboardReducerPath } from './DashboardReducer';

export const appRtkHttpAdapterGenerator: AppRtkHttpAdapterGeneratorProvider = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateHttpAdapter: (api: BaseQueryApi, url?: string): HttpAdapter | null => {
    const state: DashboardPartialReducerStateT = api.getState() as unknown as DashboardPartialReducerStateT;
    const apiUrl: string | null = state[dashboardReducerPath].apiUrl;

    if (apiUrl === null) {
      return null;
    }

    return new AxiosClient(apiUrl);
  },
};
