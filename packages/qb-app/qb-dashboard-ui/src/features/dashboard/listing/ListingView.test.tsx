
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ListingView } from './ListingView';

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

jest.mock('../common/ProductNameInput', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductNameInput: View,
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

describe('ListingView data={data}', () => {
  const { mock_useSearchParams, mock_useSetSearchParams, mock_isWeb } = __puiMocks;

  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  const spy_useDashboard = jest.spyOn(DashboardLayout, 'useDashboard');
  const productsPerPage = 2;
  spy_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  } as DashboardContextT);

  beforeEach(() => {
    jest.clearAllMocks();

    mock_isWeb.mockReturnValue(true);
    mock_useSearchParams.mockReturnValue({});
  });

  it('displays content, no products', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };

    // render
    const { getByTestId, getByText } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={jest.fn()} />
    );

    // verify components
    getByTestId('FiltersButtonTid');
    getByTestId('ProductNameInputTid');
    getByTestId('ClearFilterButtonTid');
    getByTestId('PaginationControlTid');
    getByText('mocked-t-app:noProducts');
  });

  it('does not render ProductNameInput in non-web', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isWeb.mockReturnValue(false);

    // render
    const { queryByTestId } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={jest.fn()} />
    );

    // verify components
    expect(queryByTestId('ProductNameInputTid')).toBeNull();
  });

  it('displays content, with products', async () => {
    // setup mocks
    const data = { productSummaries: [buildProductSummaryMock()], pageNum: 0, totalItems: 10, isLastPage: false };

    // render
    const { getByTestId } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={jest.fn()} />
    );

    // verify components
    getByTestId('FiltersButtonTid');
    getByTestId('ProductNameInputTid');
    getByTestId('ClearFilterButtonTid');
    getByTestId('PaginationControlTid');
    getByTestId('ProductListingGridTid');
  });

  it('handles next / prev', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };

    // render
    const { getByTestId } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={jest.fn()} />
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

  it('calls onProductNameFilterChange when name filter input changed', async () => {
    // setup mocks
    const data = { productSummaries: [buildProductSummaryMock()], pageNum: 0, totalItems: 10, isLastPage: false };
    const mock_onProductNameFilterChange = jest.fn();

    // render
    const { getByTestId } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={mock_onProductNameFilterChange} />
    );

    // verify components
    const input = getByTestId('ProductNameInputTid');
    input.props.onChange('ABC');

    expect(mock_onProductNameFilterChange).toHaveBeenCalledWith('ABC');
  });

  it('calls onProductNameFilterChange with empty string when filters cleared', async () => {
    // setup mocks
    const data = { productSummaries: [buildProductSummaryMock()], pageNum: 0, totalItems: 10, isLastPage: false };
    const mock_onProductNameFilterChange = jest.fn();

    // render
    const { getByTestId } = render(
      <ListingView data={data} productNameFilter='' onProductNameFilterChange={mock_onProductNameFilterChange} />
    );

    // verify components
    const input = getByTestId('ClearFilterButtonTid');
    input.props.onClear();

    expect(mock_onProductNameFilterChange).toHaveBeenCalledWith('');
  });
});
