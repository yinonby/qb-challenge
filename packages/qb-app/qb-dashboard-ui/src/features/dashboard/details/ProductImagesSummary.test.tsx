
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ProductImagesSummary } from './ProductImagesSummary';

jest.mock('../../common/AirbnbImageGrid', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AirbnbImageGrid: View,
  };
});

describe('ProductImagesSummary', () => {
  const mockProductDetails = buildProductDetailsMock({
    imageUrls: [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
      'https://example.com/img4.jpg',
      'https://example.com/img5.jpg',
    ],
  });
  const { mock_useSetParams } = __puiMocks;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image grid', () => {
    const { getByTestId } = render(
      <ProductImagesSummary productDetails={mockProductDetails} />
    );

    expect(getByTestId('AirbnbImageGridTid')).toBeTruthy();
  });

  it('renders show photos button text', () => {
    const { getByText } = render(
      <ProductImagesSummary productDetails={mockProductDetails} />
    );

    expect(getByText('mocked-t-app:showAllPhotos')).toBeTruthy();
  });

  it('calls setParams when card is pressed', () => {
    const { getByTestId } = render(
      <ProductImagesSummary
        productDetails={mockProductDetails}
      />
    );

    fireEvent.press(getByTestId('RnuiCardTid'));

    expect(mock_useSetParams).toHaveBeenCalledWith({
      imgView: 'true',
    });
  });

  it('calls setParams when button is pressed', () => {
    const { getByText } = render(
      <ProductImagesSummary productDetails={mockProductDetails} />
    );

    fireEvent.press(getByText('mocked-t-app:showAllPhotos'));

    expect(mock_useSetParams).toHaveBeenCalledWith({
      imgView: 'true',
    });
  });
});
