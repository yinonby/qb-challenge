
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductDetailsPageContent } from './ProductDetailsPageContent';

describe('ProductDetailsPageContent', () => {
  it('displays activity indicator when loading', async () => {
    // render
    const productId = 'PID1';
    const { getByTestId } = render(
      <ProductDetailsPageContent productId={productId} />
    );

    // verify components
    getByTestId('TextTitleTid');
  });
});
