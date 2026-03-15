
import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStockUpdateAction,
  clearAllStockUpdatesAction,
  removeStockUpdateAction,
  selectEdits,
  StockEditT
} from '../reducer/InventoryUpdateSlice';

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
}

// Create the context
const InventoryUpdateContext = createContext<InventoryUpdateContextT | undefined>(undefined);

// Provider component
export const InventoryUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
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

  const value: InventoryUpdateContextT = {
    addStockUpdate,
    removeStockUpdate,
    getStockUpdate,
    getAllStockUpdates,
    isStockUpdated,
    isAnyStockUpdated,
    clearAllStockUpdates,
  };

  return <InventoryUpdateContext.Provider value={value}>{children}</InventoryUpdateContext.Provider>;
};

// Hook for consuming the provider
export const useInventoryUpdate = (): InventoryUpdateContextT =>
  useContext(InventoryUpdateContext) as unknown as InventoryUpdateContextT;
