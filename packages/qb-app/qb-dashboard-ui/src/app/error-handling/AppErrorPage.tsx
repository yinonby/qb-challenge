
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { usePlatformUiNavigation } from '@qb/platform-ui';
import {
  RnuiAppContent, RnuiButton,
  RnuiText, type TestableComponentT
} from '@qb/rnui';
import React, { type PropsWithChildren } from 'react';
import { View } from 'react-native';

type AppErrorPagePropsT = TestableComponentT;

export const AppErrorPage: React.FC<PropsWithChildren<AppErrorPagePropsT>> = () => {
  // keep this component without any dependencies
  const genericStyles = useGenericStyles();
  const { navigateReplace } = usePlatformUiNavigation();
  // don't access any hooks here to keep it safe

  const handlePress = (): void => {
    navigateReplace('/');
  }

  return (
    <RnuiAppContent>
      <View style={genericStyles.spacing}>
        <RnuiText testID='RnuiTextTid'>An unknown error has occurred</RnuiText>

        <View style={genericStyles.flexRow}>
          <RnuiButton testID='RnuiButtonTid' onPress={handlePress}>Go to home</RnuiButton>
        </View>
      </View>
    </RnuiAppContent>
  );
};
