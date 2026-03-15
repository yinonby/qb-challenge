
import type { DashboardReducerStateT } from './DashboardReducer';
import {
  dashboardReducer,
  dashboardReducerPath,
} from './DashboardReducer';

describe('dashboardReducer', () => {
  it('should have the correct reducerPath', () => {
    expect(dashboardReducerPath).toBe('dashboardReducer');
  });

  it('should return the initial state when called with undefined state', () => {
    const state = dashboardReducer(undefined, { type: 'unknown' });

    const expectedState: DashboardReducerStateT = {
      apiUrl: null,
    };

    expect(state).toEqual(expectedState);
  });

  it('should return the same state for unknown actions', () => {
    const prevState: DashboardReducerStateT = {
      apiUrl: null,
    };

    const state = dashboardReducer(prevState, { type: 'UNKNOWN_ACTION' });

    expect(state).toBe(prevState);
  });
});
