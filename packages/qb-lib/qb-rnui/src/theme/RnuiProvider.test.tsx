
import { render } from '@testing-library/react-native';
import type { FC } from 'react';
import { Text } from 'react-native';
import { RnuiProvider, useRnuiContext, type RnuiContextT, type RnuiStylesT } from './RnuiProvider';

// Mock react-native-paper Button
jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  // Outer dumb component holds all props
  const RnpPaperProviderMock: FC<{children: React.ReactNode }> = ({ children, ...props }) => {
    return (
      <View {...props} testID="theme-provider-test-id">{children}</View>
    );
  };

  return {
    PaperProvider: (props: { children: React.ReactNode }) => <RnpPaperProviderMock {...props} />,
  };
});

describe('RnuiProvider', () => {
  it('renders correctly with children', () => {
    const { getByTestId } = render(
      <RnuiProvider>
        <Text testID="text-test-id">{"Hello"}</Text>
      </RnuiProvider>
    );

    const PaperProvider = getByTestId('theme-provider-test-id');
    expect(PaperProvider).not.toBeNull();
    const text = getByTestId('text-test-id');
    expect(text.props.children).toBe('Hello');
  });

  it('useRnuiContext returns the exact config object', () => {
    const rnuiStylesMock: RnuiStylesT = { xsButtonLabelStyle: { color: "red" } };
    let contextValue: RnuiContextT | undefined;

    const TestConsumer: React.FC = () => {
      contextValue = useRnuiContext();
      return null;
    };

    render(
      <RnuiProvider rnuiStyles={rnuiStylesMock}>
        <TestConsumer />
      </RnuiProvider>
    );

    expect(contextValue).toEqual({ rnuiStyles: rnuiStylesMock });
  });
});
