
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayoutModule from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useProductController } from '@qb-dashboard-ui/domains/product/controller/ProductController';
import { productSummariesToCsv } from '@qb/models';
import { __puiMocks } from '@qb/platform-ui';
import { __rnuiMocks } from '@qb/rnui';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import type { InventoryUpdateContextT } from '../context/InventoryUpdateProvider';
import * as InventoryUpdateProviderModule from '../context/InventoryUpdateProvider';
import { InventoryView } from './InventoryView';

// mocks

jest.mock('@qb/models', () => {
  return {
    productSummariesToCsv: jest.fn(),
  };
});

jest.mock('../../../common/PaginationControl', () => {
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

jest.mock('../../common/ClearFilterButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ClearFilterButton: View,
  };
});

jest.mock('./ProductInventoryTable', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductInventoryTable: View,
  };
});

jest.mock('@qb-dashboard-ui/domains/product/controller/ProductController', () => ({
  useProductController: jest.fn(),
}));

jest.mock('@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider', () => ({
  useAppErrorHandling: jest.fn(),
}));

// tests

describe('InventoryView', () => {
  const { mock_useRnuiDimensions } = __rnuiMocks;
  const {
    mock_useSearchParams,
    mock_useSetSearchParams,
    mock_exportTextFileAsync,
    mock_isWeb,
    mock_usePlatformUiDeviceLocale
  } = __puiMocks;

  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  const spy_useDashboard = jest.spyOn(DashboardLayoutModule, 'useDashboard');
  const productsPerPage = 2;
  spy_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  } as DashboardContextT);

  const spy_useInventoryUpdate = jest.spyOn(InventoryUpdateProviderModule, 'useInventoryUpdate');
  const mock_isAnyStockUpdated = jest.fn();
  const mock_clearAllStockUpdates = jest.fn();
  const mock_getAllStockUpdates = jest.fn();
  spy_useInventoryUpdate.mockReturnValue({
    isAnyStockUpdated: mock_isAnyStockUpdated,
    clearAllStockUpdates: mock_clearAllStockUpdates,
    getAllStockUpdates: mock_getAllStockUpdates,
  } as unknown as InventoryUpdateContextT)

  const mock_useProductController = useProductController as jest.Mock;
  const mock_onUpdateProductBatch = jest.fn();
  mock_useProductController.mockReturnValue({
    onUpdateProductBatch: mock_onUpdateProductBatch,
  });

  const mock_onAppError = jest.fn();
  const mock_onUnknownError = jest.fn();
  const mock_useAppErrorHandling = useAppErrorHandling as jest.Mock;
  mock_useAppErrorHandling.mockReturnValue({
    onAppError: mock_onAppError,
    onUnknownError: mock_onUnknownError,
  });

  const mock_productSummariesToCsv = productSummariesToCsv as jest.Mock;

  const langTag = 'MOCK_LANG_TAG';
  const timeZone = 'MOCK_TIMEZONE';
  mock_usePlatformUiDeviceLocale.mockReturnValue({ langTag, timeZone })

  beforeEach(() => {
    jest.clearAllMocks();

    mock_useRnuiDimensions.mockReturnValue({ isXsScreen: false });
    mock_useSearchParams.mockReturnValue({});
    mock_isAnyStockUpdated.mockReturnValue(false);
    mock_getAllStockUpdates.mockReturnValue([]);
  });

  it('displays content', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };

    // render
    const { getByTestId, getByText } = render(
      <InventoryView data={data} />
    );

    // verify components
    getByText('mocked-t-app:inventoryManagementDesc');
    getByTestId('FiltersButtonTid');
    getByTestId('ClearFilterButtonTid');
    getByTestId('ApplyButtonTid');
    getByTestId('PaginationControlTid');
    getByTestId('ProductInventoryTableTid');
  });

  it('disables apply button when there are no changes', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isAnyStockUpdated.mockReturnValue(false);

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    expect(btn.props.disabled).toEqual(true);
  });

  it('does not disable apply button when there are changes', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isAnyStockUpdated.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    expect(btn.props.disabled).toEqual(false);
  });

  it('handles next / prev', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ pageNumStr: "1" });

    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
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

  it('handles applied filters', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isAnyStockUpdated.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('FiltersButtonTid');
    btn.props.onApply();

    expect(mock_clearAllStockUpdates).toHaveBeenCalled();
  });

  it('handles clear filters', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isAnyStockUpdated.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ClearFilterButtonTid');
    btn.props.onClear();

    expect(mock_clearAllStockUpdates).toHaveBeenCalled();
  });

  it('handles apply all, no errors', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_getAllStockUpdates.mockReturnValue([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    mock_onUpdateProductBatch.mockResolvedValue({ errors: [] });

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    await waitFor(() => {
      fireEvent.press(btn);
    });

    expect(mock_onUpdateProductBatch).toHaveBeenCalledWith([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    expect(mock_onAppError).not.toHaveBeenCalled();
    expect(mock_onUnknownError).not.toHaveBeenCalled();
    expect(mock_clearAllStockUpdates).toHaveBeenCalled();
  });

  it('handles apply all, errors are returned', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_getAllStockUpdates.mockReturnValue([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    mock_onUpdateProductBatch.mockResolvedValue({ errors: ['ERROR'] });

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    await waitFor(() => {
      fireEvent.press(btn);
    });

    expect(mock_onUpdateProductBatch).toHaveBeenCalledWith([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    expect(mock_onAppError).toHaveBeenCalledWith('appClientError:someProductsNotUpdated');
    expect(mock_onUnknownError).not.toHaveBeenCalled();
    expect(mock_clearAllStockUpdates).toHaveBeenCalled();
  });

  it('handles apply all, error is thrown', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_getAllStockUpdates.mockReturnValue([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    mock_onUpdateProductBatch.mockRejectedValue('ERROR');

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ApplyButtonTid');
    await waitFor(() => {
      fireEvent.press(btn);
    });

    expect(mock_onUpdateProductBatch).toHaveBeenCalledWith([{ productId: 'PID1', newStock: 3, reason: 'MOCK_REASON' }]);
    expect(mock_onAppError).not.toHaveBeenCalled();
    expect(mock_onUnknownError).toHaveBeenCalledWith('ERROR');
    expect(mock_clearAllStockUpdates).toHaveBeenCalled();
  });

  it('does not render export-to-csv button on non-web', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isWeb.mockReturnValue(false);

    // render
    const { queryByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    expect(queryByTestId('ExportToCsvButton')).toBeNull();
  });

  it('renders export-to-csv button on web and handles export', async () => {
    // setup mocks
    const data = { productSummaries: [], pageNum: 0, totalItems: 10, isLastPage: false };
    mock_isWeb.mockReturnValue(true);
    mock_productSummariesToCsv.mockReturnValue('MOCK_CSV');

    // render
    const { getByTestId } = render(
      <InventoryView data={data} />
    );

    // verify components
    const btn = getByTestId('ExportToCsvButton');
    await waitFor(() => {
      fireEvent.press(btn);
    });

    expect(mock_productSummariesToCsv).toHaveBeenCalledWith([], langTag, timeZone);
    expect(mock_exportTextFileAsync).toHaveBeenCalledWith('data.csv', 'MOCK_CSV');
  });
});
