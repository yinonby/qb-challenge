
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { inventoryUpdateReducer, InventoryUpdateRootStateT } from '../reducer/InventoryUpdateSlice';
import { fetchProductsCsv } from '../reducer/ProductsCsvThunk';
import {
  InventoryUpdateProvider,
  useInventoryUpdate,
} from './InventoryUpdateProvider';

jest.mock('../reducer/ProductsCsvThunk', () => ({
  fetchProductsCsv: jest.fn(),
}));

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockFetchProductsCsv = fetchProductsCsv as any;

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

  it('throws AppError when fetchProductsCsv returns a business error', async () => {
    // Mock a successful dispatch but with an error payload from the API
    mockFetchProductsCsv.mockReturnValue({
      type: 'fetchProductsCsv/fulfilled',
      payload: {
        error: { appErrCode: 'appClientError:invalidParams' },
      },
    });

    // Add the .match helper to the mock so the code inside the Provider works
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetchProductsCsv.fulfilled = { match: (action: any) => action.type === 'fetchProductsCsv/fulfilled' };

    const { result } = renderInventoryHook();

    await expect(
      act(async () => {
        await result.current.getProductInventoryAsCsv('en', 'UTC');
      })
    ).rejects.toThrow('appClientError:invalidParams');
  });

  it('throws unknown AppError when fetchProductsCsv fails/rejects', async () => {
    // Mock a rejected action (e.g. network failure)
    mockFetchProductsCsv.mockReturnValue({
      type: 'fetchProductsCsv/rejected',
    });

    // Ensure .match returns false for fulfilled
    mockFetchProductsCsv.fulfilled = { match: () => false };

    const { result } = renderInventoryHook();

    await expect(
      act(async () => {
        await result.current.getProductInventoryAsCsv('en', 'UTC');
      })
    ).rejects.toThrow('appClientError:unknown');
  });

  it('successfully returns csv string when fetchProductsCsv is fulfilled', async () => {
    const csvStr = 'productId,newStock\np1,10';

    mockFetchProductsCsv.mockReturnValue({
      type: 'fetchProductsCsv/fulfilled',
      payload: {
        data: { csvStr },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetchProductsCsv.fulfilled = { match: (action: any) => action.type === 'fetchProductsCsv/fulfilled' };

    const { result } = renderInventoryHook();

    let csv: string | undefined;
    await act(async () => {
      csv = await result.current.getProductInventoryAsCsv('en', 'UTC');
    });

    expect(csv).toBe(csvStr);
  });
});
