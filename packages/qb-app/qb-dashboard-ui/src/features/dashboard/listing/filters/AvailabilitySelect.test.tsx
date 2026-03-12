
import { __appLocalizationMocks } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { availabilityOptions } from '@qb/models';
import { render } from '@testing-library/react-native';
import React from 'react';
import { AvailabilitySelect } from './AvailabilitySelect';

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

    for (const availabilityOption of availabilityOptions) {
      const option = group.props.renderOption(availabilityOption);
      expect(option).toBeTruthy();
      expect(mock_t).toHaveBeenCalledWith('app:' + availabilityOption);
    }
  });

  it('calls onChange(undefined) when "all" is selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value="inStock" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('all');

    expect(mock_onChange).toHaveBeenCalledWith(undefined);
  });

  it('calls onChange("inStock") when inStock selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value="inStock" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('inStock');

    expect(mock_onChange).toHaveBeenCalledWith('inStock');
  });

  it('uses "all" as selected option when value is undefined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={undefined} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('all');
  });

  it('passes selected value when defined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <AvailabilitySelect value={'inStock'} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('inStock');
  });
});
