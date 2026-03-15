
import type { ProductSummaryT } from '@qb/models';
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductInventoryTable } from './ProductInventoryTable';

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    flexRow: {},
    flexRowReverse: {},
  }),
}));

jest.mock('./ProductInventoryTableRow', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductInventoryTableRow: View,
  };
});

// tests

describe('ProductInventoryTable', () => {
  const products: ProductSummaryT[] = [
    buildProductSummaryMock({ name: 'Product 1', stock: 10 }),
    buildProductSummaryMock({ name: 'Product 2', stock: 5 }),
  ];

  it('renders product rows', () => {
    const { getByText, getAllByTestId } = render(
      <ProductInventoryTable productSummaries={products} />
    );

    getByText('app:productName');
    getByText('app:stockLevel');
    expect(getAllByTestId('ProductInventoryTableRowTid')).toHaveLength(2);
  });

});
