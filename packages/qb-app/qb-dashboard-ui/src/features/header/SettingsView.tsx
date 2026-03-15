
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { RnuiSwitch, RnuiText, type TestableComponentT } from '@qb/rnui';
import { default as React, type FC } from 'react';
import { View } from 'react-native';
import { LanguageSelect } from './LanguageSelect';

type SettingsViewPropsT = TestableComponentT & {
  themeMode: 'light' | 'dark',
  onChangeThemeMode: (themeMode: 'light' | 'dark') => Promise<void>,
}

export const SettingsView: FC<SettingsViewPropsT> = (props) => {
  const { themeMode, onChangeThemeMode } = props;
  const { t } = useAppLocalization();
  const genericStyles = useGenericStyles();
  const isDarkMode = themeMode === 'dark';

  const handleToggleSwitch = async (_isDarkMode: boolean): Promise<void> => {
    await onChangeThemeMode(_isDarkMode ? 'dark' : 'light');
  }

  return (
    <View style={genericStyles.spacing}>
      <View style={[genericStyles.flexRow, genericStyles.justifyContentSpaceBetween, genericStyles.spacingBottom]}>
        <RnuiText variant='titleSmall'>{t('app:darkMode')}</RnuiText>
        <RnuiSwitch testID='RnuiSwitchTid' isSwitchOn={isDarkMode} onToggleSwitch={handleToggleSwitch} />
      </View>

      <RnuiText variant='titleSmall'>{t('app:language')}</RnuiText>
      <LanguageSelect testID='LanguageSelectTid' />
    </View>
  );
};
