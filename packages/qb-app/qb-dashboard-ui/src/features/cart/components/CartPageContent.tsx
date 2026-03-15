
import { RnuiAppContent, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { CartView } from './CartView';

export const CartPageContent: FC<TestableComponentT> = () => {
  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      <CartView testID='CartViewTid' />
    </RnuiAppContent>
  );
};
