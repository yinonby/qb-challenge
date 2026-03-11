
import * as RnuiUtils from '@qb-rnui/utils/RnuiUtils';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import * as RnuiProvider from '../theme/RnuiProvider';
import { RnuiButton } from './RnuiButton';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Button: View,
  };
});

// tests

describe('RnuiButton', () => {
  const useRnuiContextSpy = jest.spyOn(RnuiProvider, 'useRnuiContext');
  const spy_isWeb = jest.spyOn(RnuiUtils, 'isWeb');

  beforeEach(() => {
    jest.clearAllMocks();

    spy_isWeb.mockReturnValue(false);
  });

  it('renders correctly with children', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton onPress={() => { }}>Click me</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.children).toBe('Click me');
  });

  it('applies default mode contained and uppercase false', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton onPress={() => { }}>Default Props</RnuiButton>
    );

    const button = getByTestId('btn-tid').parent; // TouchableOpacity
    expect(button.props.mode).toBe('contained');
    expect(button.props.uppercase).toBe(false);
  });

  it('accepts custom mode and uppercase props', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton mode='outlined' uppercase>
        Custom Props
      </RnuiButton>
    );

    const button = getByTestId('btn-tid').parent;
    expect(button.props.mode).toBe('outlined');
    expect(button.props.uppercase).toBe(true);
  });

  it('renders with size xs, without rnuiStyles override', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton size='xs'>XS Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeDefined();
    expect(button.props.labelStyle.margin).toBe(8);
    expect(button.props.labelStyle.fontSize).toBe(12);
    expect(button.props.labelStyle.lineHeight).toBe(16);

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBe(48);
  });

  it('renders with size xs, with rnuiStyles override, not in web', () => {
    const xsButtonLabelStyle = {
      margin: 18,
      fontSize: 112,
      lineHeight: 116
    };
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {
        xsButtonLabelStyle,
      }
    });
    spy_isWeb.mockReturnValue(false);

    const { getByTestId } = render(
      <RnuiButton size='xs'>XS Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeDefined();
    expect(button.props.labelStyle).toEqual({
      ...xsButtonLabelStyle,
    });

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBe(48);
  });

  it('renders with size xs, with rnuiStyles override, in web, with icon', () => {
    const xsButtonLabelStyle = {
      margin: 18,
      fontSize: 112,
      lineHeight: 116
    };
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {
        xsButtonLabelStyle,
      }
    });
    spy_isWeb.mockReturnValue(true);

    const { getByTestId } = render(
      <RnuiButton size='xs' icon='close'>XS Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeDefined();
    expect(button.props.labelStyle).toEqual({
      ...xsButtonLabelStyle,
      paddingHorizontal: 16,
    });

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBe(48);
  });

  it('renders with size xs, with rnuiStyles override, in web, without icon', () => {
    const xsButtonLabelStyle = {
      margin: 18,
      fontSize: 112,
      lineHeight: 116
    };
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {
        xsButtonLabelStyle,
      }
    });
    spy_isWeb.mockReturnValue(true);

    const { getByTestId } = render(
      <RnuiButton size='xs'>XS Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeDefined();
    expect(button.props.labelStyle).toEqual({
      ...xsButtonLabelStyle,
      paddingHorizontal: 8,
    });

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBe(48);
  });

  it('renders with size small', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton size='small'>Small Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeUndefined();

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBeUndefined();
  });

  it('renders with size medium', () => {
    useRnuiContextSpy.mockReturnValue({
      rnuiStyles: {}
    });

    const { getByTestId } = render(
      <RnuiButton size='medium'>Medium Button</RnuiButton>
    );

    const button = getByTestId('btn-tid');
    expect(button.props.labelStyle).toBeUndefined();

    const finalButtonStyle = StyleSheet.flatten(button.props.style);
    expect(finalButtonStyle.minWidth).toBeUndefined();
  });
});
