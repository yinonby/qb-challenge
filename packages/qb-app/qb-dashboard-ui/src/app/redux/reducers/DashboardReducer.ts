
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
const dashboardSlice = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {},
});

/**
 * Reducer
 */
export const { reducerPath: dashboardReducerPath } = dashboardSlice;
export const { reducer: dashboardReducer } = dashboardSlice;
export type DashboardPartialReducerStateT = { [dashboardReducerPath]: DashboardReducerStateT };

