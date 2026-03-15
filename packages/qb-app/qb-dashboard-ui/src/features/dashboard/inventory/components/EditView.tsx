
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { RnuiButton, RnuiText, RnuiTextInput, type TestableComponentT } from '@qb/rnui';
import { default as React, useState, type FC } from 'react';
import { View } from 'react-native';

type EditViewPropsT = TestableComponentT & {
  productName: string,
  curStock: number,
  onEdit: (newStock: number, reason: string) => void,
}

export const EditView: FC<EditViewPropsT> = (props) => {
  const { productName, curStock, onEdit } = props;
  const { t } = useAppLocalization();
  const genericStyles = useGenericStyles();
  const [newStock, setNewStock] = useState<number | null>(null);
  const [reason, setReason] = useState('');

  const handleNewStockChange = (value: string): void => {
    if (value === '') {
      setNewStock(null);
    } else {
      const _newStock = parseInt(value);
      if (isNaN(_newStock)) {
        setNewStock(null);
      } else {
        setNewStock(_newStock);
      }
    }
  }

  const handleReasonChange = (value: string): void => {
    setReason(value);
  }

  const isValid = (): boolean => {
    return newStock !== null && reason !== '';
  }

  const handleApply = (): void => {
    if (newStock !== null) {
      onEdit(newStock, reason);
    }
  }

  return (
    <View style={[genericStyles.spacing, genericStyles.flex1]}>
      <View style={[genericStyles.spacing]}>
        <RnuiText variant='titleMedium'>{productName}</RnuiText>

        <View style={genericStyles.flexRow}>
          <RnuiText variant='titleSmall'>{t('app:stockLevel')}</RnuiText>
          <RnuiText variant='titleSmall'>{curStock}</RnuiText>
        </View>

        <RnuiTextInput
          testID='NewStockTextInputTid'
          value={newStock === null ? '' : newStock.toString()}
          label={t('app:newStockLevel')}
          onChangeText={handleNewStockChange}
        />

        <RnuiTextInput
          testID='ReasonTextInputTid'
          keyboardType='numeric'
          label={t('app:reason')}
          onChangeText={handleReasonChange}
        />
      </View>

      <View style={genericStyles.flex1} />

      <View style={genericStyles.flexRowReverse}>
        <RnuiButton testID='ApplyButtonTid'
          size='xs'
          disabled={!isValid()}
          onPress={handleApply}
        >
          {t('app:apply')}
        </RnuiButton>
      </View>
    </View>
  );
};
