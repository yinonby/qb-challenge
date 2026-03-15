
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { buildProductSummaryMock } from '@qb/models/test-utils';
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

jest.mock('../../common/PaginationControl', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    PaginationControl: View,
  };
});

jest.mock('./filters/FiltersButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    FiltersButton: View,
  };
});

jest.mock('../common/ClearFilterButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ClearFilterButton: View,
  };
});

jest.mock('./product-summary/ProductListingGrid', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductListingGrid: View,
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

  it('displays content, no products', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    const { getByTestId, getByText } = render(
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('FiltersButtonTid');
    getByTestId('PaginationControlTid');
    getByText('mocked-t-app:noProducts');
  });

  it('displays content, with products', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [buildProductSummaryMock()], pageNum: 0, totalItems: 10, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('FiltersButtonTid');
    getByTestId('ClearFilterButtonTid');
    getByTestId('PaginationControlTid');
    getByTestId('ProductListingGridTid');
  });

  it('handles next / prev', async () => {
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
    const pagControl = getByTestId('PaginationControlTid');
    expect(pagControl.props.totalItemsNum).toEqual(10);
    expect(pagControl.props.curPage).toEqual(1);
    expect(pagControl.props.curPageItemsNum).toEqual(0);
    expect(pagControl.props.isLastPage).toEqual(false);
    expect(pagControl.props.itemsPerPage).toEqual(productsPerPage);

    // next
    jest.clearAllMocks();
    pagControl.props.onNext();
    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: '2',
      category: undefined,
      availabilityMinStr: undefined,
      availabilityMaxStr: undefined,
      sort: undefined,
    });


    // prev
    jest.clearAllMocks();
    pagControl.props.onPrev();
    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: '0',
      category: undefined,
      availabilityMinStr: undefined,
      availabilityMaxStr: undefined,
      sort: undefined,
    });
  });
});
