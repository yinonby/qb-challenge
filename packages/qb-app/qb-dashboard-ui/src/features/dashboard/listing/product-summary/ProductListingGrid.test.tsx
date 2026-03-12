
import type { ProductSummaryT } from '@qb/models';
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductListingGrid } from './ProductListingGrid';

// mocks

jest.mock('./ProductSummaryView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductSummaryView: View,
  };
});

// tests

describe('ProductListingGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const productSummaries: ProductSummaryT[] = [
      buildProductSummaryMock(),
      buildProductSummaryMock(),
    ]

    const { getAllByTestId } = render(<ProductListingGrid productSummaries={productSummaries} />);

    const views = getAllByTestId('ProductSummaryViewTid');
    expect(views).toHaveLength(productSummaries.length);
  });
});
