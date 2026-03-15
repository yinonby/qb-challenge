
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { useClientLogger } from '@qb-dashboard-ui/logger/ClientLogger';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React from 'react';
import { Share, type ViewStyle } from 'react-native';

type ShareButtonPropsT = TestableComponentT & {
  shareStr: string,
  style?: ViewStyle,
};

export const ShareButton: React.FC<ShareButtonPropsT> = ({ shareStr, style }) => {
  const { onUnknownError } = useAppErrorHandling();
  const logger = useClientLogger();

  const handlePress = async () => {
    try {
      await Share.share({
        message: shareStr,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        logger.info(error)
      } else {
        onUnknownError(error);
      }
    }
  };

  return (
    <RnuiIconButton testID='RnuiIconButtonTid' icon='share-variant' size='xs' onPress={handlePress} style={style} />
  );
};
