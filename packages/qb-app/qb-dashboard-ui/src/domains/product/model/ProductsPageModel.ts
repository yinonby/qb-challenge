
import type { GetProductSummariesPaginatedParamsT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { AppModelT } from '@qb-dashboard-ui/types/ModelTypes';
import type { ProductSummaryT } from '@qb/models';
import { useGetProductSummariesPaginatedQuery } from '../rtk/ProductRtkApi';
import { extractAppErrorCodeFromUnknownObject } from './AppRtkErrorUtils';

export const MAX_INITIAL_CHAT_MESSAGES = 100;

export type ProductsPageModelDataT = {
  productSummaries: ProductSummaryT[],
  pageNum: number,
  isLastPage: boolean,
};

export type ProductsPageModelT = AppModelT<ProductsPageModelDataT>;

export const useProductsPageModel = (params: GetProductSummariesPaginatedParamsT): ProductsPageModelT => {
  const {
    isUninitialized,
    isLoading,
    isError,
    error,
    data,
  } = useGetProductSummariesPaginatedQuery(params);


  if (isUninitialized) {
    // unexpected, query only returns this when using { skip: true }
    return {
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:unknown',
    }
  } else if (isLoading) {
    return {
      isLoading: true,
      isError: false,
    }
  } else if (isError) {
    return {
      isLoading: false,
      isError: true,
      appErrCode: extractAppErrorCodeFromUnknownObject(error),
    }
  }

  return {
    isLoading: false,
    isError: false,
    data: {
      productSummaries: data.data,
      pageNum: data.page,
      isLastPage: data.page * data.limit + data.data.length >= data.total,
    }
  }
}
