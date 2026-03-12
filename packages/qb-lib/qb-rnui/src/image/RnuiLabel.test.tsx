
import type { RnuiLabelPropsT } from '@qb-rnui/types/ComponentTypes';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import * as ReactNativepaper from 'react-native-paper';
import * as RnuiProvider from '../theme/RnuiProvider';
import { RnuiLabel } from './RnuiLabel';

// mocks

jest.mock('react-native-paper', () => {
  return {
    useTheme: jest.fn(),
  };
});


jest.mock('../text/RnuiText', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    RnuiText: View,
  }
});

// tests

describe('RnuiLabel', () => {
  const useRnuiContextSpy = jest.spyOn(RnuiProvider, 'useRnuiContext');
  const spy_useTheme = jest.spyOn(ReactNativepaper, 'useTheme');
  const backgroundColor = 'black';
  const textColor = 'white';
  spy_useTheme.mockReturnValue({ colors: { primary: backgroundColor, onPrimary: textColor }});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with defaults', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const labelProps: RnuiLabelPropsT = {
      text: 'Sample Label',
    }
    const { getByTestId } = render(<RnuiLabel {...labelProps} />);

    const container = getByTestId('container-tid');
    expect(container).toBeTruthy();

    const containerFinalStyle = StyleSheet.flatten(container.props.style);
    expect(containerFinalStyle.backgroundColor).toBe(backgroundColor);
    expect(containerFinalStyle.borderRadius).toBe(8);
    expect(containerFinalStyle.paddingHorizontal).toBe(8);
    expect(containerFinalStyle.paddingVertical).toBe(4);

    const labelText = getByTestId('label-text-tid');
    expect(labelText).toBeTruthy();

    const labelFinalStyle = StyleSheet.flatten(labelText.props.style);
    expect(labelFinalStyle.color).toBe(textColor);

    expect(labelText.props.children).toBe('Sample Label');
  });

  it('renders correctly with rnuiStyle props', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {
        imageLabel: {
          textColor: "red",
          backgroundColor: "green",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }
      }
    });

    const labelProps: RnuiLabelPropsT = {
      text: 'Sample Label',
    }
    const { getByTestId } = render(<RnuiLabel {...labelProps} />);

    const container = getByTestId('container-tid');
    expect(container).toBeTruthy();

    const containerFinalStyle = StyleSheet.flatten(container.props.style);
    expect(containerFinalStyle.backgroundColor).toBe("green");
    expect(containerFinalStyle.borderRadius).toBe(10);
    expect(containerFinalStyle.paddingHorizontal).toBe(10);
    expect(containerFinalStyle.paddingVertical).toBe(5);

    const labelText = getByTestId('label-text-tid');
    expect(labelText).toBeTruthy();

    const labelFinalStyle = StyleSheet.flatten(labelText.props.style);
    expect(labelFinalStyle.color).toBe("red");

    expect(labelText.props.children).toBe('Sample Label');
  });

  it('renders correctly with component props overriding rnuiStyle', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {
        imageLabel: {
          textColor: "red",
          backgroundColor: "green",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }
      }
    });

    const labelProps: RnuiLabelPropsT = {
      text: 'Sample Label',
      textColor: "blue",
      backgroundColor: "yellow",
    }
    const { getByTestId } = render(<RnuiLabel {...labelProps} />);

    const container = getByTestId('container-tid');
    expect(container).toBeTruthy();

    const containerFinalStyle = StyleSheet.flatten(container.props.style);
    expect(containerFinalStyle.backgroundColor).toBe("yellow");

    const labelText = getByTestId('label-text-tid');
    expect(labelText).toBeTruthy();

    const labelFinalStyle = StyleSheet.flatten(labelText.props.style);
    expect(labelFinalStyle.color).toBe("blue");

    expect(labelText.props.children).toBe('Sample Label');
  });
});
