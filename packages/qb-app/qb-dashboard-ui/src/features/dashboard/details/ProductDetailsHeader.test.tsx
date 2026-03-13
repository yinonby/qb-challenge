
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import type { DashboardRouterAdapter } from '@qb-dashboard-ui/types/DashboardTypes';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductDetailsHeader } from './ProductDetailsHeader';

jest.mock('@qb-dashboard-ui/features/cart/components/OpenCartButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    OpenCartButton: View,
  };
});

jest.mock('@qb-dashboard-ui/features/cart/components/AddToCartButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AddToCartButton: View,
  };
});

jest.mock('../../common/ShareButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ShareButton: View,
  };
});

describe('ProductDetailsHeader', () => {
  const spy_useDashboard = jest.spyOn(DashboardLayout, 'useDashboard');
  const mock_dashboardRouterAdapter: DashboardRouterAdapter = {
    buildDashboardListingRoute: () => 'MOCK_LISTING_ROUTE',
    buildDashboardDetailsFullRoute: () => 'MOCK_PRODUCT_DETAILS_ROUTE',
  } as unknown as DashboardRouterAdapter;

  spy_useDashboard.mockReturnValue({
    dashboardRouterAdapter: mock_dashboardRouterAdapter,
  } as DashboardContextT);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    // render
    const { getByTestId } = render(
      <ProductDetailsHeader productDetails={buildProductDetailsMock()} />
    );

    // verify components
    const link = getByTestId('PlatformUiLinkTid');
    expect(link.props.href).toEqual('MOCK_LISTING_ROUTE');

    getByTestId('OpenCartButtonTid');
    getByTestId('AddToCartButtonTid');

    const shareBtn = getByTestId('ShareButtonTid');
    expect(shareBtn.props.shareStr).toEqual('MOCK_PRODUCT_DETAILS_ROUTE');
  });
});
