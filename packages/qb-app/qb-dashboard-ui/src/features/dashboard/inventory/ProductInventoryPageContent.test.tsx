
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayoutModule from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductInventoryPageContent } from './ProductInventoryPageContent';

// mocks

jest.mock('../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('./ProductInventoryTable', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductInventoryTable: View,
  };
});

// tests

describe('ProductInventoryPageContent', () => {
  const { mock_useSearchParams, mock_useSetSearchParams, mock_isIos } = __puiMocks;
  const spy_useProductsPageModel = jest.spyOn(ProductsPageModel, 'useProductsPageModel');

  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  const spy_useDashboard = jest.spyOn(DashboardLayoutModule, 'useDashboard');
  const productsPerPage = 2;
  spy_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  } as DashboardContextT);

  beforeEach(() => {
    jest.clearAllMocks();

    mock_isIos.mockReturnValue(false);
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

  it('displays content, pageNumStr search param is not defined', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: false },
    });

    // render
    const { getByTestId, getByText } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    expect(spy_useProductsPageModel).toHaveBeenCalledWith(expect.objectContaining({ pageNum: 0 }));
    getByText('mocked-t-app:inventoryManagement');
    getByTestId('ProductInventoryTableTid');
  });

  it('displays content, pageNumStr search param is defined', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: false },
    });

    // render
    const { getByTestId, getByText } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    expect(spy_useProductsPageModel).toHaveBeenCalledWith(expect.objectContaining({ pageNum: 1 }));
    getByText('mocked-t-app:inventoryManagement');
    getByTestId('ProductInventoryTableTid');
  });
});
