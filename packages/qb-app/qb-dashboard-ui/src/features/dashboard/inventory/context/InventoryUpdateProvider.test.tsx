
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { inventoryUpdateReducer, InventoryUpdateRootStateT } from '../reducer/InventoryUpdateSlice';
import {
  InventoryUpdateProvider,
  useInventoryUpdate,
} from './InventoryUpdateProvider';

// Helper to render hook with redux provider
const renderInventoryHook = (preloadedState?: InventoryUpdateRootStateT) => {
  const store = configureStore({
    reducer: {
      inventoryUpdateReducer,
    },
    preloadedState,
  });

  return renderHook(() => useInventoryUpdate(), {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <InventoryUpdateProvider>{children}</InventoryUpdateProvider>
      </Provider>
    ),
  });
};

describe('InventoryUpdateProvider', () => {
  it('should add a stock update', () => {
    const { result } = renderInventoryHook();

    act(() => {
      result.current.addStockUpdate({
        productId: 'p1',
        newStock: 10,
        reason: 'restock',
        originalStock: 5,
      });
    });

    const stock = result.current.getStockUpdate('p1');
    expect(stock).toEqual({ productId: 'p1', newStock: 10, reason: 'restock' });
    expect(result.current.isStockUpdated('p1')).toBe(true);
    expect(result.current.isAnyStockUpdated()).toBe(true);
  });

  it('should remove a stock update', () => {
    const { result } = renderInventoryHook({
      inventoryUpdateReducer: {
        stockEditMap: {
          p1: { productId: 'p1', newStock: 10, reason: 'restock' },
        },
      },
    });

    act(() => {
      result.current.removeStockUpdate('p1');
    });

    expect(result.current.getStockUpdate('p1')).toBeNull();
    expect(result.current.isStockUpdated('p1')).toBe(false);
    expect(result.current.isAnyStockUpdated()).toBe(false);
  });

  it('should clear all stock updates', () => {
    const { result } = renderInventoryHook({
      inventoryUpdateReducer: {
        stockEditMap: {
          p1: { productId: 'p1', newStock: 10, reason: 'restock' },
          p2: { productId: 'p2', newStock: 20, reason: 'sale' },
        },
      },
    });

    act(() => {
      result.current.clearAllStockUpdates();
    });

    expect(result.current.getAllStockUpdates()).toEqual([]);
    expect(result.current.isAnyStockUpdated()).toBe(false);
  });

  it('should return all stock updates', () => {
    const { result } = renderInventoryHook({
      inventoryUpdateReducer: {
        stockEditMap: {
          p1: { productId: 'p1', newStock: 10, reason: 'restock' },
          p2: { productId: 'p2', newStock: 20, reason: 'sale' },
        },
      },
    });

    const allUpdates = result.current.getAllStockUpdates();
    expect(allUpdates).toHaveLength(2);
    expect(allUpdates).toEqual(
      expect.arrayContaining([
        { productId: 'p1', newStock: 10, reason: 'restock' },
        { productId: 'p2', newStock: 20, reason: 'sale' },
      ])
    );
  });

  it('should return correct isStockUpdated and isAnyStockUpdated values', () => {
    const { result } = renderInventoryHook({
      inventoryUpdateReducer: {
        stockEditMap: {
          p1: { productId: 'p1', newStock: 10, reason: 'restock' },
        },
      },
    });

    expect(result.current.isStockUpdated('p1')).toBe(true);
    expect(result.current.isStockUpdated('p2')).toBe(false);
    expect(result.current.isAnyStockUpdated()).toBe(true);
  });
});
