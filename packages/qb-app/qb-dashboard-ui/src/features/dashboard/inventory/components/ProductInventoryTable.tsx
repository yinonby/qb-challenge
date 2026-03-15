
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { type ProductSummaryT } from '@qb/models';
import {
  RnuiTable,
  RnuiTableHeader,
  RnuiTableTitle, RnuiText, type TestableComponentT
} from '@qb/rnui';
import React, { type FC } from 'react';
import { ProductInventoryTableRow } from './ProductInventoryTableRow';

type ProductInventoryTablePropsT = TestableComponentT & {
  productSummaries: ProductSummaryT[],
  imageSize?: number,
}

export const ProductInventoryTable: FC<ProductInventoryTablePropsT> = (props) => {
  const { productSummaries, imageSize = 32 } = props;
  const { t } = useAppLocalization();

  return (
    <RnuiTable>
      <RnuiTableHeader noHorizontalPadding>
        <RnuiTableTitle>
          <RnuiText>{t('app:productName')}</RnuiText>
        </RnuiTableTitle>

        <RnuiTableTitle endContent>
          <RnuiText>{t('app:stockLevel')}</RnuiText>
        </RnuiTableTitle>
      </RnuiTableHeader>

      {productSummaries.map((e, index) =>
        <ProductInventoryTableRow
          testID='ProductInventoryTableRowTid'
          key={index}
          productSummary={e}
          imageSize={imageSize}
        />
      )}
    </RnuiTable>
  );
};
