
import { MockAxiosClient } from '@qb-dashboard-ui/mocks/MockAxiosClient';
import type { AppRtkHttpAdapterGeneratorProvider } from '@qb-dashboard-ui/types/NetworkTypes';
import { type HttpAdapter } from '@qb/client-utils';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';

export const appRtkHttpAdapterGenerator: AppRtkHttpAdapterGeneratorProvider = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateHttpAdapter: (api: BaseQueryApi, url?: string): HttpAdapter | null => {
    return new MockAxiosClient();
  },
};
