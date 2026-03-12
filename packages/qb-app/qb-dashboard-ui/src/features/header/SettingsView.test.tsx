
import { render } from '@testing-library/react-native';
import React from 'react';
import { SettingsView } from './SettingsView';

// mocks

jest.mock('./LanguageSelect', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    LanguageSelect: View,
  };
});

// tests

describe('SettingsView', () => {
  const mock_onChangeThemeMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders all elements', () => {
    const { getByTestId } = render(
      <SettingsView themeMode='dark' onChangeThemeMode={mock_onChangeThemeMode} />
    );

    getByTestId('RnuiSwitchTid');
    getByTestId('LanguageSelectTid');
  });

  it('calls onChangeThemeMode("dark") when switch is on', () => {
    const { getByTestId } = render(
      <SettingsView themeMode='light' onChangeThemeMode={mock_onChangeThemeMode} />
    );

    const _switch = getByTestId('RnuiSwitchTid');
    _switch.props.onToggleSwitch(true);

    expect(mock_onChangeThemeMode).toHaveBeenCalledWith('dark');
  });

  it('calls onChangeThemeMode("light") when switch is on', () => {
    const { getByTestId } = render(
      <SettingsView themeMode='dark' onChangeThemeMode={mock_onChangeThemeMode} />
    );

    const _switch = getByTestId('RnuiSwitchTid');
    _switch.props.onToggleSwitch(false);

    expect(mock_onChangeThemeMode).toHaveBeenCalledWith('light');
  });
});
