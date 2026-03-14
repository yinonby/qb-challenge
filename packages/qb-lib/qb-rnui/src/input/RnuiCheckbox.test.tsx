
import * as RnuiUtils from '@qb-rnui/utils/RnuiUtils';
import { render } from '@testing-library/react-native';
import { RnuiCheckbox } from './RnuiCheckbox';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Checkbox: View,
    useTheme: jest.fn().mockReturnValue({ colors: { outline: 'black' }}),
  };
});

// tests

describe('RnuiCheckbox', () => {
  const spy_isIos = jest.spyOn(RnuiUtils, 'isIos');

  it('renders correctly with default props, non ios', () => {
    // setup mocks
    spy_isIos.mockReturnValue(false);

    // render
    const { getByTestId } = render(
      <RnuiCheckbox status={'checked'} />
    );

    // verify
    const cut = getByTestId('CheckboxTid');
    expect(cut.props.status).toEqual('checked');
  });


  it('renders correctly with default props, ios', () => {
    // setup mocks
    spy_isIos.mockReturnValue(true);

    // render
    const { getByTestId } = render(
      <RnuiCheckbox status={'checked'} />
    );

    // verify
    const cut = getByTestId('IosCheckboxTid');
    expect(cut.props.status).toEqual('checked');
  });
});
