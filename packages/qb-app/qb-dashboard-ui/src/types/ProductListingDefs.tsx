
import type { AvailabilityOptionT, ProductCategoryT, SortT } from '@qb/models';

export type ProductListingPageUrlParamsT = {
  pageNumStr?: string,
  category?: ProductCategoryT,
  availability?: AvailabilityOptionT,
  sort?: SortT,
}
