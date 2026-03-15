
import { useCart } from '@qb-dashboard-ui/features/cart/context/CartProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { render } from '@testing-library/react-native';
import React from 'react';
import { CartView } from './CartView';

// Mock useCart
jest.mock('@qb-dashboard-ui/features/cart/context/CartProvider', () => ({
  useCart: jest.fn(),
}));

// Mock useGenericStyles
jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: jest.fn(),
}));

describe('CartView', () => {
  const mockCart = {
    cart: {
      cartProducts: [
        { productId: 'p1', productName: 'Product 1', quantity: 2 },
        { productId: 'p2', productName: 'Product 2', quantity: 5 },
      ],
    },
  };

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue(mockCart);
    (useGenericStyles as jest.Mock).mockReturnValue({
      flexRow: { flexDirection: 'row' },
    });
  });

  it('renders cart items with correct quantity and name', () => {
    const { getAllByTestId } = render(<CartView />);

    const quantityTexts = getAllByTestId('QuantityTextTid');
    const nameTexts = getAllByTestId('NameTextTid');

    expect(quantityTexts[0].props.children).toBe(2);
    expect(quantityTexts[1].props.children).toBe(5);

    expect(nameTexts[0].props.children).toBe('Product 1');
    expect(nameTexts[1].props.children).toBe('Product 2');
  });
});
