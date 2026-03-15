
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductsPageModel } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT } from '@qb/models';
import { useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { buildAvailabilityOption, type ProductListingPageUrlParamsT } from '../../../types/UrlDefs';
import { ModelLoadingView } from '../../common/ModelLoadingView';
import { PaginationControl } from '../../common/PaginationControl';
import { ClearFilterButton } from '../common/ClearFilterButton';
import { FiltersButton } from './filters/FiltersButton';
import { ProductListingGrid } from './product-summary/ProductListingGrid';

export const ProductListingPageContent: FC<TestableComponentT> = () => {
  const { productsPerPage } = useDashboard();
  const { t, langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductListingPageUrlParamsT>();
  const { pageNumStr, category, availabilityMinStr, availabilityMaxStr, sort } = searchParams;
  const { setParams } = useSetSearchParams<ProductListingPageUrlParamsT>();
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
  const genericStyles = useGenericStyles();

  const handlePressNext = (): void => {
    const newPageNum = pageNum + 1;

    setParams({
      pageNumStr: newPageNum.toString(),
      category,
      availabilityMinStr: availability?.minStock?.toString(),
      availabilityMaxStr: availability?.maxStock?.toString(),
      sort,
    });
  }

  const handlePressPrev = (): void => {
    const newPageNum = pageNum - 1;

    setParams({
      pageNumStr: newPageNum.toString(),
      category,
      availabilityMinStr: availability?.minStock?.toString(),
      availabilityMaxStr: availability?.maxStock?.toString(),
      sort,
    });
  };

  if (isLoading || isError) {
    return <ModelLoadingView
      testID='ModelLoadingViewTid'
      isLoading={isLoading}
      appErrCode={isError ? appErrCode : null}
    />;
  }

  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      <View style={genericStyles.spacing}>
        <View style={genericStyles.flexRow}>
          <FiltersButton testID='FiltersButtonTid' />

          <ClearFilterButton testID='ClearFilterButtonTid' />

          <View style={genericStyles.flex1} />

          <PaginationControl
            testID='PaginationControlTid'
            totalItemsNum={data.totalItems}
            curPage={pageNum}
            curPageItemsNum={data.productSummaries.length}
            isLastPage={data.isLastPage}
            itemsPerPage={productsPerPage}
            onNext={handlePressNext}
            onPrev={handlePressPrev}
          />
        </View>

        {data.productSummaries.length === 0 &&
          <RnuiText variant='titleSmall'>{t('app:noProducts')}</RnuiText>
        }

        {data.productSummaries.length !== 0 &&
          <ProductListingGrid
            testID='ProductListingGridTid'
            productSummaries={data.productSummaries}
          />
        }
      </View>
    </RnuiAppContent>
  );
};
