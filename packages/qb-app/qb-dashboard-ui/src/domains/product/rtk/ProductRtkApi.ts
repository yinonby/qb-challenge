
import { appRtkApi } from '@qb-dashboard-ui/app/redux/rtk/AppRtkApi';
import {
  mock_getProductDetailsGraphqlQuery,
  mock_getProductSummariesPaginatedGraphqlQuery, mock_updateProductGraphqlQuery,
  type GetProductDetailsParamsT, type GetProductDetailsResponseT,
  type GetProductSummariesPaginatedParamsT,
  type GetProductSummariesPaginatedResponseT,
  type ProductUpdateParamsT, type ProductUpdateResponseT
} from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { stableHash } from '@qb/utils';

function buildProductPageHash(params: GetProductSummariesPaginatedParamsT): string {
  return stableHash(params);
}

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
      providesTags: (result, error, params) => result === undefined ? [] : [
        { type: 'ProductPageTag', id: buildProductPageHash(params) },
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

    updateProduct: builder.mutation<ProductUpdateResponseT['data'], ProductUpdateParamsT>({
      query: (params: ProductUpdateParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_updateProductGraphqlQuery,
          variables: { input: params },
        }
      }),
      invalidatesTags: (result, error, params) => error !== undefined ? [] : [
        { type: 'ProductTag', id: params.productId },
        { type: 'ProductPageTag', id: 'all' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductSummariesPaginatedQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  util: productRtkApiUtil,
  endpoints: productRtkApiEndpoints,
  reducer: productRtkApiReducer,
  middleware: productRtkApiMiddleware,
} = productRtkApi;
