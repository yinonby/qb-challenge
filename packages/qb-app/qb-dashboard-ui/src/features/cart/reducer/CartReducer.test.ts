
import { buildProductDetailsMock } from '@qb/models/test-utils';
import type { CartProductT, CartT } from '../../../types/CartDefs';
import {
  handleAddItem,
  handleClean,
  handleDecrease,
  handleIncrease,
  handleRemoveItem,
  handleSetCart,
  initialCartReducerState
} from './CartReducer';

describe('CartReducer', () => {
  const cartProduct: CartProductT = {
    productId: 'p1',
    productName: 'Test Product',
    productImageUrl: 'img1',
    quantity: 1,
  };
  const productDetails = buildProductDetailsMock({
    productId: 'p1',
  });
  const otherProductDetails = buildProductDetailsMock({
    productId: 'p2',
  });

  it('handleSetCart replaces the cart', () => {
    const newCart: CartT = { cartProducts: [cartProduct] };
    const state = handleSetCart(initialCartReducerState, newCart);

    expect(state.cart.cartProducts).toHaveLength(1);
    expect(state.cart.cartProducts[0].productId).toBe(productDetails.productId);
  });

  it('handleAddItem adds a new product if not present', () => {
    const state = handleAddItem(initialCartReducerState, productDetails);

    expect(state.cart.cartProducts).toHaveLength(1);
    expect(state.cart.cartProducts[0].productId).toBe(productDetails.productId);
    expect(state.cart.cartProducts[0].quantity).toBe(1);
  });

  it('handleAddItem does nothing if product already exists', () => {
    const initialState = handleAddItem(initialCartReducerState, productDetails);
    const state = handleAddItem(initialState, productDetails);

    expect(state.cart.cartProducts).toHaveLength(1);
    expect(state.cart.cartProducts[0].quantity).toBe(1); // quantity unchanged
  });

  it('handleRemoveItem removes a product if it exists', () => {
    const stateWithItem = handleAddItem(initialCartReducerState, productDetails);
    const state = handleRemoveItem(stateWithItem, productDetails.productId);

    expect(state.cart.cartProducts).toHaveLength(0);
  });

  it('handleRemoveItem does nothing if product does not exist', () => {
    const state = handleRemoveItem(initialCartReducerState, productDetails.productId);

    expect(state.cart.cartProducts).toHaveLength(0);
  });

  it('handleIncrease increments quantity if product exists', () => {
    const stateWithItem1 = handleAddItem(initialCartReducerState, otherProductDetails);
    const stateWithItem2 = handleAddItem(stateWithItem1, productDetails);
    const state = handleIncrease(stateWithItem2, productDetails.productId);

    expect(state.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(state.cart.cartProducts[0].quantity).toBe(1);
    expect(state.cart.cartProducts[1].productId).toEqual(productDetails.productId);
    expect(state.cart.cartProducts[1].quantity).toBe(2);
  });

  it('handleIncrease does nothing if product does not exist', () => {
    const stateWithItem = handleAddItem(initialCartReducerState, otherProductDetails);
    expect(stateWithItem.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(stateWithItem.cart.cartProducts[0].quantity).toEqual(1);

    const state = handleIncrease(stateWithItem, productDetails.productId);
    expect(state.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(state.cart.cartProducts[0].quantity).toEqual(1);
  });

  it('handleDecrease decrements quantity if product exists', () => {
    const stateWithItem1 = handleAddItem(initialCartReducerState, otherProductDetails);
    const stateWithItem2 = handleAddItem(stateWithItem1, productDetails);

    const stateWithIncreased = handleIncrease(stateWithItem2, productDetails.productId);
    expect(stateWithIncreased.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(stateWithIncreased.cart.cartProducts[0].quantity).toBe(1);
    expect(stateWithIncreased.cart.cartProducts[1].productId).toEqual(productDetails.productId);
    expect(stateWithIncreased.cart.cartProducts[1].quantity).toBe(2);

    const state = handleDecrease(stateWithIncreased, productDetails.productId);
    expect(state.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(state.cart.cartProducts[0].quantity).toBe(1);
    expect(state.cart.cartProducts[1].productId).toEqual(productDetails.productId);
    expect(state.cart.cartProducts[1].quantity).toBe(1);
  });

  it('handleDecrease does nothing if product does not exist', () => {
    const stateWithItem = handleAddItem(initialCartReducerState, otherProductDetails);
    expect(stateWithItem.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(stateWithItem.cart.cartProducts[0].quantity).toEqual(1);

    const state = handleDecrease(stateWithItem, productDetails.productId);
    expect(state.cart.cartProducts[0].productId).toEqual(otherProductDetails.productId);
    expect(state.cart.cartProducts[0].quantity).toEqual(1);
  });

  it('handleClean resets the cart', () => {
    handleAddItem(initialCartReducerState, productDetails);
    const state = handleClean();

    expect(state.cart.cartProducts).toHaveLength(0);
  });
});
