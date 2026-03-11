
import { useRnuiDimensions } from '@qb-rnui/theme/RnuiDimensionsProvider';
import type { TestableComponentT } from '@qb-rnui/types/ComponentTypes';
import { isWeb } from '@qb-rnui/utils/RnuiUtils';
import { ReactNode, type PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { RnuiModalContent } from './RnuiModalContent';

type RnuiModalPropsT = TestableComponentT & {
  placement?: 'top' | 'center' | 'bottom',
  includeCloseButton?: boolean,
  onDismiss?: () => void,
  onClose?: () => void,
  notScrollable?: boolean,
  fullScreenMarginTop?: number,
  minWideWebWidth?: number,
}

export function RnuiModal(props: PropsWithChildren<RnuiModalPropsT>): ReactNode {
  // props
  const {
    placement,
    includeCloseButton,
    onDismiss,
    onClose,
    notScrollable,
    fullScreenMarginTop,
    minWideWebWidth = 768,
    children
  } = props;

  // hooks
  const { width } = useRnuiDimensions()

  // variables
  const isWideWeb = isWeb() && width > minWideWebWidth;
  const isFullScreen = !isWideWeb;
  const marginTop: number | undefined = isFullScreen ? fullScreenMarginTop : 0;
  const webPaddingHorizontal = 32;
  const paddingHorizontal = isFullScreen ? 0 : webPaddingHorizontal;
  const paddingVertical = isFullScreen ? 0 : 32;
  const justifyContent = placement === 'top' ? 'flex-start' : (placement === 'bottom' ? 'flex-end' : 'center');

  const modalStyle: ViewStyle = {
    marginTop: marginTop,
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical,
    justifyContent: justifyContent,
    cursor: 'auto',
  }

  return (
    <View >
      <Portal>
        <Modal
          testID='ModalTid'
          visible
          style={modalStyle}
          contentContainerStyle={{ height: isFullScreen ? '100%' : undefined }}
          onDismiss={onDismiss}
        >
          <RnuiModalContent
            includeCloseButton={includeCloseButton}
            onClose={onClose}
            notScrollable={notScrollable}
          >
            {children}
          </RnuiModalContent>
        </Modal>
      </Portal>
    </View>
  );
};
