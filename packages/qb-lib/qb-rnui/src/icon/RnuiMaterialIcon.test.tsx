
import { render } from '@testing-library/react-native';
import * as ReactNativepaper from 'react-native-paper';
import { RnuiMaterialIcon } from './RnuiMaterialIcon';

// mocks

jest.mock('react-native-paper', () => {
  return {
    useTheme: jest.fn(),
  };
});

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    MaterialIcons: View,
  }
});

// tests

describe('RnuiMaterialIcon', () => {
  const spy_useTheme = jest.spyOn(ReactNativepaper, 'useTheme');
  spy_useTheme.mockReturnValue({ colors: { surfaceVariant: 'red', onSurface: 'black' }});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children, without indicateDisabled', () => {
    const { getByTestId } = render(
      <RnuiMaterialIcon name='close' />
    );

    const icon = getByTestId('MaterialIconsTid');
    expect(icon.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'black' })])
    );
  });

  it('renders children, with indicateDisabled', () => {
    const { getByTestId } = render(
      <RnuiMaterialIcon name='close' indicateDisabled />
    );

    const icon = getByTestId('MaterialIconsTid');
    expect(icon.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red' })])
    );
  });
});
