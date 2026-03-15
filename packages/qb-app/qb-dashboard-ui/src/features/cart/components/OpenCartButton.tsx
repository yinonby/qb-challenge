
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { PlatformUiLink } from '@qb/platform-ui';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React from 'react';

export const OpenCartButton: React.FC<TestableComponentT> = () => {
  const { dashboardRouterAdapter } = useDashboard();

  return (
    <PlatformUiLink testID='LinkTid' href={dashboardRouterAdapter.buildCartRoute()}>
      <RnuiIconButton testID='ButtonTid' icon='cart' size='xs' />
    </PlatformUiLink>
  );
};
