
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import type { ProductIdT } from '@qb/models';
import { RnuiAppContent, RnuiText } from '@qb/rnui';
import React, { type FC } from 'react';

type ProductDetailsPageContentPropsT = {
  productId: ProductIdT,
}

export const ProductDetailsPageContent: FC<ProductDetailsPageContentPropsT> = () => {
  const { t } = useAppLocalization();

  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      <RnuiText testID='TextTitleTid' variant='titleMedium'>{t('app:productDetails')}</RnuiText>
    </RnuiAppContent>
  );
};
