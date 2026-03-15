
import { useDashboardDispatch } from '@qb-dashboard-ui/app/redux/reducers/AppReduxStore';
import { AppError } from '@qb-dashboard-ui/types/ErrorTypes';
import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  addStockUpdateAction,
  clearAllStockUpdatesAction,
  removeStockUpdateAction,
  selectEdits,
  StockEditT
} from '../reducer/InventoryUpdateSlice';
import { fetchProductsCsv } from '../reducer/ProductsCsvThunk';

// Define the context type
export interface InventoryUpdateContextT {
  addStockUpdate: (args: {
    productId: string,
    newStock: number,
    reason: string,
    originalStock: number,
  }) => void;
  removeStockUpdate: (productId: string) => void;
  clearAllStockUpdates: () => void;
  getStockUpdate: (productId: string) => StockEditT | null;
  getAllStockUpdates: () => StockEditT[];
  isStockUpdated: (productId: string) => boolean;
  isAnyStockUpdated: () => boolean;
  getProductInventoryAsCsv: (langTag: string, timeZone: string | undefined) => Promise<string>,
}

// Create the context
const InventoryUpdateContext = createContext<InventoryUpdateContextT | undefined>(undefined);

// Provider component
export const InventoryUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDashboardDispatch();
  const stockEditMap = useSelector(selectEdits);

  // Add or update stock
  const addStockUpdate = (args: {
    productId: string,
    newStock: number,
    reason: string,
    originalStock: number,
  }) => {
    dispatch(addStockUpdateAction(args));
  };

  // Remove a stock update
  const removeStockUpdate = (productId: string) => {
    dispatch(removeStockUpdateAction(productId));
  };

  // Initialize original stock from productSummaries
  const clearAllStockUpdates = () => {
    dispatch(clearAllStockUpdatesAction());
  };

  // Get a stock update for a product
  const getStockUpdate = (productId: string): StockEditT | null => {
    return stockEditMap[productId] || null;
  };

  // Get a stock update for a product
  const getAllStockUpdates = (): StockEditT[] => {
    return Object.values(stockEditMap);
  };

  // Check if a product has a stock update
  const isStockUpdated = (productId: string) => {
    return stockEditMap[productId] !== undefined;
  };

  // Check if any product has stock updates
  const isAnyStockUpdated = () => {
    return Object.keys(stockEditMap).length > 0;
  };

  const getProductInventoryAsCsv = async (langTag: string, timeZone: string | undefined): Promise<string> => {
    const result = await dispatch(fetchProductsCsv({ langTag, timeZone }));

    if (fetchProductsCsv.fulfilled.match(result)) {
      if (result.payload.error) {
        throw new AppError(result.payload.error.appErrCode);
      }

      const csvString = result.payload.data?.csvStr;
      return csvString;
    } else {
      throw new AppError('appClientError:unknown');
    }
  };

  const value: InventoryUpdateContextT = {
    addStockUpdate,
    removeStockUpdate,
    getStockUpdate,
    getAllStockUpdates,
    isStockUpdated,
    isAnyStockUpdated,
    clearAllStockUpdates,
    getProductInventoryAsCsv,
  };

  return <InventoryUpdateContext.Provider value={value}>{children}</InventoryUpdateContext.Provider>;
};

// Hook for consuming the provider
export const useInventoryUpdate = (): InventoryUpdateContextT =>
  useContext(InventoryUpdateContext) as unknown as InventoryUpdateContextT;
