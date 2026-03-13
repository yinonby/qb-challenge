
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React from 'react';
import { Share, type ViewStyle } from 'react-native';

type ShareButtonPropsT = TestableComponentT & {
  shareStr: string,
  style?: ViewStyle,
};

export const ShareButton: React.FC<ShareButtonPropsT> = ({ shareStr, style }) => {
  const { onUnknownError } = useAppErrorHandling();

  const handlePress = async () => {
    try {
      await Share.share({
        message: shareStr,
      });
    } catch (error: unknown) {
      onUnknownError(error);
    }
  };

  return (
    <RnuiIconButton testID='RnuiIconButtonTid' icon='share-variant' size='xs' onPress={handlePress} style={style} />
  );
};
