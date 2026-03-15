
import { DEFAULT_SORT_OPTION } from '@qb/models';
import { __puiMocks } from '@qb/platform-ui';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ClearFilterButton } from './ClearFilterButton';

describe('ClearFilterButton', () => {
  const { mock_useSearchParams, mock_useSetSearchParams } = __puiMocks;
  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  beforeEach(() => {
    jest.clearAllMocks();

    mock_useSearchParams.mockReturnValue({});
  });

  it('disables clear filters button on init', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({});

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify no clear button
    expect(getByTestId('RnuiIconButtonTid').props.disabled).toBeTruthy();
  });

  it('renders clear filters button when category is changed', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ category: 'MOCK_VALUE' });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify button exists
    getByTestId('RnuiIconButtonTid');
  });

  it('renders clear filters button when availability is changed', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ availabilityMinStr: '1' });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify button exists
    getByTestId('RnuiIconButtonTid');
  });

  it('disables clear filters button when sort is undefined', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ sort: undefined });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify no clear button
    expect(getByTestId('RnuiIconButtonTid').props.disabled).toBeTruthy();
  });

  it('disables clear filters button when sort is at default', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ sort: DEFAULT_SORT_OPTION });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify no clear button
    expect(getByTestId('RnuiIconButtonTid').props.disabled).toBeTruthy();
  });

  it('renders clear filters button when sort is changed', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ sort: 'MOCK_VALUE' });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // verify button exists
    getByTestId('RnuiIconButtonTid');
  });

  it('handles click, without onClear', async () => {
    // setup mocks
    mock_useSearchParams.mockReturnValue({ category: 'MOCK_CATEGORY' });

    // render
    const { getByTestId } = render(
      <ClearFilterButton />
    );

    // click filters button
    const clearBtn = getByTestId('RnuiIconButtonTid');
    act(() => {
      fireEvent.press(clearBtn);
    });

    // verify params were set
    expect(mock_setParams).toHaveBeenCalledWith({
      pageNumStr: undefined,
      category: undefined,
      availability: undefined,
      sort: undefined,
    });
  });

  it('handles click, with onClear', async () => {
    // setup mocks
    const mock_onClear = jest.fn();
    mock_useSearchParams.mockReturnValue({ category: 'MOCK_CATEGORY' });

    // render
    const { getByTestId } = render(
      <ClearFilterButton onClear={mock_onClear} />
    );

    // click filters button
    const clearBtn = getByTestId('RnuiIconButtonTid');
    act(() => {
      fireEvent.press(clearBtn);
    });

    // verify params were set
    expect(mock_onClear).toHaveBeenCalled();
  });
});
