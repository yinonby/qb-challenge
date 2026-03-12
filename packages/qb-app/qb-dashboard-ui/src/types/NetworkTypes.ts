
import type { HttpAdapter } from '@qb/client-utils';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';

export interface AppRtkHttpAdapterGeneratorProvider {
  generateHttpAdapter: (api: BaseQueryApi, url?: string) => HttpAdapter | null;
}

export  type AppRtkQueryArgs = {
  url: string,
  kind: 'graphql',
  graphql: {
    document: string; // GraphQL query string
    variables?: Record<string, string | number | object>;
  };
}

export type AppRtkQueryReturnValue<T = unknown, E = unknown> = {
    error: E;
    data?: undefined;
} | {
    error?: undefined;
    data: T;
};
