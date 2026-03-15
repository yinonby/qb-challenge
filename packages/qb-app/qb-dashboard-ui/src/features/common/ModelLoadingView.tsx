
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { AppErrorPage } from '@qb-dashboard-ui/app/error-handling/AppErrorPage';
import type { AppErrorCodeT } from '@qb/models';
import { RnuiActivityIndicator, type TestableComponentT } from '@qb/rnui';
import React, { useEffect, type FC } from 'react';

export type ModelLoadingViewPropsT = TestableComponentT & ({
  isLoading: boolean,
  appErrCode: AppErrorCodeT | null,
});

export const ModelLoadingView: FC<ModelLoadingViewPropsT> = (props) => {
  const {
    isLoading,
    appErrCode,
  } = props;
  const { onAppError } = useAppErrorHandling();

  useEffect(() => {
    if (appErrCode) {
      onAppError(appErrCode);
    }
  }, [onAppError, appErrCode]);

  if (isLoading) {
    return <RnuiActivityIndicator testID="RnuiActivityIndicator-tid" size="large"/>;
  }

  // when fetching data ends with an error, we assume that it is hard to recover and prefer to go to home page
  return <AppErrorPage />;
};
