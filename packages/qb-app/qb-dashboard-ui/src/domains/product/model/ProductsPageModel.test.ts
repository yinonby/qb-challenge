
import type { GetProductsPageParamsT, GetProductsPageResponseT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { renderHook } from '@testing-library/react-native';
import * as ProductRtkApi from '../rtk/ProductRtkApi';
import { useProductsPageModel } from './ProductsPageModel';

jest.mock('../rtk/ProductRtkApi');

describe('ProductsPageModel', () => {
  const spy_useGetProductSummariesPaginatedQuery = jest.spyOn(ProductRtkApi, 'useGetProductSummariesPaginatedQuery');
  const params: GetProductsPageParamsT = {
    langCode: 'en',
    pageNum: 0,
    productsPerPage: 12,
    sort: 'priceAscending',
  };

  it('calls hooks with correct args', () => {
    // setup mocks
    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isLoading: true,
      refetch: jest.fn(),
    });

    // render
    renderHook(() => useProductsPageModel(params));

    // verify
    expect(spy_useGetProductSummariesPaginatedQuery).toHaveBeenCalledWith(params);
  });

  it('returns error when query returns uninitialized (unexpected)', () => {
    // setup mocks
    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isUninitialized: true,
      refetch: jest.fn(),
    });

    // render
    expect(useProductsPageModel(params)).toEqual({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:unknown',
    });
  });

  it('returns loading state when query is loading', () => {
    // setup mocks
    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductsPageModel(params));

    expect(result.current).toEqual({
      isLoading: true,
      isError: false,
      data: undefined,
    });
  });

  it('returns error state when query has error', () => {
    // setup mocks
    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { appErrCode: 'apiError:server' },
      data: undefined,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductsPageModel(params));

    expect(result.current).toEqual({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:server',
      data: undefined,
    });
  });

  it('returns data, isLastPage is false', () => {
    // setup mocks
    const response: GetProductsPageResponseT = {
      data: {
        data: [],
        total: 10,
        page: 1,
        limit: 3,
      }
    }

    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: response.data,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductsPageModel(params));

    expect(result.current).toEqual({
      isLoading: false,
      isError: false,
      data: {
        productSummaries: response.data.data,
        pageNum: 1,
        isLastPage: false,
      },
    });
  });

  it('returns data, isLastPage is true', () => {
    // setup mocks
    const response: GetProductsPageResponseT = {
      data: {
        data: [],
        total: 10,
        page: 1,
        limit: 10,
      }
    }

    spy_useGetProductSummariesPaginatedQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: response.data,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductsPageModel(params));

    expect(result.current).toEqual({
      isLoading: false,
      isError: false,
      data: {
        productSummaries: response.data.data,
        pageNum: 1,
        isLastPage: true,
      },
    });
  });
});
