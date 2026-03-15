
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useInventoryUpdate } from '../context/InventoryUpdateProvider';
import { ProductInventoryTableRow } from './ProductInventoryTableRow';

// mocks

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    flexRow: { flexDirection: 'row' },
    flex1: { flex: 1 },
  }),
}));

jest.mock('./EditButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    EditButton: View,
  };
});

jest.mock('../context/InventoryUpdateProvider', () => ({
  useInventoryUpdate: jest.fn(),
}));

describe('ProductInventoryTableRow', () => {
  const productSummary = buildProductSummaryMock({
    productId: 'p1',
    name: 'Test Product',
    stock: 5,
    imageUrl: 'https://img',
  });

  const mock_useInventoryUpdate = useInventoryUpdate as jest.Mock;
  const mock_addStockUpdate = jest.fn();
  const mock_removeStockUpdate = jest.fn();
  const mock_getStockUpdate = jest.fn();
  const mock_isStockUpdated = jest.fn();
  mock_useInventoryUpdate.mockReturnValue({
    addStockUpdate: mock_addStockUpdate,
    removeStockUpdate: mock_removeStockUpdate,
    getStockUpdate: mock_getStockUpdate,
    isStockUpdated: mock_isStockUpdated,
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product name and stock', () => {
    mock_isStockUpdated.mockReturnValue(false);
    mock_getStockUpdate.mockReturnValue(null);

    const { getByText } = render(
      <ProductInventoryTableRow productSummary={productSummary} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('shows EditButton when stock is not changed', () => {
    mock_isStockUpdated.mockReturnValue(false);
    mock_getStockUpdate.mockReturnValue(null);

    const { getByTestId } = render(
      <ProductInventoryTableRow productSummary={productSummary} />
    );

    expect(getByTestId('EditButtonTid')).toBeTruthy();
  });

  it('calls addStockUpdate when edit happens', () => {
    mock_isStockUpdated.mockReturnValue(false);
    mock_getStockUpdate.mockReturnValue(null);

    const { getByTestId } = render(
      <ProductInventoryTableRow productSummary={productSummary} />
    );

    const btn = getByTestId('EditButtonTid');
    btn.props.onEdit(20, 'MOCK_REASON')

    expect(mock_addStockUpdate).toHaveBeenCalledWith({
      productId: 'p1',
      newStock: 20,
      reason: 'MOCK_REASON',
      originalStock: 5,
    });
  });

  it('shows edited stock and cancel button when stock is changed', () => {
    mock_isStockUpdated.mockReturnValue(true);
    mock_getStockUpdate.mockReturnValue({
      productId: 'p1',
      newStock: 20,
      reason: 'adjustment',
    });

    const { getByText, getByTestId } = render(
      <ProductInventoryTableRow productSummary={productSummary} />
    );

    expect(getByText('20')).toBeTruthy();
    expect(getByTestId('CancelButtonTid')).toBeTruthy();
  });

  it('calls removeStockUpdate when cancel button is pressed', () => {
    mock_isStockUpdated.mockReturnValue(true);
    mock_getStockUpdate.mockReturnValue({
      productId: 'p1',
      newStock: 20,
      reason: 'adjustment',
    });

    const { getByTestId } = render(
      <ProductInventoryTableRow productSummary={productSummary} />
    );

    fireEvent.press(getByTestId('CancelButtonTid'));

    expect(mock_removeStockUpdate).toHaveBeenCalledWith('p1');
  });
});
