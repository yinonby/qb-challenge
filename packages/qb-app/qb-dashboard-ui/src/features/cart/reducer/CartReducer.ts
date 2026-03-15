
import type { ProductDetailsT, ProductIdT } from '@qb/models';
import type { CartReducerStateT, CartT } from '../../../types/CartDefs';

export const initialCartReducerState: CartReducerStateT = {
  cart: {
    cartProducts: [],
  }
};

export const handleSetCart = (state: CartReducerStateT, cart: CartT): CartReducerStateT => {
  return {
    cart: cart,
  }
}

export const handleAddItem = (state: CartReducerStateT, productDetails: ProductDetailsT): CartReducerStateT => {
  const { cart } = state;

  const existing = cart.cartProducts.find(
    p => p.productId === productDetails.productId
  );

  if (existing) {
    return state; // nothing to do
  }

  return {
    cart: {
      ...cart,
      cartProducts: [
        ...cart.cartProducts,
        {
          productId: productDetails.productId,
          productName: productDetails.name,
          productImageUrl: productDetails.imageUrls[0],
          quantity: 1,
        },
      ],
    }
  };
}

export const handleRemoveItem = (state: CartReducerStateT, productId: ProductIdT): CartReducerStateT => {
  const { cart } = state;

  const existing = cart.cartProducts.find(
    p => p.productId === productId
  );

  if (!existing) {
    return state; // nothing to do
  }

  return {
    cart: {
      ...cart,
      cartProducts: cart.cartProducts.filter(
        p => p.productId !== productId
      ),
    }
  };
}

export const handleIncrease = (state: CartReducerStateT, productId: ProductIdT): CartReducerStateT => {
  return handleQuantityAdd(state, productId, 1);
}

export const handleDecrease = (state: CartReducerStateT, productId: ProductIdT): CartReducerStateT => {
  return handleQuantityAdd(state, productId, -1);
}

const handleQuantityAdd = (state: CartReducerStateT, productId: ProductIdT, val: number): CartReducerStateT => {
  const { cart } = state;

  const existing = cart.cartProducts.find(
    p => p.productId === productId
  );

  if (!existing) {
    return state; // nothing to do
  }

  return {
    cart: {
      ...cart,
      cartProducts: cart.cartProducts.map(p =>
        p.productId === productId
          ? { ...p, quantity: p.quantity + val }
          : p
      ),
    }
  };
}

export const handleClean = (): CartReducerStateT => {
  return initialCartReducerState;
}
