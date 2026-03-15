
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { type ProductDetailsT } from '@qb/models';
import { PlatformUiLink } from '@qb/platform-ui';
import {
  RnuiCard, RnuiGrid, RnuiGridItem,
  RnuiIconButton, RnuiImage, RnuiText, type TestableComponentT
} from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';

type ProductImagesViewPropsT = TestableComponentT & {
  productDetails: ProductDetailsT,
  imgHeight?: number,
}

export const ProductImagesView: FC<ProductImagesViewPropsT> = (props) => {
  const { productDetails, imgHeight = 300 } = props;
  const genericStyles = useGenericStyles();
  const { dashboardRouterAdapter } = useDashboard();

  return (
    <View>
      <View style={[genericStyles.flexRow]}>
        <View style={{ marginStart: -6 }}>
          <PlatformUiLink
            testID='BackLink'
            href={dashboardRouterAdapter.buildDashboardDetailsRoute(productDetails.productId)}
          >
            <RnuiIconButton icon='arrow-left' size='xs' />
          </PlatformUiLink>
        </View>
      </View>

      <View style={[genericStyles.spacingLg]}>
        <RnuiText variant='titleMedium'>{productDetails.name}</RnuiText>

        <RnuiGrid>
          {productDetails.imageUrls.map((e, index) =>
            <RnuiGridItem key={index} xs={12} sm={12} md={6} lg={4} xl={4} >
              <RnuiCard noPadding>
                <RnuiImage testID='RnuiImage' imageSource={e} height={imgHeight} />
              </RnuiCard>
            </RnuiGridItem>
          )}
        </RnuiGrid>
      </View>
    </View>
  );
};
