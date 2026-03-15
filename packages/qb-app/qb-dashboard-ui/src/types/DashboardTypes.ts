import type { ProductIdT } from '@qb/models';

export interface DashboardRouterAdapter {
  buildDashboardListingRoute: () => string;
  buildDashboardDetailsRoute: (productId: ProductIdT) => string;
  buildDashboardDetailsFullRoute: (productId: ProductIdT) => string;
  buildDashboardInventoryRoute: () => string;
  buildCartRoute: () => string;
}