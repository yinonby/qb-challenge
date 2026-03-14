
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { productCategoryToTranslationKeyMap, type ProductDetailsT } from '@qb/models';
import { usePlatformUiDeviceLocale } from '@qb/platform-ui';
import { RnuiText, type TestableComponentT } from '@qb/rnui';
import { tsToLocalDateString } from '@qb/utils';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { ProductDetailsHeader } from './ProductDetailsHeader';
import { ProductImagesSummary } from './ProductImagesSummary';

type ProductDetailsViewPropsT = TestableComponentT & {
  productDetails: ProductDetailsT,
}

export const ProductDetailsView: FC<ProductDetailsViewPropsT> = (props) => {
  const { productDetails } = props;
  const genericStyles = useGenericStyles();
  const { t } = useAppLocalization();
  const categoryTranslationKey = productCategoryToTranslationKeyMap[productDetails.category];
  const { langTag, timeZone } = usePlatformUiDeviceLocale();

  return (
    <View>
      <ProductDetailsHeader testID='ProductDetailsHeaderTid' productDetails={productDetails} />

      <View style={[genericStyles.flexRow, genericStyles.justifyContentCenter]}>
        <View style={[genericStyles.spacingLg, { maxWidth: 700 }]}>
          <RnuiText variant='titleMedium'>{productDetails.name}</RnuiText>

          <ProductImagesSummary testID='ProductImagesSummaryTid' productDetails={productDetails}/>

          <View>
            <RnuiText variant='titleSmall'>{t('app:description')}</RnuiText>
            <RnuiText>{productDetails.description}</RnuiText>
          </View>

          <View>
            <RnuiText variant='titleSmall'>{t('app:fullDescription')}</RnuiText>
            <RnuiText>{productDetails.fullDescription}</RnuiText>
          </View>

          <View>
            <RnuiText variant='titleSmall'>{t('app:category')}</RnuiText>
            <RnuiText>{t(categoryTranslationKey)}</RnuiText>
          </View>

          <View>
            <RnuiText variant='titleSmall'>{t('app:price')}</RnuiText>
            <RnuiText>{productDetails.price.rate + ' ' + productDetails.price.currencyCode}</RnuiText>
          </View>

          <View>
            <RnuiText variant='titleSmall'>{t('app:popularity')}</RnuiText>
            <RnuiText>{productDetails.popularity}</RnuiText>
          </View>

          {productDetails.reviews &&
            <View>
              <RnuiText variant='titleSmall'>{t('app:rating')}</RnuiText>
              <View style={genericStyles.flexRow}>
                <RnuiText>{productDetails.reviews.rating}</RnuiText>
                <RnuiText>{`(${productDetails.reviews.count})`}</RnuiText>
              </View>
            </View>
          }

          {productDetails.specifications &&
            <View>
              <RnuiText variant='titleSmall'>{t('app:specifications')}</RnuiText>

              {Object.values(productDetails.specifications).map((e, index) =>
                <View key={index} style={genericStyles.flexRow}>
                  <RnuiText>{e.specificationText}:</RnuiText>
                  <RnuiText>{e.specificationValue}</RnuiText>
                </View>
              )}
            </View>
          }

          <View>
            <RnuiText variant='titleSmall'>{t('app:stockLevel')}</RnuiText>
            <RnuiText>{productDetails.stock}</RnuiText>
          </View>

          <View>
            <RnuiText variant='titleSmall'>{t('app:lastUpdateTime')}</RnuiText>
            <RnuiText>
              {tsToLocalDateString(productDetails.lastStockUpdateTs, langTag, timeZone )}
            </RnuiText>
          </View>
        </View>
      </View>
    </View>
  );
};
