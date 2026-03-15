import type { ProductIdT } from '@qb/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockEditT = {
  productId: ProductIdT,
  newStock: number;
  reason: string;
};

export type StockEditorState = {
  stockEditMap: Record<string, StockEditT>;
};

const initialState: StockEditorState = {
  stockEditMap: {},
};

const stockEditorSlice = createSlice({
  name: 'inventoryUpdateReducer',
  initialState,
  reducers: {
    addStockUpdateAction(
      state,
      action: PayloadAction<{ productId: string; newStock: number; reason: string, originalStock: number }>
    ) {
      const { productId, newStock, reason, originalStock } = action.payload;

      if (originalStock === newStock) {
        delete state.stockEditMap[productId];
      } else {
        state.stockEditMap[productId] = { productId, newStock, reason };
      }
    },

    removeStockUpdateAction(state, action: PayloadAction<string>) {
      delete state.stockEditMap[action.payload];
    },

    clearAllStockUpdatesAction(state) {
      state.stockEditMap = {};
    },
  },
});

export const {
  addStockUpdateAction,
  removeStockUpdateAction,
  clearAllStockUpdatesAction,
} = stockEditorSlice.actions;

export const { reducerPath: inventoryUpdateReducerPath } = stockEditorSlice;
export const { reducer: inventoryUpdateReducer } = stockEditorSlice;
export type InventoryUpdateRootStateT = { [inventoryUpdateReducerPath]: StockEditorState };
export const selectEdits = (state: InventoryUpdateRootStateT) => state[inventoryUpdateReducerPath].stockEditMap;
