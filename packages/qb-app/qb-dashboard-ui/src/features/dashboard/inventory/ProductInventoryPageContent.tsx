
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductsPageModel } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { ModelLoadingView } from '@qb-dashboard-ui/features/common/ModelLoadingView';
import { type ProductInventoryPageUrlParamsT, buildAvailabilityOption } from '@qb-dashboard-ui/types/UrlDefs';
import { type AvailabilityOptionT, DEFAULT_SORT_OPTION } from '@qb/models';
import { useSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, RnuiText } from '@qb/rnui';
import React, { type FC } from 'react';
import { ProductInventoryTable } from './ProductInventoryTable';

export const ProductInventoryPageContent: FC = () => {
  const { productsPerPage } = useDashboard();
  const { t, langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductInventoryPageUrlParamsT>();
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
    <RnuiAppContent testID="RnuiAppContentTid">
      <RnuiText variant='titleMedium'>{t('app:inventoryManagement')}</RnuiText>

      <ProductInventoryTable testID='ProductInventoryTableTid' productSummaries={data.productSummaries} />
    </RnuiAppContent>
  );
};
