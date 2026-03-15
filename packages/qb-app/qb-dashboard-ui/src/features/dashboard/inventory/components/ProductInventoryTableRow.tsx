
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { type ProductSummaryT } from '@qb/models';
import {
  RnuiCard, RnuiIconButton, RnuiImage,
  RnuiTableCell,
  RnuiTableRow,
  RnuiText, type TestableComponentT
} from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { useInventoryUpdate } from '../context/InventoryUpdateProvider';
import type { StockEditT } from '../reducer/InventoryUpdateSlice';
import { EditButton } from './EditButton';

type ProductInventoryTableRowPropsT = TestableComponentT & {
  productSummary: ProductSummaryT,
  imageSize?: number,
}

export const ProductInventoryTableRow: FC<ProductInventoryTableRowPropsT> = (props) => {
  const { productSummary, imageSize = 32 } = props;
  const genericStyles = useGenericStyles();
  const { isStockUpdated, addStockUpdate, removeStockUpdate, getStockUpdate } = useInventoryUpdate();
  const isChanged = isStockUpdated(productSummary.productId);
  const stockEdit: StockEditT | null = getStockUpdate(productSummary.productId);

  const handleEdit = (newStock: number, reason: string): void => {
    addStockUpdate({
      productId: productSummary.productId,
      newStock,
      reason,
      originalStock: productSummary.stock,
    });
  }

  const handleRevert = (): void => {
    removeStockUpdate(productSummary.productId);
  }

  return (
    <RnuiTableRow noHorizontalPadding>
      <RnuiTableCell>
        <View style={[genericStyles.flexRow, genericStyles.flex1]}>
          <View style={{ width: imageSize }}>
            <RnuiCard noPadding borderRadius={4}>
              <RnuiImage imageSource={productSummary.imageUrl} height={imageSize}></RnuiImage>
            </RnuiCard>
          </View>
          <RnuiText>{productSummary.name}</RnuiText>
        </View>
      </RnuiTableCell>

      <RnuiTableCell endContent>
        <View style={genericStyles.flexRow}>
          {!stockEdit ?
            <RnuiText>{productSummary.stock}</RnuiText> :
            <RnuiText style={{ color: 'red', fontWeight: 'bold' }}>{stockEdit.newStock}</RnuiText>
          }

          {!isChanged ?
            <EditButton
              testID='EditButtonTid'
              productName={productSummary.name}
              curStock={productSummary.stock}
              onEdit={handleEdit}
            /> :
            <RnuiIconButton
              testID='CancelButtonTid'
              icon='trash-can'
              size='xs'
              onPress={() => handleRevert()}
            />
          }
        </View>
      </RnuiTableCell>
    </RnuiTableRow>
  );
};
