
import { __puiMocks } from '@qb/platform-ui';
import { fireEvent, render } from '@testing-library/react-native';
import React, { act } from 'react';
import { SettingsButton } from './SettingsButton';

// mocks

jest.mock('./SettingsView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    SettingsView: View,
  };
});

jest.mock('@qb-dashboard-ui/app/layout/DashboardLayout', () => ({
  useDashboard: () => ({
    appHeaderHeight: 50,
  }),
}));

// tests

describe('SettingsButton', () => {
  const { mock_isIos } = __puiMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button', () => {
    mock_isIos.mockReturnValue(false);

    const { getByTestId } = render(<SettingsButton themeMode='dark' onChangeThemeMode={jest.fn()} />);

    getByTestId('SettingsButtonTid');
  });

  it('opens modal when button pressed, closes when onDismiss', () => {
    mock_isIos.mockReturnValue(false);

    const { getByTestId, queryByTestId } = render(
      <SettingsButton themeMode='dark' onChangeThemeMode={jest.fn()} />
    );

    expect(queryByTestId('SettingsViewTid')).not.toBeTruthy();

    const btn = getByTestId('SettingsButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    getByTestId('SettingsViewTid');

    const modal = getByTestId('RnuiModalTid');
    act(() => {
      modal.props.onDismiss();
    });

    expect(queryByTestId('SettingsViewTid')).not.toBeTruthy();
  });

  it('calls onChangeThemeMode and does not close modal', () => {
    mock_isIos.mockReturnValue(false);

    const mock_onChangeThemeMode = jest.fn();

    const { getByTestId } = render(
      <SettingsButton themeMode='dark' onChangeThemeMode={mock_onChangeThemeMode} />
    );

    const btn = getByTestId('SettingsButtonTid');
    act(() => {
      fireEvent.press(btn);
    });

    const filtersView = getByTestId('SettingsViewTid');
    act(() => {
      filtersView.props.onChangeThemeMode('light');
    });

    expect(mock_onChangeThemeMode).toHaveBeenCalledWith('light');

    getByTestId('SettingsViewTid');
  });
});
