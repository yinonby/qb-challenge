
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { type AvailabilityOptionT } from '@qb/models';
import { RnuiTextInput, type TestableComponentT } from '@qb/rnui';
import { strToIntOrUndefined } from '@qb/utils';
import React, { type FC } from 'react';
import { View } from 'react-native';

type AvailabilityRangeSelectPropsT = TestableComponentT & {
  value: AvailabilityOptionT | undefined,
  onChange: (newValue: AvailabilityOptionT | undefined) => void,
}

export const AvailabilityRangeSelect: FC<AvailabilityRangeSelectPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();

  const handleMinStockChange = (newValue: string): void => {
    onChange({
      minStock: strToIntOrUndefined(newValue),
      maxStock: value?.maxStock,
    });
  }

  const handleMaxStockChange = (newValue: string): void => {
    onChange({
      minStock: value?.minStock,
      maxStock: strToIntOrUndefined(newValue),
    });
  }

  return (
    <View>
      <RnuiTextInput
        testID='MinStockInputTid'
        keyboardType='numeric'
        label={t('app:minStock')}
        value={value?.minStock === undefined ? '' : value.minStock.toString()}
        onChangeText={handleMinStockChange}
      />
      <RnuiTextInput
        testID='MaxStockInputTid'
        keyboardType='numeric'
        label={t('app:maxStock')}
        value={value?.maxStock === undefined ? '' : value.maxStock.toString()}
        onChangeText={handleMaxStockChange}
      />
    </View>
  );
};
