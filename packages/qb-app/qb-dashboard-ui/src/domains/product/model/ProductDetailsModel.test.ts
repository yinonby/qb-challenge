
import type { GetProductDetailsParamsT, GetProductDetailsResponseT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { renderHook } from '@testing-library/react-native';
import * as ProductRtkApi from '../rtk/ProductRtkApi';
import { useProductDetailsModel } from './ProductDetailsModel';

jest.mock('../rtk/ProductRtkApi');

describe('ProductDetailsModel', () => {
  const spy_useGetProductDetailsQuery = jest.spyOn(ProductRtkApi, 'useGetProductDetailsQuery');
  const params: GetProductDetailsParamsT = {
    langCode: 'en',
    productId: 'PID1',
  };

  it('calls hooks with correct args', () => {
    // setup mocks
    spy_useGetProductDetailsQuery.mockReturnValue({
      isLoading: true,
      refetch: jest.fn(),
    });

    // render
    renderHook(() => useProductDetailsModel(params));

    // verify
    expect(spy_useGetProductDetailsQuery).toHaveBeenCalledWith(params);
  });

  it('returns error when query returns uninitialized (unexpected)', () => {
    // setup mocks
    spy_useGetProductDetailsQuery.mockReturnValue({
      isUninitialized: true,
      refetch: jest.fn(),
    });

    // render
    expect(useProductDetailsModel(params)).toEqual({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:unknown',
    });
  });

  it('returns loading state when query is loading', () => {
    // setup mocks
    spy_useGetProductDetailsQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductDetailsModel(params));

    expect(result.current).toEqual({
      isLoading: true,
      isError: false,
      data: undefined,
    });
  });

  it('returns error state when query has error', () => {
    // setup mocks
    spy_useGetProductDetailsQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { appErrCode: 'apiError:server' },
      data: undefined,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductDetailsModel(params));

    expect(result.current).toEqual({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:server',
      data: undefined,
    });
  });

  it('returns data', () => {
    // setup mocks
    const response: GetProductDetailsResponseT = {
      data: {
        productDetails: buildProductDetailsMock(),
      }
    }

    spy_useGetProductDetailsQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: response.data,
      refetch: jest.fn(),
    });

    // render
    const { result } = renderHook(() => useProductDetailsModel(params));

    expect(result.current).toEqual({
      isLoading: false,
      isError: false,
      data: {
        productDetails: response.data.productDetails,
      },
    });
  });
});
