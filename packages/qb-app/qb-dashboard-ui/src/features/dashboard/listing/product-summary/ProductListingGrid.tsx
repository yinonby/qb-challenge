
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import type { ProductSummaryT } from '@qb/models';
import { PlatformUiLink } from '@qb/platform-ui';
import { RnuiGrid, RnuiGridItem, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { ProductSummaryView } from './ProductSummaryView';

type ProductListingGridPropsT = TestableComponentT & {
  productSummaries: ProductSummaryT[],
}

export const ProductListingGrid: FC<ProductListingGridPropsT> = (props) => {
  const { productSummaries } = props;
  const { dashboardRouterAdapter } = useDashboard();

  return (
    <RnuiGrid >
      {productSummaries.map((e, index) =>
        <RnuiGridItem key={index} xs={12} sm={12} md={6} lg={4} xl={3} >
          <PlatformUiLink href={dashboardRouterAdapter.buildDashboardDetailsRoute(e.productId)} asChild addPressable>
            <ProductSummaryView testID='ProductSummaryViewTid' productSummary={e} />
          </PlatformUiLink>
        </RnuiGridItem>
      )}
    </RnuiGrid>
  );
};
