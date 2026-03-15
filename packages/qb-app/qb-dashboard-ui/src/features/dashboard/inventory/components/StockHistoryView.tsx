
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import type { ProductStockHistoryItemT } from '@qb/models';
import { usePlatformUiDeviceLocale } from '@qb/platform-ui';
import { RnuiText, type TestableComponentT } from '@qb/rnui';
import { tsToLocalDateString } from '@qb/utils';
import { default as React, type FC } from 'react';
import { View } from 'react-native';

type StockHistoryViewPropsT = TestableComponentT & {
  productStockHistoryItems: ProductStockHistoryItemT[],
}

export const StockHistoryView: FC<StockHistoryViewPropsT> = (props) => {
  const { productStockHistoryItems } = props;
  const { t } = useAppLocalization();
  const genericStyles = useGenericStyles();
  const { langTag, timeZone } = usePlatformUiDeviceLocale();
  const productStockHistoryItemsSortedByChangeTs =
    [...productStockHistoryItems].sort((e1, e2) => e2.changeTs - e1.changeTs);

  if (productStockHistoryItemsSortedByChangeTs.length === 0) {
    return null;
  }

  return (
    <View style={[genericStyles.spacingLg]}>
      {productStockHistoryItemsSortedByChangeTs.map((e, index) =>
        <View key={index}>
          <View style={[genericStyles.flexRow, genericStyles.justifyContentSpaceBetween]}>
            <RnuiText variant='titleSmall'>{t('app:changedOn')}</RnuiText>
            <RnuiText variant='titleSmall'>{tsToLocalDateString(e.changeTs, langTag, timeZone)}</RnuiText>
          </View>

          <View style={[genericStyles.flexRow, genericStyles.justifyContentSpaceBetween]}>
            <RnuiText>{t('app:prevStockLevel')}</RnuiText>
            <RnuiText>{e.previousStock}</RnuiText>
          </View>

          <View style={[genericStyles.flexRow, genericStyles.justifyContentSpaceBetween]}>
            <RnuiText>{t('app:newStockLevel')}</RnuiText>
            <RnuiText>{e.newStock}</RnuiText>
          </View>

          <View style={[genericStyles.flexRow, genericStyles.justifyContentSpaceBetween]}>
            <RnuiText>{t('app:changeNum')}</RnuiText>
            <RnuiText>{e.change}</RnuiText>
          </View>
        </View>
      )}
    </View>
  );
};
