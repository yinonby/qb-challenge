
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductListingPageContent } from './ProductListingPageContent';

jest.mock('../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('./ListingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ListingView: View,
  };
});

describe('ProductListingPageContent', () => {
  const { mock_useSearchParams, mock_useSetSearchParams } = __puiMocks;
  const spy_useProductsPageModel = jest.spyOn(ProductsPageModel, 'useProductsPageModel');

  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  const spy_useDashboard = jest.spyOn(DashboardLayout, 'useDashboard');
  const productsPerPage = 2;
  spy_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  } as DashboardContextT);

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
      <ProductListingPageContent />
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
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('ModelLoadingViewTid');
  });

  it('displays content, pageNumStr is not provided', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('ListingViewTid');
  });

  it('displays content, pageNumStr is provided', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('ListingViewTid');
  });
});
