
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { type ProductSummaryT } from '@qb/models';
import { RnuiCheckbox, RnuiTable, RnuiTableCell, RnuiTableHeader, RnuiTableRow, RnuiTableTitle, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';

type ProductInventoryTablePropsT = TestableComponentT & {
  productSummaries: ProductSummaryT[],
}

export const ProductInventoryTable: FC<ProductInventoryTablePropsT> = (props) => {
  const { productSummaries } = props;
  const { t } = useAppLocalization();
  const [isCheckedItems, setIsCheckedItems] = useState(productSummaries.map(() => false));
  const genericStyles = useGenericStyles();

  const handleCheckboxPressForItem = (productSummaryIndex: number): void => {
    setIsCheckedItems(prev => prev.map((e, index) => index === productSummaryIndex ? !e : e));
  }

  const handleCheckboxPressForAll = (): void => {
    if (areAllChecked()) {
      setIsCheckedItems(prev => prev.map(() => false));
    } else {
      setIsCheckedItems(prev => prev.map(() => true));
    }
  }

  const areAllChecked = (): boolean => {
    return !isCheckedItems.some(e => e === false);
  }

  const isAnyChecked = (): boolean => {
    return isCheckedItems.some(e => e === true);
  }

  return (
    <View>
      <View style={genericStyles.flexRowReverse}>
        <RnuiCheckbox
          testID='AllItemsCheckbox'
          status={areAllChecked() ? 'checked' : isAnyChecked() ? 'indeterminate' : 'unchecked'}
          onPress={handleCheckboxPressForAll}
        />
      </View>

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
          <RnuiTableRow key={index} noHorizontalPadding>
            <RnuiTableCell>
              <RnuiText>{e.name}</RnuiText>
            </RnuiTableCell>

            <RnuiTableCell endContent>
              <View style={genericStyles.flexRow}>
                <RnuiText>{e.stock}</RnuiText>
                <RnuiCheckbox
                  testID='ItemCheckbox'
                  status={isCheckedItems[index] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxPressForItem(index)}
                />
              </View>
            </RnuiTableCell>
          </RnuiTableRow>
        )}
      </RnuiTable>
    </View>
  );
};
