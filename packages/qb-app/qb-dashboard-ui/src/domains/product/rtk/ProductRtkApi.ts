
import { appRtkApi } from '@qb-dashboard-ui/app/redux/rtk/AppRtkApi';
import {
  mock_getProductDetailsGraphqlQuery,
  mock_getProductSummariesPaginatedGraphqlQuery, mock_updateProductGraphqlQuery,
  type GetProductDetailsParamsT, type GetProductDetailsResponseT,
  type GetProductSummariesPaginatedParamsT,
  type GetProductSummariesPaginatedResponseT,
  type UpdateProductBatchParamsT, type UpdateProductBatchResponseT
} from '@qb-dashboard-ui/mocks/MockApiServerDefs';

const productRtkApi = appRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductSummariesPaginated:
      builder.query<GetProductSummariesPaginatedResponseT['data'], GetProductSummariesPaginatedParamsT>(
    {
      query: (params: GetProductSummariesPaginatedParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_getProductSummariesPaginatedGraphqlQuery,
          variables: params,
        }
      }),
      providesTags: (result) => result === undefined ? [] : [
        { type: 'ProductPageTag', id: 'all' },
      ],
    }),

    getProductDetails: builder.query<GetProductDetailsResponseT['data'], GetProductDetailsParamsT>({
      query: (params: GetProductDetailsParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_getProductDetailsGraphqlQuery,
          variables: params,
        }
      }),
      providesTags: (result, error, params) => result === undefined ? [] : [
        { type: 'ProductTag', id: params.productId },
      ],
    }),

    updateProducBatch: builder.mutation<UpdateProductBatchResponseT['data'], UpdateProductBatchParamsT>({
      query: (params: UpdateProductBatchParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_updateProductGraphqlQuery,
          variables: params,
        }
      }),
      invalidatesTags: (result, error, params) => error !== undefined ? [] : [
        ...params.updateProductStockInfos.map(e => ({ type: 'ProductTag' as const, id: e.productId })),
        { type: 'ProductPageTag', id: 'all' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductSummariesPaginatedQuery,
  useGetProductDetailsQuery,
  useUpdateProducBatchMutation,
  util: productRtkApiUtil,
  endpoints: productRtkApiEndpoints,
  reducer: productRtkApiReducer,
  middleware: productRtkApiMiddleware,
} = productRtkApi;
