
import type {
  ApiServerErrorCodeT, AvailabilityOptionT,
  ProductCategoryT, ProductDetailsT, ProductIdT, ProductStockHistoryItemT, ProductSummaryT, QbLangCodeT, SortT
} from '@qb/models';

export const MAX_PRODUCTS_PER_PAGE = 24;
export const mock_getProductSummariesPaginatedGraphqlQuery = 'mock_getProductSummariesPaginatedGraphqlQuery';
export const mock_getProductDetailsGraphqlQuery = 'mock_getProductDetailsGraphqlQuery';
export const mock_updateProductGraphqlQuery = 'mock_updateProductGraphqlQuery';

export interface MockApiServerProvider{
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export type GraphQLBody = {
  query: string,
  variables: GraphQLVariables;
}

export type GraphQLVariables = GetProductSummariesPaginatedParamsT | GetProductDetailsParamsT | ProductUpdateParamsT;

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

export type GetProductSummariesPaginatedParamsT = {
  langCode: QbLangCodeT,
  pageNum: number,
  productsPerPage: number,
  category?: ProductCategoryT,
  availability?: AvailabilityOptionT,
  sort: SortT,
}

export type GetProductSummariesPaginatedResponseT = {
  data: PaginatedResponseT<ProductSummaryT>,
}

export type GetProductDetailsParamsT = {
  langCode: QbLangCodeT,
  productId: ProductIdT,
}

export type GetProductDetailsResponseT = {
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
