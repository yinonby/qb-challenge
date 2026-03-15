
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import type { AvailabilityOptionT, ProductCategoryT, SortT } from '@qb/models';
import { isIos } from '@qb/platform-ui';
import { RnuiButton, RnuiIconButton, RnuiModal, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { FiltersView } from './FiltersView';

type FiltersButtonPropsT = TestableComponentT & {
  onApply: (
    category: ProductCategoryT | undefined,
    availability: AvailabilityOptionT | undefined,
    sort: SortT | undefined,
  ) => void,
}

export const FiltersButton: FC<FiltersButtonPropsT> = (props) => {
  const { onApply } = props;
  const { t } = useAppLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const { appHeaderHeight } = useDashboard();
  const iconButtonStyle = {
    marginStart: isIos() ? -2 : 0, // fix icon margin on ios
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleApply = (
    category: ProductCategoryT | undefined,
    availability: AvailabilityOptionT | undefined,
    sort: SortT | undefined,
  ): void => {
    onApply(category, availability, sort);
    handleClose();
  }

  return (
    <View>
      {isIos() ?
        <RnuiIconButton
          testID='IosFilterButtonTid'
          size='xs'
          onPress={handleOpen}
          icon='filter-variant'
          style={iconButtonStyle}
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
