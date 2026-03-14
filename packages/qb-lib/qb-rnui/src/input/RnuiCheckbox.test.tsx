
import { render } from '@testing-library/react-native';
import { RnuiCheckbox } from './RnuiCheckbox';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Checkbox: View,
  };
});

// tests

describe('RnuiCheckbox', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <RnuiCheckbox status={'checked'} />
    );

    const cut = getByTestId('CheckboxTid');
    expect(cut.props.status).toEqual('checked');
  });
});
