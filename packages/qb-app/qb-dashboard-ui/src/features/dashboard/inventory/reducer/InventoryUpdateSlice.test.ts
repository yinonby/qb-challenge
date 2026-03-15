import {
  addStockUpdateAction, clearAllStockUpdatesAction,
  inventoryUpdateReducer, inventoryUpdateReducerPath,
  removeStockUpdateAction, selectEdits, StockEditorState
} from './InventoryUpdateSlice';

describe('InventoryUpdateSlice', () => {
  let initialState: StockEditorState;

  beforeEach(() => {
    initialState = { stockEditMap: {} };
  });

  it('should add a stock update', () => {
    const action = addStockUpdateAction({
      productId: 'p1',
      newStock: 10,
      reason: 'restock',
      originalStock: 5,
    });

    const state = inventoryUpdateReducer(initialState, action);

    expect(state.stockEditMap['p1']).toEqual({
      productId: 'p1',
      newStock: 10,
      reason: 'restock',
    });
  });

  it('should remove a stock update if newStock equals originalStock', () => {
    const preState: StockEditorState = {
      stockEditMap: {
        p1: { productId: 'p1', newStock: 10, reason: 'restock' },
      },
    };

    const action = addStockUpdateAction({
      productId: 'p1',
      newStock: 10,
      reason: 'restock',
      originalStock: 10,
    });

    const state = inventoryUpdateReducer(preState, action);

    expect(state.stockEditMap['p1']).toBeUndefined();
  });

  it('should remove a stock update', () => {
    const preState: StockEditorState = {
      stockEditMap: {
        p1: { productId: 'p1', newStock: 10, reason: 'restock' },
        p2: { productId: 'p2', newStock: 20, reason: 'sale' },
      },
    };

    const action = removeStockUpdateAction('p1');

    const state = inventoryUpdateReducer(preState, action);

    expect(state.stockEditMap['p1']).toBeUndefined();
    expect(state.stockEditMap['p2']).toBeDefined();
  });

  it('should clear all stock updates', () => {
    const preState: StockEditorState = {
      stockEditMap: {
        p1: { productId: 'p1', newStock: 10, reason: 'restock' },
        p2: { productId: 'p2', newStock: 20, reason: 'sale' },
      },
    };

    const action = clearAllStockUpdatesAction();

    const state = inventoryUpdateReducer(preState, action);

    expect(state.stockEditMap).toEqual({});
  });

  it('selectEdits selector should return stockEditMap', () => {
    const rootState = {
      [inventoryUpdateReducerPath]: {
        stockEditMap: {
          p1: { productId: 'p1', newStock: 10, reason: 'restock' },
        },
      },
    };

    const edits = selectEdits(rootState);

    expect(edits['p1']).toEqual({ productId: 'p1', newStock: 10, reason: 'restock' });
  });
});
