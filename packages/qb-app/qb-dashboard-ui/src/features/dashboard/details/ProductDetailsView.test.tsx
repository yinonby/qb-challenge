
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { tsToLocalDateString } from '@qb/utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductDetailsView } from './ProductDetailsView';

jest.mock('./ProductDetailsHeader', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductDetailsHeader: View,
  };
});

jest.mock('./ProductImagesSummary', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductImagesSummary: View,
  };
});

describe('ProductDetailsView', () => {
  it('renders title', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      name: 'MOCKVAL',
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('MOCKVAL');
  });

  it('renders header', async () => {
    // render
    const productDetails = buildProductDetailsMock({});
    const { getByTestId } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    const cut = getByTestId('ProductDetailsHeaderTid');
    expect(cut.props.productDetails).toEqual(productDetails);
  });

  it('renders description', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      description: 'MOCKVAL',
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:description');
    getByText('MOCKVAL');
  });

  it('renders fullDescription', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      fullDescription: 'MOCKVAL',
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:fullDescription');
    getByText('MOCKVAL');
  });

  it('renders category', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      category: 'beauty',
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:category');
    getByText('mocked-t-category:beauty');
  });

  it('renders price', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      price: {
        currencyCode: 'EUR',
        rate: 3,
      },
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:price');
    getByText('3 EUR');
  });

  it('renders popularity', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      popularity: 134,
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:popularity');
    getByText('134');
  });

  it('renders reviews', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      reviews: {
        rating: 3.3,
        count: 199,
      },
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:rating');
    getByText('3.3');
    getByText('(199)');
  });

  it('does not render specifications', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      specifications: undefined,
    });
    const { queryByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    expect(queryByText('mocked-t-app:specifications')).toBeNull();
  });

  it('renders specifications', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      specifications: {
        type: {
          specificationText: 'Type',
          specificationValue: 'Val',
        }
      }
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:specifications');
    getByText('Type:');
    getByText('Val');
  });

  it('renders stockLevel', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      stock: 122,
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:stockLevel');
    getByText('122');
  });

  it('renders lastStockUpdateTs', async () => {
    // render
    const productDetails = buildProductDetailsMock({
      lastStockUpdateTs: 122,
    });
    const { getByText } = render(
      <ProductDetailsView productDetails={productDetails} />
    );

    // verify components
    getByText('mocked-t-app:lastUpdateTime');
    getByText(tsToLocalDateString(122));
  });
});
