
import { render } from '@testing-library/react-native';
import { RnuiSwitch } from './RnuiSwitch';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Switch: View,
  };
});

// tests

describe('RnuiSwitch', () => {
  it('renders correctly with default props', () => {
    const isSwitchOn = true;
    const mock_onToggleSwitch = jest.fn();
    const { getByTestId } = render(
      <RnuiSwitch isSwitchOn={isSwitchOn} onToggleSwitch={mock_onToggleSwitch} />
    );

    const _switch = getByTestId('SwitchTid');
    expect(_switch.props.value).toEqual(isSwitchOn);
    expect(_switch.props.onValueChange).toEqual(mock_onToggleSwitch);
  });
});
