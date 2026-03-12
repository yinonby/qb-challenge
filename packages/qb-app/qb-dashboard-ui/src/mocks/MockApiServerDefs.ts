
import type {
  ApiServerErrorCodeT, AvailabilityOptionT,
  ProductCategoryT, ProductDetailsT, ProductIdT, ProductStockHistoryItemT, ProductSummaryT, QbLangCodeT, SortT
} from '@qb/models';

export const MAX_PRODUCTS_PER_PAGE = 24;
export const mock_getProductsPageGraphqlQuery = 'mock_getProductsPageGraphqlQuery';
export const mock_getProductGraphqlQuery = 'mock_getProductGraphqlQuery';
export const mock_updateProductGraphqlQuery = 'mock_updateProductGraphqlQuery';

export interface MockApiServerProvider{
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export type GraphQLBody = {
  query: string,
  variables: GraphQLVariables;
}

export type GraphQLVariables = GetProductsPageParamsT | GetProductParamsT | ProductUpdateParamsT;

export type GraphQLResponse<T> = T | {
  errors: GraphQLFormattedError[],
};

export interface GraphQLFormattedError {
  readonly message: string;
  readonly locations?: ReadonlyArray<SourceLocation>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions: GraphQLFormattedErrorExtensions;
}

export interface SourceLocation {
  readonly line: number;
  readonly column: number;
}

export interface GraphQLFormattedErrorExtensions {
  apiServerErrCode: ApiServerErrorCodeT,
}

export type PaginatedResponseT<T> = {
  data: T[],
  total: number,
  page: number,
  limit: number,
}

export type GetProductsPageParamsT = {
  langCode: QbLangCodeT,
  pageNum: number,
  productsPerPage: number,
  category?: ProductCategoryT,
  availability?: AvailabilityOptionT,
  sort: SortT,
}

export type GetProductsPageResponseT = {
  data: PaginatedResponseT<ProductSummaryT>,
}

export type GetProductParamsT = {
  langCode: QbLangCodeT,
  productId: ProductIdT,
}

export type GetProductResponseT = {
  data: {
    productDetails: ProductDetailsT,
  }
}

export type ProductUpdateParamsT = {
  productId: ProductIdT,
  newStock: number,
  reason: string,
};

export type ProductUpdateResponseT = {
  data: ProductStockHistoryItemT,
}
