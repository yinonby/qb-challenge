
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { AddToCartButton } from '@qb-dashboard-ui/features/cart/components/AddToCartButton';
import { OpenCartButton } from '@qb-dashboard-ui/features/cart/components/OpenCartButton';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { type ProductDetailsT } from '@qb/models';
import { PlatformUiLink } from '@qb/platform-ui';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { ShareButton } from '../../common/ShareButton';

type ProductDetailsHeaderPropsT = TestableComponentT & {
  productDetails: ProductDetailsT,
}

export const ProductDetailsHeader: FC<ProductDetailsHeaderPropsT> = (props) => {
  const { productDetails } = props;
  const genericStyles = useGenericStyles();
  const { dashboardRouterAdapter } = useDashboard();
  const shareLink = dashboardRouterAdapter.buildDashboardDetailsFullRoute(productDetails.productId);
  const allListingsUrl = dashboardRouterAdapter.buildDashboardListingRoute();

  return (
    <View style={[genericStyles.flexRow]}>
      <PlatformUiLink testID='PlatformUiLinkTid' href={allListingsUrl}>
        <RnuiIconButton icon='arrow-left' size='xs' style={{ marginStart: 0 }} />
      </PlatformUiLink>

      <View style={genericStyles.flex1} />

      <OpenCartButton testID='OpenCartButtonTid' />

      <AddToCartButton testID='AddToCartButtonTid' productDetails={productDetails} />

      <ShareButton testID='ShareButtonTid' shareStr={shareLink} style={{ marginEnd: 0 }} />
    </View>
  );
};
