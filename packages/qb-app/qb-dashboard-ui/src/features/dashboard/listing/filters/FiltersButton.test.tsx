
import { __puiMocks } from '@qb/platform-ui';
import { fireEvent, render } from '@testing-library/react-native';
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
  const { mock_isIos } = __puiMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button (non-ios)', () => {
    mock_isIos.mockReturnValue(false);

    const { getByTestId } = render(<FiltersButton onApply={jest.fn()} />);

    getByTestId('FilterButtonTid');
  });

  it('renders icon button on ios', () => {
    mock_isIos.mockReturnValue(true);

    const { getByTestId } = render(<FiltersButton onApply={jest.fn()} />);

    getByTestId('IosFilterButtonTid');
  });

  it('opens modal when button pressed', () => {
    mock_isIos.mockReturnValue(false);

    const { getByTestId, queryByTestId } = render(
      <FiltersButton onApply={jest.fn()} />
    );

    expect(queryByTestId('FiltersViewTid')).not.toBeTruthy();

    const btn = getByTestId('FilterButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    getByTestId('FiltersViewTid');
  });

  it('calls onApply and closes modal', () => {
    mock_isIos.mockReturnValue(false);

    const mock_onApply = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <FiltersButton onApply={mock_onApply} />
    );

    const btn = getByTestId('FilterButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    const filtersView = getByTestId('FiltersViewTid');
    act(() => {
      filtersView.props.onApply('electronics', 'inStock', 'priceAscending');
    });

    expect(mock_onApply).toHaveBeenCalledWith('electronics', 'inStock', 'priceAscending');

    expect(queryByTestId('FiltersViewTid')).toBeNull();
  });
});
