
import { __appLocalizationMocks } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { render } from '@testing-library/react-native';
import React from 'react';
import { LanguageSelect } from './LanguageSelect';

describe('LanguageSelect', () => {
  const { mock_langCode, mock_onLangCodeChange } = __appLocalizationMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders radio button group', () => {
    const { getByTestId } = render(
      <LanguageSelect />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');
    expect(group.props.selectedOptionKey).toEqual(mock_langCode);
  });

  it('calls renderOption', () => {
    const { getByTestId } = render(
      <LanguageSelect />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');

    const option1 = group.props.renderOption('en');
    expect(option1).toBeTruthy();

    const option2 = group.props.renderOption('fr');
    expect(option2).toBeTruthy();

    const option3 = group.props.renderOption('es');
    expect(option3).toBeNull();
  });

  it('calls onLangCodeChange("fr") when "fr" is selected', () => {
    const { getByTestId } = render(
      <LanguageSelect />
    );

    const group = getByTestId('RnuiRadioButtonGroupTid');
    group.props.onChange('fr');

    expect(mock_onLangCodeChange).toHaveBeenCalledWith('fr');
  });
});
