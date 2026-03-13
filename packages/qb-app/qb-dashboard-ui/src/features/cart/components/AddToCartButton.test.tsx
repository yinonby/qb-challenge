
// AddToCartButton.test.tsx
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { useCart } from '@qb-dashboard-ui/features/cart/context/CartProvider';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AddToCartButton } from './AddToCartButton';

jest.mock('@qb-dashboard-ui/features/cart/context/CartProvider', () => ({
  useCart: jest.fn(),
}));

jest.mock('@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider', () => ({
  useAppErrorHandling: jest.fn(),
}));

describe('AddToCartButton', () => {
  const productDetails = buildProductDetailsMock({
    productId: 'p1',
    name: 'Product 1',
    imageUrls: ['img1'],
  });

  const addCartItemMock = jest.fn();
  const isInCartMock = jest.fn();
  const onUnknownErrorMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue({
      addCartItem: addCartItemMock,
      isInCart: isInCartMock,
    });
    (useAppErrorHandling as jest.Mock).mockReturnValue({
      onUnknownError: onUnknownErrorMock,
    });
  });

  it('calls addCartItem when pressed', () => {
    isInCartMock.mockReturnValue(false);

    const { getByTestId } = render(
      <AddToCartButton productDetails={productDetails} />
    );

    fireEvent.press(getByTestId('AddButtonTid'));
    expect(addCartItemMock).toHaveBeenCalledWith(productDetails);
  });

  it('disables button if item is already in cart', () => {
    isInCartMock.mockReturnValue(true);

    const { getByTestId } = render(
      <AddToCartButton productDetails={productDetails} />
    );

    const button = getByTestId('AddButtonTid');
    expect(button.props.disabled).toBe(true);
  });

  it('calls onUnknownError if addCartItem throws', () => {
    isInCartMock.mockReturnValue(false);
    addCartItemMock.mockImplementation(() => {
      throw new Error('test error');
    });

    const { getByTestId } = render(
      <AddToCartButton productDetails={productDetails} />
    );

    fireEvent.press(getByTestId('AddButtonTid'));
    expect(onUnknownErrorMock).toHaveBeenCalled();
  });
});
