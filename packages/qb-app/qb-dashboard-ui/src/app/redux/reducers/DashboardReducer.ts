
import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice state
 */
export interface DashboardReducerStateT {
  apiUrl: string | null;
}

/**
 * Initial state
 */
const initialState: DashboardReducerStateT = {
  apiUrl: null,
};

/**
 * Dashboard slice
 */
const DashboardSlice = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {},
});

/**
 * Reducer
 */
export const { reducerPath: dashboardReducerPath } = DashboardSlice;
export const { reducer: dashboardReducer } = DashboardSlice;
export type DashboardPartialReducerStateT = { [dashboardReducerPath]: DashboardReducerStateT };

