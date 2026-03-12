
import { __appLocalizationMocks } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { sortOptions } from '@qb/models';
import { render } from '@testing-library/react-native';
import React from 'react';
import { SortSelect } from './SortSelect';

describe('SortSelect', () => {
  const { mock_t } = __appLocalizationMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders radio button group', () => {
    const { getByTestId } = render(
      <SortSelect value={'priceAscending'} onChange={jest.fn()} />
    );

    getByTestId('RnuiRadioButtonGroupTid');
  });

  it('calls renderOption', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <SortSelect value="priceAscending" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    for (const sortOption of sortOptions) {
      const option = group.props.renderOption(sortOption);
      expect(option).toBeTruthy();
      expect(mock_t).toHaveBeenCalledWith('sort:' + sortOption);
    }
  });

  it('calls onChange("priceAscending") when priceAscending selected', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <SortSelect value="priceAscending" onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    group.props.onChange('priceAscending');

    expect(mock_onChange).toHaveBeenCalledWith('priceAscending');
  });

  it('passes selected value when defined', () => {
    const mock_onChange = jest.fn();

    const { getByTestId } = render(
      <SortSelect value={'priceAscending'} onChange={mock_onChange} />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    expect(group.props.selectedOptionKey).toBe('priceAscending');
  });
});
