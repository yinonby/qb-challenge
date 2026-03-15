
import type { ProductDetailsT, ProductIdT } from '@qb/models';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartReducerStateT, CartT } from '../../../types/CartDefs';
import {
  handleAddItem, handleClean, handleDecrease, handleIncrease,
  handleRemoveItem, handleSetCart,
} from './CartReducer';

const initialState: CartReducerStateT = {
  cart: {
    cartProducts: [],
  },
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    // Wrap each action as a case reducer that calls your cartReducer
    setCart: (state: CartReducerStateT, action: PayloadAction<CartT>) => {
      return handleSetCart(state, action.payload);
    },

    addItem: (state: CartReducerStateT, action: PayloadAction<ProductDetailsT>) => {
      return handleAddItem(state, action.payload);
    },

    removeItem: (state: CartReducerStateT, action: PayloadAction<ProductIdT>) => {
      return handleRemoveItem(state, action.payload);
    },

    increase: (state: CartReducerStateT, action: PayloadAction<ProductIdT>) => {
      return handleIncrease(state, action.payload);

    },

    decrease: (state: CartReducerStateT, action: PayloadAction<ProductIdT>) => {
      return handleDecrease(state, action.payload);
    },

    clean: () => {
      return handleClean();
    },
  },
});

export const { reducerPath: cartReducerPath } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
export type CartPartialReducerStateT = { [cartReducerPath]: CartReducerStateT };
