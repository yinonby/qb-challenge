
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductSummaryView } from './ProductSummaryView';

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    spacing: {},
    flex2: {},
  }),
}));

describe('ProductSummaryView', () => {
  const productSummary = buildProductSummaryMock({
    name: 'MacBook Pro',
    description: 'Apple laptop',
    category: 'electronics',
    popularity: 5,
    stock: 20,
    imageUrl: 'https://test.com/image.jpg',
    price: {
      rate: 2000,
      currencyCode: 'USD',
    },
  });

  it('renders card', () => {
    const { getByTestId } = render(
      <ProductSummaryView productSummary={productSummary} />
    );

    expect(getByTestId('RnuiCardTid')).toBeTruthy();
  });

  it('renders product information', () => {
    const { getByText } = render(
      <ProductSummaryView productSummary={productSummary} />
    );

    expect(getByText('MacBook Pro')).toBeTruthy();
    expect(getByText('Apple laptop')).toBeTruthy();
    expect(getByText('2000 USD')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });

  it('renders translated labels', () => {
    const { getByText } = render(
      <ProductSummaryView productSummary={productSummary} />
    );

    expect(getByText('mocked-t-app:productName')).toBeTruthy();
    expect(getByText('mocked-t-app:description')).toBeTruthy();
    expect(getByText('mocked-t-app:price')).toBeTruthy();
    expect(getByText('mocked-t-app:popularity')).toBeTruthy();
    expect(getByText('mocked-t-app:stockLevel')).toBeTruthy();
  });

  it('passes correct image props to card', () => {
    const { getByTestId } = render(
      <ProductSummaryView productSummary={productSummary} />
    );

    const card = getByTestId('RnuiCardTid');

    expect(card.props.imageProps.imageSource).toBe(productSummary.imageUrl);
    expect(card.props.imageProps.height).toBe(200);
  });
});