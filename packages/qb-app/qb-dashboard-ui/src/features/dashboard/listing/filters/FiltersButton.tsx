
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { RnuiButton, RnuiIconButton, RnuiModal, useRnuiDimensions, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { FiltersView } from './FiltersView';

export const FiltersButton: FC<TestableComponentT> = () => {
  const { t } = useAppLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const { appHeaderHeight } = useDashboard();
  const { isXsScreen } = useRnuiDimensions();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleApply = (): void => {
    handleClose();
  }

  return (
    <View>
      {isXsScreen ?
        <RnuiIconButton
          testID='IosFilterButtonTid'
          size='xs'
          onPress={handleOpen}
          icon='filter-variant'
        /> :
        <RnuiButton
          testID='FilterButtonTid'
          size='xs'
          onPress={handleOpen}
          icon='filter-variant'
        >
          {t('app:filterAndSort')}
        </RnuiButton>
      }
      {isOpen &&
        <RnuiModal
          placement={"center"}
          includeCloseButton
          onDismiss={handleClose}
          onClose={handleClose}
          fullScreenMarginTop={appHeaderHeight}
          notScrollable
        >
          <FiltersView testID='FiltersViewTid' onApply={handleApply} />
        </RnuiModal>
      }
    </View>
  );
};
