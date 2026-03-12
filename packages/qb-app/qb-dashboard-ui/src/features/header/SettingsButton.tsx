
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { RnuiIconButton, RnuiModal, type TestableComponentT } from '@qb/rnui';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { SettingsView } from './SettingsView';

type SettingsButtonPropsT = TestableComponentT & {
  iconColor?: string,
  backgroundColor?: string,
  themeMode: 'light' | 'dark',
  onChangeThemeMode: (themeMode: 'light' | 'dark') => Promise<void>,
}

export const SettingsButton: FC<SettingsButtonPropsT> = (props) => {
  const { iconColor, backgroundColor, themeMode, onChangeThemeMode } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { appHeaderHeight } = useDashboard();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <View>
      <RnuiIconButton
        testID='SettingsButtonTid'
        size='xs'
        mode='contained'
        onPress={handleOpen}
        icon='cog'
        theme={{ colors: { primary: iconColor } }}
        style={{ backgroundColor: backgroundColor }}
      />
      {isOpen &&
        <RnuiModal
          testID='RnuiModalTid'
          placement={'center'}
          includeCloseButton
          onDismiss={handleClose}
          onClose={handleClose}
          fullScreenMarginTop={appHeaderHeight}
          nonFullScreenWidthLimit={400}
        >
          <SettingsView testID='SettingsViewTid' themeMode={themeMode} onChangeThemeMode={onChangeThemeMode} />
        </RnuiModal>
      }
    </View>
  );
};
