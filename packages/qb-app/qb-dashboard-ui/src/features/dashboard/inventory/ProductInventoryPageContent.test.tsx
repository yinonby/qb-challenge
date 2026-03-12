
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductInventoryPageContent } from './ProductInventoryPageContent';

describe('ProductInventoryPageContent', () => {
  it('displays activity indicator when loading', async () => {
    // render
    const { getByTestId } = render(
      <ProductInventoryPageContent />
    );

    // verify components
    getByTestId('TextTitleTid');
  });
});
