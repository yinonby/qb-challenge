
import { DEFAULT_SORT_OPTION } from '@qb/models';
import { __puiMocks } from '@qb/platform-ui';
import { fireEvent, render } from '@testing-library/react-native';
import React, { act } from 'react';
import { FiltersView } from './FiltersView';

// mocks

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    flexRowReverse: {},
  }),
}));

jest.mock('../../../common/SortSelect', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    SortSelect: View,
  };
});

jest.mock('../../../common/CategorySelect', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    CategorySelect: View,
  };
});

jest.mock('../../../common/AvailabilityRangeSelect', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AvailabilityRangeSelect: View,
  };
});

// tests

describe('FiltersView', () => {
  const { mock_useSearchParams, mock_useSetSearchParams } = __puiMocks;
  const mock_setParams = jest.fn();
  mock_useSearchParams.mockReturnValue({
    category: undefined,
    availability: undefined,
    sort: undefined,
  });
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders selectors correctly, without search params', () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({
      category: undefined,
      availability: undefined,
      sort: undefined,
    });
    const onApply = jest.fn();

    const { getByTestId } = render(<FiltersView onApply={onApply} />);

    const sortSelect = getByTestId('SortSelectTid');
    const categorySelect = getByTestId('CategorySelectTid');
    const availabilitySelect = getByTestId('AvailabilityRangeSelectTid');

    expect(sortSelect.props.value).toEqual(DEFAULT_SORT_OPTION);
    expect(categorySelect.props.value).toEqual(undefined);
    expect(availabilitySelect.props.value).toEqual(undefined);
  });

  it('renders selectors correctly, with search params', () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({
      category: 'MOCK_CATEGORY',
      availabilityMinStr: '1',
      availabilityMaxStr: '2',
      sort: 'MOCK_SORT',
    });
    const onApply = jest.fn();

    const { getByTestId } = render(<FiltersView onApply={onApply} />);

    const sortSelect = getByTestId('SortSelectTid');
    const categorySelect = getByTestId('CategorySelectTid');
    const availabilitySelect = getByTestId('AvailabilityRangeSelectTid');

    expect(sortSelect.props.value).toEqual('MOCK_SORT');
    expect(categorySelect.props.value).toEqual('MOCK_CATEGORY');
    expect(availabilitySelect.props.value).toEqual({ minStock: 1, maxStock: 2 });
  });

  it('renders filters and disabled apply button initially', () => {
    const { getByTestId } = render(<FiltersView onApply={jest.fn()} />);

    const applyButton = getByTestId('ApplyButtonTid');

    expect(applyButton.props.disabled).toBe(true);
  });

  it('enables apply button when filter changes', async () => {
    const { getByTestId } = render(<FiltersView onApply={jest.fn()} />);

    const sortSelect = getByTestId('SortSelectTid');
    act(() => {
      sortSelect.props.onChange('priceDescending');
    });

    const applyButton = getByTestId('ApplyButtonTid');
    expect(applyButton.props.disabled).toBe(false)
  });

  it('handles apply, without onApply callback', () => {
    const { getByTestId } = render(<FiltersView />);

    const sortSelect = getByTestId('SortSelectTid');
    const categorySelect = getByTestId('CategorySelectTid');
    const availabilitySelect = getByTestId('AvailabilityRangeSelectTid');

    act(() => {
      sortSelect.props.onChange('MOCK_SORT');
      categorySelect.props.onChange('MOCK_CATEGORY');
      availabilitySelect.props.onChange('MOCK_AVAILABILITY');
    });

    fireEvent.press(getByTestId('ApplyButtonTid'));

    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: "0",
      category: 'MOCK_CATEGORY',
      availability: undefined,
      sort: 'MOCK_SORT',
    });
  });

  it('handles apply, with onApply callback', () => {
    const mock_onApply = jest.fn();

    const { getByTestId } = render(<FiltersView onApply={mock_onApply} />);

    const sortSelect = getByTestId('SortSelectTid');
    const categorySelect = getByTestId('CategorySelectTid');
    const availabilitySelect = getByTestId('AvailabilityRangeSelectTid');

    act(() => {
      sortSelect.props.onChange('MOCK_SORT');
      categorySelect.props.onChange('MOCK_CATEGORY');
      availabilitySelect.props.onChange('MOCK_AVAILABILITY');
    });

    fireEvent.press(getByTestId('ApplyButtonTid'));

    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: "0",
      category: 'MOCK_CATEGORY',
      availability: undefined,
      sort: 'MOCK_SORT',
    });
    expect(mock_onApply).toHaveBeenCalled();
  });
});