
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { RnuiAppContent, RnuiText } from '@qb/rnui';
import React, { type FC } from 'react';

export const ProductInventoryPageContent: FC = () => {
  const { t } = useAppLocalization();

  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      <RnuiText testID='TextTitleTid' variant='titleMedium'>{t('app:inventoryManagement')}</RnuiText>
    </RnuiAppContent>
  );
};
