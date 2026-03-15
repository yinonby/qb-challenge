
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayoutModule from '@qb-dashboard-ui/app/layout/DashboardLayout';
import type { DashboardRouterAdapter } from '@qb-dashboard-ui/types/DashboardTypes';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductImagesView } from './ProductImagesView';

describe('ProductImagesView', () => {
  const mock_productDetails = buildProductDetailsMock({
    productId: 'p1',
    name: 'Test Product',
    imageUrls: [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
    ],
  });

  const spy_useDashboard = jest.spyOn(DashboardLayoutModule, 'useDashboard');
  const mock_buildDashboardDetailsRoute = jest.fn().mockReturnValue('MOCK_PRODUCT_DETAILS_ROUTE');
  spy_useDashboard.mockReturnValue({
    dashboardRouterAdapter: {
      buildDashboardDetailsRoute: mock_buildDashboardDetailsRoute,
    } as unknown as DashboardRouterAdapter,
  } as DashboardContextT);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product name', () => {
    const { getByText } = render(
      <ProductImagesView productDetails={mock_productDetails} />
    );

    expect(getByText('Test Product')).toBeTruthy();
  });

  it('renders all product images', () => {
    const { getAllByTestId } = render(
      <ProductImagesView productDetails={mock_productDetails} />
    );

    const images = getAllByTestId('RnuiImage');
    expect(images.length).toBe(3);
  });

  it('calls route builder with product id', () => {
    render(<ProductImagesView productDetails={mock_productDetails} />);

    expect(mock_buildDashboardDetailsRoute).toHaveBeenCalledWith('p1');
  });

  it('renders back button icon', () => {
    const { getByTestId } = render(
      <ProductImagesView productDetails={mock_productDetails} />
    );

    const link = getByTestId('BackLink');
    expect(link.props.href).toEqual('MOCK_PRODUCT_DETAILS_ROUTE');
  });
});
