import { lgWidth, mdWidth, smWidth, xlWidth } from '@qb-rnui/theme/RnuiDimensionsProvider';

export const TOTAL_GRID_COLUMNS = 12;

export const getBreakpoint = (width: number) => {
  if (width >= xlWidth) return "xl";
  if (width >= lgWidth) return "lg";
  if (width >= mdWidth) return "md";
  if (width >= smWidth) return "sm";
  return "xs";
};
