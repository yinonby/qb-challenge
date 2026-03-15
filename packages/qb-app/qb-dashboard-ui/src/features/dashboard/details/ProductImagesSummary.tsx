
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import type { ProductDetailsPageSearchParamsT } from '@qb-dashboard-ui/types/UrlDefs';
import { type ProductDetailsT } from '@qb/models';
import { useSetSearchParams } from '@qb/platform-ui';
import { RnuiButton, RnuiCard, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AirbnbImageGrid } from '../../common/AirbnbImageGrid';

type ProductImagesSummaryPropsT = TestableComponentT & {
  productDetails: ProductDetailsT,
}

export const ProductImagesSummary: FC<ProductImagesSummaryPropsT> = (props) => {
  const { productDetails } = props;
  const { t } = useAppLocalization();
  const { setParams } = useSetSearchParams<ProductDetailsPageSearchParamsT>();

  const handlePress = (): void => {
    setParams({
      imgView: 'true',
    })
  };

  return (
    <Pressable onPress={handlePress}>
      <RnuiCard testID='RnuiCardTid' noPadding>
        <View style={styles.container}>
          <AirbnbImageGrid testID='AirbnbImageGridTid' images={productDetails.imageUrls} borderRadius={12} />

          <View style={styles.button}>
            <RnuiButton size='xs' onPress={handlePress}>{t('app:showAllPhotos')}</RnuiButton>
          </View>
        </View>
      </RnuiCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  button: {
    position: 'absolute', top: 8, end: 8
  },
});
