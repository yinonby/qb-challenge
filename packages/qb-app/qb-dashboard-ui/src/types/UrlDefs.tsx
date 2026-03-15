
import type { AvailabilityOptionT, ProductCategoryT, SortT } from '@qb/models';

export type PaginatedFiltersUrlParamsT = {
  pageNumStr?: string,
  category?: ProductCategoryT,
  availabilityMinStr?: string,
  availabilityMaxStr?: string,
  sort?: SortT,
}

export type ProductListingPageUrlParamsT = PaginatedFiltersUrlParamsT;

export type ProductDetailsPageSearchParamsT = {
  imgView?: 'true',
}

export type ProductInventoryPageUrlParamsT = PaginatedFiltersUrlParamsT;

export const buildAvailabilityOption = (
  availabilityMinStr: string | undefined,
  availabilityMaxStr: string | undefined,
): AvailabilityOptionT | undefined => {
  if (availabilityMinStr === undefined && availabilityMaxStr === undefined) {
    return undefined;
  }
  return {
    minStock: availabilityMinStr === undefined ? undefined : parseInt(availabilityMinStr),
    maxStock: availabilityMaxStr === undefined ? undefined : parseInt(availabilityMaxStr),
  }
}
