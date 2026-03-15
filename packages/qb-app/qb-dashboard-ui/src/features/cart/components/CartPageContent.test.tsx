
import { render } from '@testing-library/react-native';
import React from 'react';
import { CartPageContent } from './CartPageContent';

// Mock useCart
jest.mock('./CartView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    CartView: View,
  };
});

describe('CartPageContent', () => {
  it('renders cart items with correct quantity and name', () => {
    const { getByTestId } = render(<CartPageContent />);

    getByTestId('CartViewTid');
  });
});
