
import { toProductSummary, type ProductT } from '@qb/models';
import type { CurrencyCodeT, PriceT } from '@qb/utils';
import { mockProducts } from './MockApiProductDb';
import {
  MAX_PRODUCTS_PER_PAGE,
  mock_getProductsPageGraphqlQuery,
  type GetProductsPageParamsT,
  type GetProductsPageResponseT,
  type GraphQLResponse, type GraphQLVariables
} from './MockApiServerDefs';

export const handleMockApiServerRequest = (
  query: string,
  variabales: GraphQLVariables,
): GraphQLResponse<GetProductsPageResponseT> => {
  if (query === mock_getProductsPageGraphqlQuery) {
    const response = getProductsPage(variabales as GetProductsPageParamsT);
    return response;
  }
  throw new Error('Unexpected request');
}

const getProductsPage = (params: GetProductsPageParamsT): GraphQLResponse<GetProductsPageResponseT> => {
  let filteredProducts = mockProducts.filter(e => e.langCode === params.langCode);

  if (params.productsPerPage > MAX_PRODUCTS_PER_PAGE) {
    return {
      errors: [{
        message: `Cannot retrieve more than ${MAX_PRODUCTS_PER_PAGE} products per page`,
        extensions: { apiServerErrCode: 'apiError:invalidInput' },
      }],
    };
  }

  // filter by category if provided
  if (params.category) {
    filteredProducts = filteredProducts.filter(e => e.category === params.category);
  }

  // filter by availability if provided
  if (params.availability === 'inStock') {
    filteredProducts = filteredProducts.filter(e => e.stock > 0);
  } else if (params.availability === 'outOfStock') {
    filteredProducts = filteredProducts.filter(e => e.stock === 0);
  }

  // sort if provided
  if (params.sort === 'priceAscending') {
    filteredProducts = filteredProducts.sort(compareProductPricesAscending)
  } else if (params.sort === 'priceDescending') {
    filteredProducts = filteredProducts.sort(compareProductPricesDescending)
  } else if (params.sort === 'popularity') {
    filteredProducts = filteredProducts.sort(compareProductPopularityDescending)
  } else if (params.sort === 'newest') {
    filteredProducts = filteredProducts.sort(compareProductNewest)
  }

  // verify pageNum doesn't exceed
  const startIdx = params.pageNum * params.productsPerPage;
  if (startIdx > filteredProducts.length) {
    return {
      errors: [{
        message: 'Invalid page number',
        extensions: { apiServerErrCode: 'apiError:invalidInput' },
      }],
    };
  }

  const endIdx = Math.min(startIdx + params.productsPerPage, filteredProducts.length);
  const productSummaries = filteredProducts
    .slice(startIdx, endIdx)
    .map(e => toProductSummary(e, params.langCode));

  const response: GetProductsPageResponseT = {
    data: {
      data: productSummaries,
      total: filteredProducts.length,
      page: params.pageNum,
      limit: params.productsPerPage,
    },
  };
  return response;
}

const compareProductPricesAscending = (product1: ProductT, product2: ProductT): number => {
  const priceEur1 = mockConvertPriceToEur(product1.price);
  const priceEur2 = mockConvertPriceToEur(product2.price);

  return priceEur1.rate - priceEur2.rate;
}

const compareProductPricesDescending = (product1: ProductT, product2: ProductT): number => {
  return -1 * compareProductPricesAscending(product1, product2)
}

const compareProductPopularityDescending = (product1: ProductT, product2: ProductT): number => {
  return product2.popularity - product1.popularity;
}

const compareProductNewest = (product1: ProductT, product2: ProductT): number => {
  return product2.createdAtTs - product1.createdAtTs;
}

const mockConvertPriceToEur = (price: PriceT): PriceT => {
  const mockCurrencyConvertorToEur: Record<CurrencyCodeT, number> = {
    'EUR': 1,
    'USD': 0.86,
    'GBP': 1.16,
  }

  return {
    currencyCode: 'EUR',
    rate: mockCurrencyConvertorToEur[price.currencyCode] * price.rate,
  }
}
