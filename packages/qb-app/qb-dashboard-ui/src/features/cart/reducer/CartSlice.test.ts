
import type { ProductDetailsT, ProductIdT } from '@qb/models';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import type { CartReducerStateT } from '../../../types/CartDefs';
import * as helpers from './CartReducer';
import { cartSlice } from './CartSlice';

describe('CartSlice', () => {
  const initialState: CartReducerStateT = {
    cart: { cartProducts: [] },
  };

  const product: ProductDetailsT = buildProductDetailsMock({
    productId: 'p1',
    name: 'Test Product',
    imageUrls: ['img1'],
  });

  const productId: ProductIdT = 'p1';

  beforeEach(() => {
    jest.restoreAllMocks(); // reset all mocks before each test
  });

  it('setCart calls handleSetCart', () => {
    const spy = jest.spyOn(helpers, 'handleSetCart').mockReturnValue(initialState);
    cartSlice.caseReducers.setCart(initialState, { type: 'setCart', payload: initialState.cart });
    expect(spy).toHaveBeenCalledWith(initialState, initialState.cart);
  });

  it('addItem calls handleAddItem', () => {
    const spy = jest.spyOn(helpers, 'handleAddItem').mockReturnValue(initialState);
    cartSlice.caseReducers.addItem(initialState, { type: 'addItem', payload: product });
    expect(spy).toHaveBeenCalledWith(initialState, product);
  });

  it('removeItem calls handleRemoveItem', () => {
    const spy = jest.spyOn(helpers, 'handleRemoveItem').mockReturnValue(initialState);
    cartSlice.caseReducers.removeItem(initialState, { type: 'removeItem', payload: productId });
    expect(spy).toHaveBeenCalledWith(initialState, productId);
  });

  it('increase calls handleIncrease', () => {
    const spy = jest.spyOn(helpers, 'handleIncrease').mockReturnValue(initialState);
    cartSlice.caseReducers.increase(initialState, { type: 'increase', payload: productId });
    expect(spy).toHaveBeenCalledWith(initialState, productId);
  });

  it('decrease calls handleDecrease', () => {
    const spy = jest.spyOn(helpers, 'handleDecrease').mockReturnValue(initialState);
    cartSlice.caseReducers.decrease(initialState, { type: 'decrease', payload: productId });
    expect(spy).toHaveBeenCalledWith(initialState, productId);
  });

  it('clean calls handleClean', () => {
    const spy = jest.spyOn(helpers, 'handleClean').mockReturnValue(initialState);
    cartSlice.caseReducers.clean();
    expect(spy).toHaveBeenCalled();
  });
});
