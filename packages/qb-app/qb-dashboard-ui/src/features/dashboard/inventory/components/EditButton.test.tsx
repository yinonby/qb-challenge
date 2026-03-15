
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React, { act } from 'react';
import { EditButton } from './EditButton';

// mocks
jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: () => ({ t: (k: string) => k }),
}));

jest.mock('@qb-dashboard-ui/app/layout/DashboardLayout', () => ({
  useDashboard: () => ({ appHeaderHeight: 10 }),
}));

jest.mock('@qb/platform-ui', () => ({
  isIos: () => false,
}));

jest.mock('./EditView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    EditView: View,
  };
});

describe('EditButton', () => {
  const defaultProps = {
    productId: 'PID1',
    productName: 'Product A',
    curStock: 5,
    productStockHistoryItems: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the icon button', () => {
    const { getByTestId } = render(<EditButton {...defaultProps} />);
    expect(getByTestId('EditButtonTid')).toBeTruthy();
  });

  it('opens modal when icon button is pressed', async () => {
    const { getByTestId, queryByTestId } = render(<EditButton {...defaultProps} />);

    expect(queryByTestId('EditViewTid')).toBeNull();

    fireEvent.press(getByTestId('EditButtonTid'));

    await waitFor(() => {
      getByTestId('EditViewTid');
    });
  });

  it('closes modal when onDismiss is triggered', async () => {
    const { getByTestId, queryByTestId } = render(<EditButton {...defaultProps} />);

    fireEvent.press(getByTestId('EditButtonTid'));

    const modal = getByTestId('RnuiModalTid');

    fireEvent(modal, 'onDismiss');

    await waitFor(() => {
      expect(queryByTestId('EditViewTid')).toBeNull();
    });
  });

  it('closes modal when EditView.onApply is triggered', async () => {
    const { getByTestId, queryByTestId } = render(
      <EditButton {...defaultProps} />
    );

    fireEvent.press(getByTestId('EditButtonTid'));

    const editView = getByTestId('EditViewTid');
    act(() => {
      editView.props.onApply();
    });

    await waitFor(() => {
      expect(queryByTestId('EditViewTid')).toBeNull();
    });
  });

  it('calls onApply when EditView.onApply is triggered', async () => {
    const mock_onApply = jest.fn();

    const { getByTestId } = render(
      <EditButton {...defaultProps} onApply={mock_onApply} />
    );

    fireEvent.press(getByTestId('EditButtonTid'));

    const editView = getByTestId('EditViewTid');
    act(() => {
      editView.props.onApply();
    });

    expect(mock_onApply).toHaveBeenCalled();
  });

  it('closes modal when EditView.onAddToBatch is triggered', async () => {
    const { getByTestId, queryByTestId } = render(
      <EditButton {...defaultProps} />
    );

    fireEvent.press(getByTestId('EditButtonTid'));

    const editView = getByTestId('EditViewTid');
    act(() => {
      editView.props.onAddToBatch();
    });

    await waitFor(() => {
      expect(queryByTestId('EditViewTid')).toBeNull();
    });
  });

  it('calls onAddToBatch when EditView.onAddToBatch is triggered', async () => {
    const mock_onAddToBatch = jest.fn();

    const { getByTestId } = render(
      <EditButton {...defaultProps} onAddToBatch={mock_onAddToBatch} />
    );

    fireEvent.press(getByTestId('EditButtonTid'));

    const editView = getByTestId('EditViewTid');
    act(() => {
      editView.props.onAddToBatch();
    });

    expect(mock_onAddToBatch).toHaveBeenCalled();
  });
});
