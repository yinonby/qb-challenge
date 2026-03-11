
import * as RnuiProvider from '@qb-rnui/theme/RnuiProvider';
import { fireEvent, render } from '@testing-library/react-native';
import { View } from 'react-native';
import { RnuiModalContent } from './RnuiModalContent';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Surface: View,
  };
});

jest.mock('../icon/RnuiMaterialIcon', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    RnuiMaterialIcon: View,
  }
});

// tests

describe('RnuiModalContent', () => {
  const spy_useRnuiContext = jest.spyOn(RnuiProvider, 'useRnuiContext');

  beforeEach(() => {
    jest.clearAllMocks();

    spy_useRnuiContext.mockReturnValue({
      rnuiStyles: {
        content: { padding: 30 },
      },
    });
  });

  it('renders children', () => {
    const { getByTestId } = render(
      <RnuiModalContent>
        <View testID='ChildTid' />
      </RnuiModalContent>
    );

    getByTestId('ChildTid');
  });

  it('renders without rnuiStyles content padding', () => {
    // setup mocks
    spy_useRnuiContext.mockReturnValue({
      rnuiStyles: {},
    });

    const { getByTestId } = render(
      <RnuiModalContent>
        Content
      </RnuiModalContent>
    );

    const view = getByTestId('ScrollViewTid');
    expect(view.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingHorizontal: 24 })])
    );
  });

  it('renders with rnuiStyles content padding', () => {
    // setup mocks
    spy_useRnuiContext.mockReturnValue({
      rnuiStyles: {
        content: {
          padding: 13,
        }
      },
    });

    const { getByTestId } = render(
      <RnuiModalContent>
        Content
      </RnuiModalContent>
    );

    const view = getByTestId('ScrollViewTid');
    expect(view.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingHorizontal: 13 })])
    );
  });

  it('renders ScrollView when scrollable (default)', () => {
    const { getByTestId } = render(
      <RnuiModalContent>
        Content
      </RnuiModalContent>
    );

    getByTestId('ScrollViewTid');
  });

  it('does not render ScrollView when notScrollable is true', () => {
    const { queryByTestId } = render(
      <RnuiModalContent notScrollable>
        Content
      </RnuiModalContent>
    );

    expect(queryByTestId('ScrollViewTid')).toBeNull();
  });

  it('renders close button when includeCloseButton is true', () => {
    const { getByTestId } = render(
      <RnuiModalContent includeCloseButton>
        Content
      </RnuiModalContent>
    );

    getByTestId('PressableTid');
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();

    const { getByTestId } = render(
      <RnuiModalContent includeCloseButton onClose={onClose}>
        Content
      </RnuiModalContent>
    );

    const pressable = getByTestId('PressableTid');

    fireEvent.press(pressable);

    expect(onClose).toHaveBeenCalled();
  });
});
