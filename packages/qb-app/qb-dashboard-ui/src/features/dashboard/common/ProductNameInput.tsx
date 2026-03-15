
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { RnuiTextInput, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import type { TextStyle } from 'react-native';

type ProductNameInputPropsT = TestableComponentT & {
  value: string | undefined,
  onChange: (newValue: string) => void,
}

export const ProductNameInput: FC<ProductNameInputPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();
  const labelHeightCompensation: TextStyle = {
    marginTop: -6.5,
  }

  const handleChange = (newValue: string): void => {
    onChange(newValue);
  }

  return (
    <RnuiTextInput
      testID='MinStockInputTid'
      size='xs'
      keyboardType='numeric'
      label={t('app:productName')}
      value={value === undefined ? '' : value}
      onChangeText={handleChange}
      style={labelHeightCompensation}
    />
  );
};
