
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { useCart } from '@qb-dashboard-ui/features/cart/context/CartProvider';
import type { ProductDetailsT } from '@qb/models';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React from 'react';

type AddToCartButtonPropsT = TestableComponentT & {
  productDetails: ProductDetailsT,
};

export const AddToCartButton: React.FC<AddToCartButtonPropsT> = ({ productDetails }) => {
  const { addCartItem, isInCart } = useCart();
  const { onUnknownError } = useAppErrorHandling();

  const handlePress = async () => {
    try {
      addCartItem(productDetails);
    } catch (error: unknown) {
      onUnknownError(error);
    }
  };

  return (
    <RnuiIconButton
      testID='AddButtonTid'
      icon='cart-plus'
      size='xs'
      disabled={isInCart(productDetails.productId)}
      onPress={handlePress}
    />
  );
};
