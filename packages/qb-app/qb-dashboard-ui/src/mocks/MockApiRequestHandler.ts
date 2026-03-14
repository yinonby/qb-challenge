
import { toProductDetails, toProductSummary, type ProductT } from '@qb/models';
import type { CurrencyCodeT, PriceT } from '@qb/utils';
import { mockProducts } from './MockApiProductDb';
import {
  MAX_PRODUCTS_PER_PAGE,
  mock_getProductDetailsGraphqlQuery,
  mock_getProductSummariesPaginatedGraphqlQuery,
  type GetProductDetailsParamsT,
  type GetProductDetailsResponseT,
  type GetProductSummariesPaginatedParamsT,
  type GetProductSummariesPaginatedResponseT,
  type GraphQLResponse, type GraphQLVariables
} from './MockApiServerDefs';

export const handleMockApiServerRequest = (
  query: string,
  variabales: GraphQLVariables,
): GraphQLResponse<GetProductSummariesPaginatedResponseT | GetProductDetailsResponseT> => {
  if (query === mock_getProductSummariesPaginatedGraphqlQuery) {
    const response = getProductSummariesPaginated(variabales as GetProductSummariesPaginatedParamsT);
    return response;
  } else if (query === mock_getProductDetailsGraphqlQuery) {
    const response = getProductDetails(variabales as GetProductDetailsParamsT);
    return response;
  }
  throw new Error('Unexpected request');
}

const getProductSummariesPaginated = (params: GetProductSummariesPaginatedParamsT): GraphQLResponse<GetProductSummariesPaginatedResponseT> => {
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
  const minStock = params.availability?.minStock;
  if (minStock !== undefined) {
    filteredProducts = filteredProducts.filter(e => e.stock >= minStock);
  }
  const maxStock = params.availability?.maxStock;
  if (maxStock !== undefined) {
    filteredProducts = filteredProducts.filter(e => e.stock <= maxStock);
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
    .map(e => toProductSummary(e));

  const response: GetProductSummariesPaginatedResponseT = {
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

const getProductDetails = (params: GetProductDetailsParamsT): GraphQLResponse<GetProductDetailsResponseT> => {
  const product = mockProducts.find(e => e.langCode === params.langCode && e.productId === params.productId);

  if (product === undefined) {
    return {
      errors: [{
        message: `Product not found, langCode ${params.langCode}, productId ${params.productId}`,
        extensions: { apiServerErrCode: 'apiError:invalidInput' },
      }],
    };
  }
  return {
    data: {
      productDetails: toProductDetails(product),
    }
  }
}
