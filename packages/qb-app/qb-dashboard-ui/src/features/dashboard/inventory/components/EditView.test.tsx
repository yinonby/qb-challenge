
import { buildProductStockHistoryItemMock } from '@qb/models/test-utils';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useInventoryUpdate } from '../context/InventoryUpdateProvider';
import { EditView } from './EditView';

// mocks

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    spacing: { margin: 10 },
    flex1: { flex: 1 },
    flexRow: { flexDirection: 'row' },
    flexRowReverse: { flexDirection: 'row-reverse' },
  }),
}));

jest.mock('../context/InventoryUpdateProvider', () => ({
  useInventoryUpdate: jest.fn(),
}));

jest.mock('./StockHistoryView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    StockHistoryView: View,
  };
});

// tests

describe('EditView', () => {
  const defaultProps = {
    productId: 'PID1',
    productName: 'Test Product',
    curStock: 5,
    productStockHistoryItems: [],
    testID: 'editView',
  };

  const mock_useInventoryUpdate = useInventoryUpdate as jest.Mock;
  const mock_addStockUpdate = jest.fn();
  mock_useInventoryUpdate.mockReturnValue({
    addStockUpdate: mock_addStockUpdate,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial props', () => {
    const { getByText, getByTestId } = render(<EditView {...defaultProps} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('mocked-t-app:stockLevel')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByTestId('NewStockTextInputTid')).toBeTruthy();
    expect(getByTestId('ReasonTextInputTid')).toBeTruthy();
  });

  it('renders correctly with StockHistoryView', () => {
    const productStockHistoryItems = [buildProductStockHistoryItemMock()];
    const { getByText, getByTestId } =
      render(<EditView {...defaultProps} productStockHistoryItems={productStockHistoryItems} />);

    expect(getByText('mocked-t-app:stockHistory')).toBeTruthy();
    expect(getByTestId('StockHistoryViewTid')).toBeTruthy();
  });

  it('disables buttons initially', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const applyButton = getByTestId('ApplyButtonTid');
    const addToBatchButton = getByTestId('AddToBatchButtonTid');

    expect(applyButton.props.disabled).toBe(true);
    expect(addToBatchButton.props.disabled).toBe(true);
  });

  it('enables buttons when valid input is provided', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const applyButton = getByTestId('AddToBatchButtonTid');
    const addToBatchButton = getByTestId('AddToBatchButtonTid');

    fireEvent.changeText(stockInput, '10');
    fireEvent.changeText(reasonInput, 'restock');

    expect(applyButton.props.disabled).toBe(false);
    expect(addToBatchButton.props.disabled).toBe(false);
  });

  it('does not call onApply callback when stock is not provided and apply button clicked', () => {
    const mock_onApply = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onApply={mock_onApply} />);
    const btn = getByTestId('ApplyButtonTid');

    fireEvent.press(btn);

    expect(mock_onApply).not.toHaveBeenCalled();
  });

  it('does not call onApply callback when reason is not provided and apply button clicked', () => {
    const mock_onApply = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onApply={mock_onApply} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const btn = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '15');

    fireEvent.press(btn);

    expect(mock_onApply).not.toHaveBeenCalled();
  });

  it('calls onApply', async () => {
    const mock_onApply = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onApply={mock_onApply} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const btn = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '15');
    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(btn);

    await waitFor(() => {
      expect(mock_onApply).toHaveBeenCalled();
    });
  });

  it('does not call onApply when not supplied', async () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const btn = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '15');
    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(btn);
  });

  it('does not call onAddToBatch callback when stock is not provided and apply button clicked', () => {
    const mock_onAddToBatch = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onAddToBatch={mock_onAddToBatch} />);
    const btn = getByTestId('AddToBatchButtonTid');

    fireEvent.press(btn);

    expect(mock_onAddToBatch).not.toHaveBeenCalled();
  });

  it('does not call onAddToBatch callback when reason is not provided and apply button clicked', () => {
    const mock_onAddToBatch = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onAddToBatch={mock_onAddToBatch} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const btn = getByTestId('AddToBatchButtonTid');

    fireEvent.changeText(stockInput, '15');

    fireEvent.press(btn);

    expect(mock_onAddToBatch).not.toHaveBeenCalled();
  });

  it('calls onAddToBatch', async () => {
    const mock_onAddToBatch = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onAddToBatch={mock_onAddToBatch} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const btn = getByTestId('AddToBatchButtonTid');

    fireEvent.changeText(stockInput, '15');
    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(btn);

    await waitFor(() => {
      expect(mock_onAddToBatch).toHaveBeenCalled();
    });
  });

  it('does not call onAddToBatch when not supplied', async () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const btn = getByTestId('AddToBatchButtonTid');

    fireEvent.changeText(stockInput, '15');
    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(btn);
  });

  it('resets newStock to null if input is empty or invalid', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const applyButton = getByTestId('AddToBatchButtonTid');

    fireEvent.changeText(stockInput, '');
    expect(applyButton.props.disabled).toBe(true);

    fireEvent.changeText(stockInput, 'abc'); // invalid input
    expect(applyButton.props.disabled).toBe(true);
  });
});
