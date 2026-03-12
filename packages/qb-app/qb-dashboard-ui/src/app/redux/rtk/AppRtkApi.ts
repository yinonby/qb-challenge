
import { createApi } from '@reduxjs/toolkit/query/react';
import { createAppRtkBaseQuery } from './AppRtkBaseQuery';

export const appRtkApi = createApi({
  reducerPath: 'appRtkApiReducer',
  baseQuery: createAppRtkBaseQuery(),
  tagTypes: [
    'ProductPageTag',
    'ProductTag',
  ],
  endpoints: () => ({}),
});

export const {
  reducerPath: appRtkApiReducerPath,
  reducer: appRtkApiReducer,
  middleware: appRtkApiMiddleware,
  endpoints: appRtkApiEndpoints,
  util: appRtkUtil,
} = appRtkApi;
