
import { __appLocalizationMocks } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { render } from '@testing-library/react-native';
import React from 'react';
import { AvailabilitySelect, availabilitySelectOptions } from './AvailabilitySelect';

describe('AvailabilitySelect', () => {
  const { mock_t } = __appLocalizationMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders radio button group', () => {
    const { getByTestId } = render(
      <AvailabilitySelect value={undefined} onChange={jest.fn()} />
    );

    getByTestId('RnuiRadioButtonGroupTid');
  });

  it('calls renderOption', () => {
    const { getByTestId } = render(
      <AvailabilitySelect value={undefined} onChange={jest.fn()} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    const option = group.props.renderOption('all');
    expect(option).toBeTruthy();
    expect(mock_t).toHaveBeenCalledWith('app:all');

    for (const availabilityOption of availabilitySelectOptions) {
      const option = group.props.renderOption(availabilityOption);
      expect(option).toBeTruthy();
      expect(mock_t).toHaveBeenCalledWith('app:' + availabilityOption);
    }
  });

  it('calls onChange with correct availability when "all" is selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={{ minStock: 1, maxStock: undefined }} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('all');

    expect(mock_onChange).toHaveBeenCalledWith(undefined);
  });

  it('calls onChange with correct availability when inStock selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={{ minStock: 1, maxStock: undefined }} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('inStock');

    expect(mock_onChange).toHaveBeenCalledWith({ minStock: 1, maxStock: undefined });
  });

  it('calls onChange with correct availability when outOfStock selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={{ minStock: 1, maxStock: undefined }} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('outOfStock');

    expect(mock_onChange).toHaveBeenCalledWith({ minStock: undefined, maxStock: 0 });
  });

  it('uses "all" as selected option when value is undefined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={undefined} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('all');
  });

  it('uses "inStock" as selected option', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={{ minStock: 1, maxStock: undefined }} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('inStock');
  });

  it('uses "outOfStock" as selected option', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={{ minStock: undefined, maxStock: 0 }} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('outOfStock');
  });
});
