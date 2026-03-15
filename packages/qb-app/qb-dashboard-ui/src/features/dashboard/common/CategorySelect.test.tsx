
import { __appLocalizationMocks } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { productCategories } from '@qb/models';
import { render } from '@testing-library/react-native';
import React from 'react';
import { CategorySelect } from './CategorySelect';

describe('CategorySelect', () => {
  const { mock_t } = __appLocalizationMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders radio button group', () => {
    const { getByTestId } = render(
      <CategorySelect value={undefined} onChange={jest.fn()} />
    );

    getByTestId('RnuiRadioButtonGroupTid');
  });

  it('calls renderOption', () => {
    const { getByTestId } = render(
      <CategorySelect value={undefined} onChange={jest.fn()} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    const option = group.props.renderOption('all');
    expect(option).toBeTruthy();
    expect(mock_t).toHaveBeenCalledWith('app:all');

    for (const productCategory of productCategories) {
      const option = group.props.renderOption(productCategory);
      expect(option).toBeTruthy();
      expect(mock_t).toHaveBeenCalledWith('category:' + productCategory);
    }
  });

  it('calls onChange(undefined) when "all" is selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <CategorySelect value="beauty" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('all');

    expect(mock_onChange).toHaveBeenCalledWith(undefined);
  });

  it('calls onChange("beauty") when beauty selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <CategorySelect value="beauty" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('beauty');

    expect(mock_onChange).toHaveBeenCalledWith('beauty');
  });

  it('uses "all" as selected option when value is undefined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <CategorySelect value={undefined} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('all');
  });

  it('passes selected value when defined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <CategorySelect value={'beauty'} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('beauty');
  });
});
