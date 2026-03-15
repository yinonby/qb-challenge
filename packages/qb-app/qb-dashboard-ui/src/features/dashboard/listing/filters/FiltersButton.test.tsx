
import { __rnuiMocks } from '@qb/rnui';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React, { act } from 'react';
import { FiltersButton } from './FiltersButton';

// mocks

jest.mock('./FiltersView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    FiltersView: View,
  };
});

jest.mock('@qb-dashboard-ui/app/layout/DashboardLayout', () => ({
  useDashboard: () => ({
    appHeaderHeight: 50,
  }),
}));

// tests

describe('FiltersButton', () => {
  const { mock_useRnuiDimensions } = __rnuiMocks;

  beforeEach(() => {
    jest.clearAllMocks();

    mock_useRnuiDimensions.mockReturnValue({ isXsScreen: false });
  });

  it('renders button (non-ios)', () => {
    const { getByTestId } = render(<FiltersButton />);

    getByTestId('FilterButtonTid');
  });

  it('renders icon button on ios', () => {
    mock_useRnuiDimensions.mockReturnValue({ isXsScreen: true });

    const { getByTestId } = render(<FiltersButton />);

    getByTestId('IosFilterButtonTid');
  });

  it('opens modal when button pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <FiltersButton />
    );

    expect(queryByTestId('FiltersViewTid')).not.toBeTruthy();

    const btn = getByTestId('FilterButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    getByTestId('FiltersViewTid');
  });

  it('calls FiltersView.onApply and closes modal', async () => {
    const { getByTestId, queryByTestId } = render(
      <FiltersButton />
    );

    const btn = getByTestId('FilterButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    const filtersView = getByTestId('FiltersViewTid');
    act(() => {
      filtersView.props.onApply();
    });

    await waitFor(() => {
      expect(queryByTestId('FiltersViewTid')).toBeNull();
    });
  });
});
