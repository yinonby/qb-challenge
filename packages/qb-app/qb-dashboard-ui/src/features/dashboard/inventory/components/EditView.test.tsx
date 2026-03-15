
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
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

describe('EditView', () => {
  const defaultProps = {
    productName: 'Test Product',
    curStock: 5,
    onEdit: jest.fn(),
    testID: 'editView',
  };

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

  it('disables Apply button initially', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const applyButton = getByTestId('ApplyButtonTid');

    expect(applyButton.props.disabled).toBe(true);
  });

  it('enables Apply button when valid input is provided', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const applyButton = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '10');
    fireEvent.changeText(reasonInput, 'restock');

    expect(applyButton.props.disabled).toBe(false);
  });

  it('does not call onEdit when no new stock is provided', () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onEdit={onEditMock} />);
    const reasonInput = getByTestId('ReasonTextInputTid');
    const applyButton = getByTestId('ApplyButtonTid');

    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(applyButton);

    expect(onEditMock).not.toHaveBeenCalled();
  });

  it('calls onEdit with correct values when Apply button is pressed', () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(<EditView {...defaultProps} onEdit={onEditMock} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const reasonInput = getByTestId('ReasonTextInputTid');
    const applyButton = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '15');
    fireEvent.changeText(reasonInput, 'restock');

    fireEvent.press(applyButton);

    expect(onEditMock).toHaveBeenCalledWith(15, 'restock');
  });

  it('resets newStock to null if input is empty or invalid', () => {
    const { getByTestId } = render(<EditView {...defaultProps} />);
    const stockInput = getByTestId('NewStockTextInputTid');
    const applyButton = getByTestId('ApplyButtonTid');

    fireEvent.changeText(stockInput, '');
    expect(applyButton.props.disabled).toBe(true);

    fireEvent.changeText(stockInput, 'abc'); // invalid input
    expect(applyButton.props.disabled).toBe(true);
  });
});
