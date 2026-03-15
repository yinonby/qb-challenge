
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AvailabilityRangeSelect } from './AvailabilityRangeSelect';

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: () => ({
    t: (key: string) => key,
  }),
}));

describe('AvailabilityRangeSelect', () => {
  const defaultProps = {
    value: undefined,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inputs with empty values when value is undefined', () => {
    const { getByTestId } = render(
      <AvailabilityRangeSelect {...defaultProps} />
    );

    expect(getByTestId('MinStockInputTid').props.value).toBe('');
    expect(getByTestId('MaxStockInputTid').props.value).toBe('');
  });

  it('calls onChange when min stock changes to a valid number', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilityRangeSelect value={{ minStock: undefined, maxStock: 10 }} onChange={onChange} />
    );

    fireEvent.changeText(getByTestId('MinStockInputTid'), '5');

    expect(onChange).toHaveBeenCalledWith({
      minStock: 5,
      maxStock: 10,
    });
  });

  it('calls onChange when max stock changes to a valid number', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilityRangeSelect value={{ minStock: 5, maxStock: undefined }} onChange={onChange} />
    );

    fireEvent.changeText(getByTestId('MaxStockInputTid'), '20');

    expect(onChange).toHaveBeenCalledWith({
      minStock: 5,
      maxStock: 20,
    });
  });
});
