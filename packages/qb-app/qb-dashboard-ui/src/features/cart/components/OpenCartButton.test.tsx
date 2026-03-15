
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { render } from '@testing-library/react-native';
import React from 'react';
import { OpenCartButton } from './OpenCartButton';

// Mock useDashboard
jest.mock('@qb-dashboard-ui/app/layout/DashboardLayout', () => ({
  useDashboard: jest.fn(),
}));

describe('OpenCartButton', () => {
  const mockBuildCartRoute = jest.fn().mockReturnValue('/cart');

  beforeEach(() => {
    (useDashboard as jest.Mock).mockReturnValue({
      dashboardRouterAdapter: {
        buildCartRoute: mockBuildCartRoute,
      },
    });
  });

  it('renders a PlatformUiLink with correct href and RnuiIconButton', () => {
    const { getByTestId } = render(<OpenCartButton />);

    // Verify RnuiIconButton renders
    const iconButton = getByTestId('ButtonTid');
    expect(iconButton.props.icon).toBe('cart');
    expect(iconButton.props.size).toBe('xs');

    // Verify PlatformUiLink renders with correct href
    const link = getByTestId('LinkTid');
    expect(link.props.href).toBe('/cart');

    // Ensure the buildCartRoute function was called
    expect(mockBuildCartRoute).toHaveBeenCalled();
  });
});
