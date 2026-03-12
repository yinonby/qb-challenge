
import { appRtkApi } from '@qb-dashboard-ui/app/redux/rtk/AppRtkApi';
import {
  mock_getProductGraphqlQuery,
  mock_getProductsPageGraphqlQuery, mock_updateProductGraphqlQuery,
  type GetProductParamsT, type GetProductResponseT,
  type GetProductsPageParamsT,
  type GetProductsPageResponseT,
  type ProductUpdateParamsT, type ProductUpdateResponseT
} from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { stableHash } from '@qb/utils';

function buildProductPageHash(params: GetProductsPageParamsT): string {
  return stableHash(params);
}

const productRtkApi = appRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductSummariesPaginated: builder.query<GetProductsPageResponseT['data'], GetProductsPageParamsT>({
      query: (params: GetProductsPageParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_getProductsPageGraphqlQuery,
          variables: params,
        }
      }),
      providesTags: (result, error, params) => result === undefined ? [] : [
        { type: 'ProductPageTag', id: buildProductPageHash(params) },
      ],
    }),

    getProduct: builder.query<GetProductResponseT['data'], GetProductParamsT>({
      query: (params: GetProductParamsT) => ({
        url: '/product/graphql',
        kind: 'graphql',
        graphql: {
          document: mock_getProductGraphqlQuery,
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
  useGetProductQuery,
  useUpdateProductMutation,
  util: productRtkApiUtil,
  endpoints: productRtkApiEndpoints,
  reducer: productRtkApiReducer,
  middleware: productRtkApiMiddleware,
} = productRtkApi;
