
import type { ProductDetailsT, ProductIdT } from '@qb/models';

export type CartReducerActionT =
  | { type: 'ADD_ITEM'; productDetails: ProductDetailsT }
  | { type: 'REMOVE_ITEM'; productId: ProductIdT }
  | { type: 'INCREASE'; productId: ProductIdT }
  | { type: 'DECREASE'; productId: ProductIdT }
  | { type: 'SET_CART'; cart: CartT }
  | { type: 'CLEAN' };

export type CartReducerStateT = {
  cart: CartT,
}

export type CartT = {
  cartProducts: CartProductT[],
}

export type CartProductT = {
  productId: ProductIdT,
  productName: string,
  productImageUrl: string,
  quantity: number,
}
