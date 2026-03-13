
import type { DashboardAppReduxRootState } from '@qb-dashboard-ui/app/redux/reducers/AppReduxStore';
import { cartSlice } from '@qb-dashboard-ui/features/cart/reducer/CartSlice';
import type { CartT } from '@qb-dashboard-ui/types/CartDefs';
import { AppError } from '@qb-dashboard-ui/types/ErrorTypes';
import type { ProductDetailsT, ProductIdT } from '@qb/models';
import { useStorage } from '@qb/platform-ui';
import type { TestableComponentT } from '@qb/rnui';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const cartStorageKey = 'cartKey';

export type CartContextT = {
  cart: CartT;
  addCartItem: (product: ProductDetailsT) => void;
  removeCartItem: (productId: ProductIdT) => void;
  incrementCartItemQuantity: (productId: ProductIdT) => void;
  decrementCartItemQuantity: (productId: ProductIdT) => void;
  cleanCart: () => void;
  isInCart: (productId: ProductIdT) => boolean;
};

const CartContext = createContext<CartContextT | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<TestableComponentT>> = ({ children }) => {
  const { getStorageItem, setStorageItem } = useStorage();
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();
  const cartReducerState = useSelector((state: DashboardAppReduxRootState) => state.cartReducer);

  const addCartItem = (productDetails: ProductDetailsT): void => {
    const exists = cartReducerState.cart.cartProducts.some(
      p => p.productId === productDetails.productId
    );

    if (exists) {
      throw new AppError('appClientError:unknown');
    }

    dispatch(cartSlice.actions.addItem(productDetails));
  };

  const removeCartItem = (productId: ProductIdT): void => {
    const exists = cartReducerState.cart.cartProducts.some(
      p => p.productId === productId
    );

    if (!exists) {
      throw new AppError('appClientError:unknown');
    }

    dispatch(cartSlice.actions.removeItem(productId));
  };

  const incrementCartItemQuantity = (productId: ProductIdT): void => {
    const exists = cartReducerState.cart.cartProducts.some(
      p => p.productId === productId
    );

    if (!exists) {
      throw new AppError('appClientError:unknown');
    }

    dispatch(cartSlice.actions.increase(productId));
  };

  const decrementCartItemQuantity = (productId: ProductIdT): void => {
    const exists = cartReducerState.cart.cartProducts.some(
      p => p.productId === productId
    );

    if (!exists) {
      throw new AppError('appClientError:unknown');
    }

    dispatch(cartSlice.actions.decrease(productId));
  };

  // load cart
  useEffect(() => {
    if (!isInitialized) {
      (async () => {
        const cartStr: string | null = await getStorageItem(cartStorageKey);

        if (cartStr !== null) {
          dispatch(cartSlice.actions.setCart(JSON.parse(cartStr)));
        }
        setIsInitialized(true);
      })();
    }
  }, [isInitialized]);

  // persist cart
  useEffect(() => {
    const saveToStorage = async (): Promise<void> => {
      await setStorageItem(cartStorageKey, JSON.stringify(cartReducerState.cart));
    }
    saveToStorage();
  }, [cartReducerState.cart]);

  if (!isInitialized) {
    return null;
  }

  const context: CartContextT = {
    cart: cartReducerState.cart,
    addCartItem: addCartItem,
    removeCartItem: removeCartItem,
    incrementCartItemQuantity: incrementCartItemQuantity,
    decrementCartItemQuantity: decrementCartItemQuantity,
    cleanCart: () => dispatch(cartSlice.actions.clean()),
    isInCart: productId => cartReducerState.cart.cartProducts.some(p => p.productId === productId),
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext) as CartContextT;
