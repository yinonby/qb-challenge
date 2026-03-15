
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayoutModule from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductsPageModel from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { __puiMocks } from '@qb/platform-ui';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import type { InventoryUpdateContextT } from '../context/InventoryUpdateProvider';
import * as InventoryUpdateProviderModule from '../context/InventoryUpdateProvider';
import { ProductInventoryPageContent } from './ProductInventoryPageContent';

// mocks

jest.mock('../../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('../../../common/PaginationControl', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    PaginationControl: View,
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

  const spy_useInventoryUpdate = jest.spyOn(InventoryUpdateProviderModule, 'useInventoryUpdate');
  const mock_isAnyStockUpdated = jest.fn();
  spy_useInventoryUpdate.mockReturnValue({
    isAnyStockUpdated: mock_isAnyStockUpdated,
  } as unknown as InventoryUpdateContextT)

  beforeEach(() => {
    jest.clearAllMocks();

    mock_isIos.mockReturnValue(false);
    mock_useSearchParams.mockReturnValue({});
    mock_isAnyStockUpdated.mockReturnValue(false);
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
    const { getByTestId, getByText } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    getByText('mocked-t-app:inventoryManagementDesc');
    getByTestId('PaginationControlTid');
    getByTestId('ProductInventoryTableTid');
  });

  it('disables apply button when there are no changes', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });
    mock_isAnyStockUpdated.mockReturnValue(false);

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    expect(btn.props.disabled).toEqual(true);
  });

  it('does not disable apply button when there are changes', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });
    mock_isAnyStockUpdated.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    expect(btn.props.disabled).toEqual(false);
  });

  it('handled apply', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    spy_useProductsPageModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false },
    });
    mock_isAnyStockUpdated.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    fireEvent.press(btn);
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
      <ProductInventoryPageContent />
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
