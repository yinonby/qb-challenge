
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { DEFAULT_SORT_OPTION, type ProductSummaryT } from '@qb/models';
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ProductListingPageContent } from './ProductListingPageContent';

jest.mock('../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('./filters/FiltersButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    FiltersButton: View,
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
  const { mock_useSearchParams, mock_useSetSearchParams, mock_isIos } = __puiMocks;
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

  it('displays content', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    getByTestId('RnuiAppContentTid');
  });

  it('sets different margin for clear filters button in ios', async () => {
    mock_isIos.mockReturnValue(true);
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", category: 'MOCK_CATEGORY' });

    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    const clearBtn = getByTestId('ClearFilterButtonTid');
    expect(clearBtn.props.style.marginStart).toEqual(-6);
  });

  it('handles next / previous clicks, first page', async () => {
    // setup mocks
    const productSummaries: ProductSummaryT[] = [
      buildProductSummaryMock(),
      buildProductSummaryMock(),
      buildProductSummaryMock(),
    ];
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: productSummaries.slice(0, 2), pageNum: 0, isLastPage: false },
    });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    const prevBtn = getByTestId('PrevButtonTid');
    const nextBtn = getByTestId('NextButtonTid');

    expect(prevBtn.props.disabled).toEqual(true);
    expect(nextBtn.props.disabled).toEqual(false);

    // request next page
    act(() => {
      fireEvent.press(nextBtn);
    });

    expect(mock_setParams).toHaveBeenCalledWith(
      expect.objectContaining({ pageNumStr: "1" })
    );
  });

  it('handles next / previous clicks, last page', async () => {
    // setup mocks
    const productSummaries: ProductSummaryT[] = [
      buildProductSummaryMock(),
      buildProductSummaryMock(),
      buildProductSummaryMock(),
    ];
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: productSummaries.slice(2, 3), pageNum: 1, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify components
    const prevBtn = getByTestId('PrevButtonTid');
    const nextBtn = getByTestId('NextButtonTid');

    expect(prevBtn.props.disabled).toEqual(false);
    expect(nextBtn.props.disabled).toEqual(true);

    // request prev page
    act(() => {
      fireEvent.press(prevBtn);
    });

    expect(mock_setParams).toHaveBeenCalledWith(
      expect.objectContaining({ pageNumStr: "0" })
    );
  });

  it('does not render clear filters button', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    // render
    const { queryByTestId } = render(
      <ProductListingPageContent />
    );

    // verify no clear button
    expect(queryByTestId('ClearFilterButtonTid')).toBeNull();
  });

  it('renders clear filters button when category is changed', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", category: 'MOCK_VALUE' });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify button exists
    getByTestId('ClearFilterButtonTid');
  });

  it('renders clear filters button when availability is changed', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", availabilityMinStr: '1' });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify button exists
    getByTestId('ClearFilterButtonTid');
  });

  it('does not render clear filters button when sort is undefined', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", sort: undefined });

    // render
    const { queryByTestId } = render(
      <ProductListingPageContent />
    );

    // verify no clear button
    expect(queryByTestId('ClearFilterButtonTid')).toBeNull();
  });

  it('does not render clear filters button when sort is at default', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", sort: DEFAULT_SORT_OPTION });

    // render
    const { queryByTestId } = render(
      <ProductListingPageContent />
    );

    // verify no clear button
    expect(queryByTestId('ClearFilterButtonTid')).toBeNull();
  });

  it('renders clear filters button when sort is changed', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", sort: 'MOCK_VALUE' });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // verify button exists
    getByTestId('ClearFilterButtonTid');
  });

  it('renders clear filters button, and handles click', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", category: 'MOCK_CATEGORY' });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // click filters button
    const clearBtn = getByTestId('ClearFilterButtonTid');
    act(() => {
      fireEvent.press(clearBtn);
    });

    // verify params were set
    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: undefined,
      category: undefined,
      availability: undefined,
      sort: undefined,
    });
  });

  it('applies filters', async () => {
    // setup mocks
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, isLastPage: true },
    });
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1", category: 'MOCK_CATEGORY' });

    // render
    const { getByTestId } = render(
      <ProductListingPageContent />
    );

    // apply some filters
    const filtersButton = getByTestId('FiltersButtonTid');
    act(() => {
      filtersButton.props.onApply('MOCK_CATEGORY', undefined, 'MOCK_SORT');
    });
    await waitFor(() => {
      expect(mock_setParams).toHaveBeenCalledWith({
        pageNumStr: "0",
        category: 'MOCK_CATEGORY',
        availability: undefined,
        sort: 'MOCK_SORT',
      });
    })
  });
});
