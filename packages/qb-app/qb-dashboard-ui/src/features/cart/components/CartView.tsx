
import { useCart } from '@qb-dashboard-ui/features/cart/context/CartProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { RnuiText, type TestableComponentT } from '@qb/rnui';
import React from 'react';
import { View } from 'react-native';

export const CartView: React.FC<TestableComponentT> = () => {
  const { cart } = useCart();
  const genericStyles = useGenericStyles();

  return (
    <View>
      {cart.cartProducts.map((e, index) => (
        <View key={index} style={genericStyles.flexRow}>
          <RnuiText testID='QuantityTextTid'>{e.quantity}</RnuiText>
          <RnuiText testID='NameTextTid'>{e.productName}</RnuiText>
        </View>
      ))}
    </View>
  );
};
