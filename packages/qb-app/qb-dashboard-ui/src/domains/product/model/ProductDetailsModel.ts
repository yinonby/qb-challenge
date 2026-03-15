
import type { GetProductDetailsParamsT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { AppModelT } from '@qb-dashboard-ui/types/ModelTypes';
import type { ProductDetailsT } from '@qb/models';
import { useGetProductDetailsQuery } from '../rtk/ProductRtkApi';
import { extractAppErrorCodeFromUnknownObject } from './AppRtkErrorUtils';

export const MAX_INITIAL_CHAT_MESSAGES = 100;

export type ProductDetailsModelDataT = {
  productDetails: ProductDetailsT,
};

export type ProductDetailsModelT = AppModelT<ProductDetailsModelDataT>;

export const useProductDetailsModel = (params: GetProductDetailsParamsT): ProductDetailsModelT => {
  const {
    isUninitialized,
    isLoading,
    isError,
    error,
    data,
  } = useGetProductDetailsQuery(params);


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
      productDetails: data.productDetails,
    }
  }
}
