
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductInventoryPageContent } from './ProductInventoryPageContent';

// mocks

jest.mock('@qb-dashboard-ui/app/layout/DashboardLayout', () => {
  return {
    useDashboard: jest.fn(),
  };
});

jest.mock('../../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('./InventoryView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    InventoryView: View,
  };
});

// tests

describe('ProductInventoryPageContent', () => {
  const { mock_useSearchParams } = __puiMocks;
  const spy_useProductsPageModel = jest.spyOn(ProductsPageModel, 'useProductsPageModel');

  const mock_useDashboard = useDashboard as jest.Mock;
  const productsPerPage = 2;
  mock_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mock_useSearchParams.mockReturnValue({});
  });

  it('displays ModelLoadingView when loading', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: true,
      isError: false,
    });

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    getByTestId('ModelLoadingViewTid');
  });

  it('displays ModelLoadingView when error', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:unknown',
    });

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    getByTestId('ModelLoadingViewTid');
  });

  it('displays content', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    getByTestId('InventoryViewTid');
  });

  it('pageNumStr search param is not defined', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    render(
      <ProductInventoryPageContent />
    );

    // verify components
    expect(spy_useProductsPageModel).toHaveBeenCalledWith(expect.objectContaining({ pageNum: 0 }));
  });

  it('pageNumStr search param is defined', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    render(
      <ProductInventoryPageContent />
    );

    // verify components
    expect(spy_useProductsPageModel).toHaveBeenCalledWith(expect.objectContaining({ pageNum: 1 }));
  });
});
