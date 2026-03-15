
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductsPageModel } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT } from '@qb/models';
import { useSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { buildAvailabilityOption, type ProductListingPageUrlParamsT } from '../../../types/UrlDefs';
import { ModelLoadingView } from '../../common/ModelLoadingView';
import { ListingView } from './ListingView';

export const ProductListingPageContent: FC<TestableComponentT> = () => {
  const { productsPerPage } = useDashboard();
  const { langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductListingPageUrlParamsT>();
  const { pageNumStr, category, availabilityMinStr, availabilityMaxStr, sort } = searchParams;
  const pageNum = pageNumStr === undefined ? 0 : parseInt(pageNumStr);
  const availability: AvailabilityOptionT | undefined = buildAvailabilityOption(availabilityMinStr, availabilityMaxStr);
  const { isLoading, isError, appErrCode, data } = useProductsPageModel({
    langCode,
    pageNum,
    productsPerPage: productsPerPage,
    category,
    availability,
    sort: sort || DEFAULT_SORT_OPTION,
  });

  if (isLoading || isError) {
    return <ModelLoadingView
      testID='ModelLoadingViewTid'
      isLoading={isLoading}
      appErrCode={isError ? appErrCode : null}
    />;
  }

  return (
    <RnuiAppContent>
      <ListingView testID='ListingViewTid' data={data} />
    </RnuiAppContent>
  );
};
