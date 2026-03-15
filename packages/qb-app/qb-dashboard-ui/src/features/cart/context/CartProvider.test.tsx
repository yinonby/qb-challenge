
import { AppError } from '@qb-dashboard-ui/types/ErrorTypes';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { cartSlice } from '../reducer/CartSlice';
import { CartProvider, cartStorageKey, useCart, type CartContextT } from './CartProvider';

jest.mock('react', () => {

  const actual = jest.requireActual('react'); // import the real module

  return {
    ...actual,
    useReducer: jest.fn(),
  }
});

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux'); // import the real module

  return {
    ...actual,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }
});

describe('CartProvider', () => {
  const { mock_getStorageItem, mock_setStorageItem } = __puiMocks;
  mock_setStorageItem.mockResolvedValue(undefined);

  const spy_useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
  const mock_dispatch = jest.fn();
  spy_useDispatch.mockReturnValue(mock_dispatch);

  const spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');

  let cartContext: CartContextT;
  const TestConsumer = () => {
    (( cartContext ) = useCart());
    return null;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mock_getStorageItem.mockResolvedValue(JSON.stringify({ cartProducts: [] }));
  });

  it('does not dispatch SET_CART when storage is empty', async () => {
    const initialState = { cart: { cartProducts: [] } };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );
    mock_getStorageItem.mockResolvedValue(null);

    const { toJSON } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(toJSON()).toBeNull();

    expect(mock_getStorageItem).toHaveBeenCalledWith(cartStorageKey);
    expect(mock_dispatch).not.toHaveBeenCalled();
  });

  it('dispatches SET_CART when loading from storage', async () => {
    const initialState = { cart: { cartProducts: [] } };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );
    mock_getStorageItem.mockResolvedValue(JSON.stringify({ cartProducts: [] }));

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(mock_getStorageItem).toHaveBeenCalledWith(cartStorageKey);
    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.setCart({ cartProducts: [] }));
    });
    await waitFor(() => {
      expect(mock_setStorageItem).toHaveBeenCalledWith(cartStorageKey, JSON.stringify(initialState.cart));
    });
  });

  it('calls dispatch with ADD_ITEM when addCartItem is called', async () => {
    const initialState = { cart: { cartProducts: [] }};
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });

    const productDetails = buildProductDetailsMock();
    cartContext.addCartItem(productDetails);

    expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.addItem(productDetails));
  });

  it('calls dispatch with REMOVE_ITEM when removeCartItem is called', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    cartContext.removeCartItem('p1');

    expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.removeItem('p1'));
  });

  it('calls dispatch with INCREASE when incrementCartItemQuantity is called', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    cartContext.incrementCartItemQuantity('p1');

    expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.increase('p1'));
  });

  it('calls dispatch with DECREASE when decrementCartItemQuantity is called', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    cartContext.decrementCartItemQuantity('p1');

    expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.decrease('p1'));
  });

  it('calls dispatch with CLEAN when cleanCart is called', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    cartContext.cleanCart();

    expect(mock_dispatch).toHaveBeenCalledWith(cartSlice.actions.clean());
  });

  it('isInCart: checks if item exists', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(cartContext.isInCart('p1')).toEqual(true);
    expect(cartContext.isInCart('p2')).toEqual(false);
  });

  it('isInCart: checks if item exists, on a clean cart', async () => {
    const initialState = {
      cart: {
        cartProducts: []
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(cartContext.isInCart('p1')).toEqual(false);
  });

  it('throws AppError if addCartItem is called on existing product', async () => {
    const initialState = {
      cart: {
        cartProducts: [{
          productId: 'p1',
        }]
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(() => act(() => cartContext.addCartItem(buildProductDetailsMock({ productId: 'p1' })))).toThrow(AppError);
  });

  it('throws AppError if removeCartItem is called on non-existing product', async () => {
    const initialState = {
      cart: {
        cartProducts: []
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(() => act(() => cartContext.removeCartItem('p1'))).toThrow(AppError);
  });

  it('throws AppError if incrementCartItemQuantity is called on non-existing product', async () => {
    const initialState = {
      cart: {
        cartProducts: []
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(() => act(() => cartContext.incrementCartItemQuantity('p1'))).toThrow(AppError);
  });

  it('throws AppError if decrementCartItemQuantity is called on non-existing product', async () => {
    const initialState = {
      cart: {
        cartProducts: []
      }
    };
    spy_useSelector.mockImplementation(selector =>
      selector({ cartReducer: initialState })
    );

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(mock_dispatch).toHaveBeenCalled();
    });
    mock_dispatch.mockClear();

    expect(() => act(() => cartContext.decrementCartItemQuantity('p1'))).toThrow(AppError);
  });
});