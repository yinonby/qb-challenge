
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { RnuiIconButton, RnuiModal, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { EditView } from './EditView';

type EditButtonPropsT = TestableComponentT & {
  productName: string,
  curStock: number,
  onApply?: (newStock: number, reason: string) => void,
  onAddToBatch?: (newStock: number, reason: string) => void,
}

export const EditButton: FC<EditButtonPropsT> = (props) => {
  const { productName, curStock, onApply, onAddToBatch } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { appHeaderHeight } = useDashboard();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleApply = (newStock: number, reason: string): void => {
    if (onApply) {
      onApply(newStock, reason);
    }
    handleClose();
  }

  const handleAddToBatch = (newStock: number, reason: string): void => {
    if (onAddToBatch) {
      onAddToBatch(newStock, reason);
    }
    handleClose();
  }

  return (
    <View>
      <RnuiIconButton
        testID='EditButtonTid'
        size='xs'
        onPress={handleOpen}
        icon='pencil'
      />

      {isOpen &&
        <RnuiModal
          testID='RnuiModalTid'
          placement={"center"}
          includeCloseButton
          onDismiss={handleClose}
          onClose={handleClose}
          fullScreenMarginTop={appHeaderHeight}
          notScrollable
        >
          <EditView
            testID='EditViewTid'
            productName={productName}
            curStock={curStock}
            onApply={handleApply}
            onAddToBatch={handleAddToBatch}
          />
        </RnuiModal>
      }
    </View>
  );
};
