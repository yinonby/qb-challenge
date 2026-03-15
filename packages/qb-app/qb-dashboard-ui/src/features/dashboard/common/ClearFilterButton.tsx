
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT } from '@qb/models';
import { useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiIconButton, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { buildAvailabilityOption, type PaginatedFiltersUrlParamsT } from '../../../types/UrlDefs';

export const ClearFilterButton: FC<TestableComponentT> = () => {
  const searchParams = useSearchParams<PaginatedFiltersUrlParamsT>();
  const { category, availabilityMinStr, availabilityMaxStr, sort } = searchParams;
  const { setParams } = useSetSearchParams<PaginatedFiltersUrlParamsT>();
  const availability: AvailabilityOptionT | undefined = buildAvailabilityOption(availabilityMinStr, availabilityMaxStr);

  const handleClearFilters = () => {
    setParams({
      pageNumStr: undefined,
      category: undefined,
      availabilityMinStr: undefined,
      availabilityMaxStr: undefined,
      sort: undefined,
    });
  };

  const isFilterChange = (): boolean => {
    return category !== undefined || availability !== undefined || (sort !== undefined && sort !== DEFAULT_SORT_OPTION);
  }

  if (!isFilterChange()) {
    return null;
  }

  return (
    <RnuiIconButton
      testID='RnuiIconButtonTid'
      size='xs'
      onPress={handleClearFilters}
      icon='filter-variant-remove'
    />
  );
};
