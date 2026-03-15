
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { RnuiIconButton, RnuiModal, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { EditView } from './EditView';

type EditButtonPropsT = TestableComponentT & {
  productName: string,
  curStock: number,
  onEdit: (newStock: number, reason: string) => void,
}

export const EditButton: FC<EditButtonPropsT> = (props) => {
  const { productName, curStock, onEdit } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { appHeaderHeight } = useDashboard();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleEdit = (newStock: number, reason: string): void => {
    onEdit(newStock, reason);
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
            onEdit={handleEdit}
          />
        </RnuiModal>
      }
    </View>
  );
};
