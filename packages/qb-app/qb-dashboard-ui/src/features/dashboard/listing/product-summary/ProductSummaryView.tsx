
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { productCategoryToTranslationKeyMap, type ProductSummaryT } from '@qb/models';
import { RnuiCard, RnuiTable, RnuiTableCell, RnuiTableRow, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';

type ProductSummaryViewPropsT = TestableComponentT & {
  productSummary: ProductSummaryT,
}

export const ProductSummaryView: FC<ProductSummaryViewPropsT> = (props) => {
  const { productSummary } = props;
  const genericStyles = useGenericStyles();
  const { t } = useAppLocalization();
  const categoryTranslationKey = productCategoryToTranslationKeyMap[productSummary.category];

  return (
    <RnuiCard
      testID='RnuiCardTid'
      imageProps={{
        imageSource: productSummary.imageUrl,
        height: 200,
        imgLabelProps: {
          text: t(categoryTranslationKey),
        },
        imgLabelPosition: 'top-start',
      }}
    >
      <RnuiTable style={genericStyles.spacing} >
        <RnuiTableRow noHorizontalPadding dense>
          <RnuiTableCell>
            <RnuiText variant='titleSmall'>{t('app:productName')}</RnuiText>
          </RnuiTableCell>
          <RnuiTableCell style={[genericStyles.flex2]}>
            <RnuiText variant='titleSmall'>{productSummary.name}</RnuiText>
          </RnuiTableCell>
        </RnuiTableRow>

        <RnuiTableRow noHorizontalPadding dense>
          <RnuiTableCell>
            <RnuiText variant='titleSmall'>{t('app:description')}</RnuiText>
          </RnuiTableCell>
          <RnuiTableCell style={[genericStyles.flex2]}>
            <RnuiText>{productSummary.description}</RnuiText>
          </RnuiTableCell>
        </RnuiTableRow>

        <RnuiTableRow noHorizontalPadding dense>
          <RnuiTableCell>
            <RnuiText variant='titleSmall'>{t('app:price')}</RnuiText>
          </RnuiTableCell>
          <RnuiTableCell style={[genericStyles.flex2]}>
            <RnuiText>{productSummary.price.rate + ' ' + productSummary.price.currencyCode}</RnuiText>
          </RnuiTableCell>
        </RnuiTableRow>

        <RnuiTableRow noHorizontalPadding dense>
          <RnuiTableCell>
            <RnuiText variant='titleSmall'>{t('app:popularity')}</RnuiText>
          </RnuiTableCell>
          <RnuiTableCell style={[genericStyles.flex2]}>
            <RnuiText>{productSummary.popularity}</RnuiText>
          </RnuiTableCell>
        </RnuiTableRow>

        <RnuiTableRow noHorizontalPadding dense>
          <RnuiTableCell>
            <RnuiText variant='titleSmall'>{t('app:stockLevel')}</RnuiText>
          </RnuiTableCell>
          <RnuiTableCell style={[genericStyles.flex2]}>
            <RnuiText>{productSummary.stock}</RnuiText>
          </RnuiTableCell>
        </RnuiTableRow>
      </RnuiTable>
    </RnuiCard>
  );
};
