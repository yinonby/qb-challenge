
import { render } from '@testing-library/react-native';
import { StyleSheet, Text } from 'react-native';
import * as RNP from 'react-native-paper';
import * as RnuiProvider from '../theme/RnuiProvider';
import { RnuiAppContent } from './RnuiAppContent';

// mocks

jest.mock('react-native-paper', () => ({
  ...jest.requireActual('react-native-paper'),
  useTheme: jest.fn(), // Make useTheme a mock function
}));

// tests

describe('RnuiAppContent', () => {
  const spy_useTheme = jest.spyOn(RNP, 'useTheme');
  const spy_useRnuiContext = jest.spyOn(RnuiProvider, 'useRnuiContext');

  beforeAll(() => {
    jest.clearAllMocks();

    spy_useTheme.mockReturnValue(undefined);
    spy_useRnuiContext.mockReturnValue({ rnuiStyles: {} });
  });

  it('renders the ScrollView wrapper', () => {
    const { getByTestId } = render(
      <RnuiAppContent>
        <Text>Child content</Text>
      </RnuiAppContent>
    );

    expect(getByTestId('ScrollViewTid')).toBeTruthy();
  });

  it('renders children inside the ScrollView', () => {
    const { getByText } = render(
      <RnuiAppContent>
        <Text>Child content</Text>
      </RnuiAppContent>
    );

    expect(getByText('Child content')).toBeTruthy();
  });

  it('applies theme styles', () => {
    // setup mocks
    spy_useTheme.mockReturnValue({
      colors: {
        background: 'black',
      }
    });

    // render
    const { getByTestId } = render(
      <RnuiAppContent>
        <Text>Child content</Text>
      </RnuiAppContent>
    );

    // verify backgroundColor applied
    const view = getByTestId('ScrollViewTid');
    const finalStyle = StyleSheet.flatten(view.props.style);
    expect(finalStyle.backgroundColor).toEqual('black');
  });

  it('applies rnuiStyles styles', () => {
    // setup mocks
    spy_useRnuiContext.mockReturnValue({ rnuiStyles: {
      content: {
        paddingHorizontal: 13,
        paddingVertical: 33,
      }
    } });

    // render
    const { getByTestId } = render(
      <RnuiAppContent>
        <Text>Child content</Text>
      </RnuiAppContent>
    );

    // verify backgroundColor applied
    const view = getByTestId('ScrollViewTid');
    const finalStyle = StyleSheet.flatten(view.props.style);
    expect(finalStyle.paddingHorizontal).toEqual(13);
    expect(finalStyle.paddingVertical).toEqual(33);
  });
});
