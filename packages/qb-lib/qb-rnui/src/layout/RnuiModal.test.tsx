
import type { RnuiDimensionsT } from '@qb-rnui/theme/RnuiDimensionsProvider';
import * as RnuiDimensionsProvider from '@qb-rnui/theme/RnuiDimensionsProvider';
import * as RnuiUtils from '@qb-rnui/utils/RnuiUtils';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { RnuiModal } from './RnuiModal';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    Modal: View,
    Portal: View,
  };
});

jest.mock('./RnuiModalContent', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    RnuiModalContent: View,
  }
});

// tests

describe('RnuiModal', () => {
  const spy_useRnuiDimensions = jest.spyOn(RnuiDimensionsProvider, 'useRnuiDimensions');
  const spy_isWeb = jest.spyOn(RnuiUtils, 'isWeb');

  beforeEach(() => {
    jest.clearAllMocks();

    spy_useRnuiDimensions.mockReturnValue({ width: 400 } as RnuiDimensionsT);
    spy_isWeb.mockReturnValue(false);
  });

  it('renders children', () => {
    const { getByTestId } = render(
      <RnuiModal>
        <View testID='ChildTid' />
      </RnuiModal>
    );

    getByTestId('ChildTid');
  });

  it('sets placement top correctly', () => {
    const { getByTestId } = render(
      <RnuiModal placement="top">
        Child
      </RnuiModal>
    );

    const modal = getByTestId('ModalTid');

    expect(modal.props.style.justifyContent).toBe('flex-start');
  });

  it('sets placement bottom correctly', () => {
    const { getByTestId } = render(
      <RnuiModal placement="bottom">
        Child
      </RnuiModal>
    );

    const modal = getByTestId('ModalTid');

    expect(modal.props.style.justifyContent).toBe('flex-end');
  });

  it('uses fullscreen mode when not wide web', () => {
    const { getByTestId } = render(
      <RnuiModal fullScreenMarginTop={20}>
        Child
      </RnuiModal>
    );

    const modal = getByTestId('ModalTid');

    expect(modal.props.style.marginTop).toBe(20);
  });

  it('uses wide web layout when width is above threshold', () => {
    spy_isWeb.mockReturnValue(true);
    spy_useRnuiDimensions.mockReturnValue({ isMdScreen: true } as RnuiDimensionsT);

    const { getByTestId } = render(
      <RnuiModal>
        Child
      </RnuiModal>
    );

    const modal = getByTestId('ModalTid');

    expect(modal.props.style.paddingHorizontal).toBe(32);
  });

  it('calls onDismiss handler', () => {
    const onDismiss = jest.fn();

    const { getByTestId } = render(
      <RnuiModal onDismiss={onDismiss}>
        Child
      </RnuiModal>
    );

    const modal = getByTestId('ModalTid');

    modal.props.onDismiss();

    expect(onDismiss).toHaveBeenCalled();
  });
});
