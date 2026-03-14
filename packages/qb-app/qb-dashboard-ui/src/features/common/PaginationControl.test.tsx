
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { PaginationControl } from './PaginationControl';

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    flexRow: {},
  }),
}));

describe('PaginationControl', () => {
  const onPrevMock = jest.fn();
  const onNextMock = jest.fn();

  const defaultProps = {
    totalItemsNum: 50,
    curPage: 1,
    curPageItemsNum: 10,
    isLastPage: false,
    itemsPerPage: 10,
    onPrev: onPrevMock,
    onNext: onNextMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct range text', () => {
    const { getByText } = render(<PaginationControl {...defaultProps} />);
    expect(getByText('11-20 / 50')).toBeTruthy();
  });

  it('Prev button disabled on first page', () => {
    const { getByTestId } = render(
      <PaginationControl {...defaultProps} curPage={0} />
    );
    expect(getByTestId('PrevButtonTid').props.disabled).toBe(true);
  });

  it('Prev button enabled on non-first page', () => {
    const { getByTestId } = render(<PaginationControl {...defaultProps} />);
    expect(getByTestId('PrevButtonTid').props.disabled).toBe(false);
  });

  it('Next button disabled on last page', () => {
    const { getByTestId } = render(
      <PaginationControl {...defaultProps} isLastPage={true} />
    );
    expect(getByTestId('NextButtonTid').props.disabled).toBe(true);
  });

  it('Next button enabled on non-last page', () => {
    const { getByTestId } = render(<PaginationControl {...defaultProps} />);
    expect(getByTestId('NextButtonTid').props.disabled).toBe(false);
  });

  it('calls onPrev when Prev button pressed', () => {
    const { getByTestId } = render(<PaginationControl {...defaultProps} />);
    fireEvent.press(getByTestId('PrevButtonTid'));
    expect(onPrevMock).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when Next button pressed', () => {
    const { getByTestId } = render(<PaginationControl {...defaultProps} />);
    fireEvent.press(getByTestId('NextButtonTid'));
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  it('displays correct range when items are fewer than itemsPerPage', () => {
    const { getByText } = render(
      <PaginationControl {...defaultProps} curPageItemsNum={5} curPage={4} />
    );
    // startIdx = 4*10 = 40, endIdx = 40 + 5 = 45
    expect(getByText('41-45 / 50')).toBeTruthy();
  });
});

