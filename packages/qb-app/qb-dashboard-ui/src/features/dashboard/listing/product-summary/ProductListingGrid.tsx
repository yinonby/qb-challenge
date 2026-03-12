
import type { ProductSummaryT } from '@qb/models';
import { RnuiGrid, RnuiGridItem, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { ProductSummaryView } from './ProductSummaryView';

type ProductListingGridPropsT = TestableComponentT & {
  productSummaries: ProductSummaryT[],
}

export const ProductListingGrid: FC<ProductListingGridPropsT> = (props) => {
  const { productSummaries } = props;

  return (
    <RnuiGrid >
      {productSummaries.map((e, index) =>
        <RnuiGridItem key={index} xs={12} sm={12} md={6} lg={4} xl={3} >
          <ProductSummaryView testID='ProductSummaryViewTid' productSummary={e} />
        </RnuiGridItem>
      )}
    </RnuiGrid>
  );
};
