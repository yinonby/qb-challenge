
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductsPageModel } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT, type ProductCategoryT, type SortT } from '@qb/models';
import { isIos, useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, RnuiButton, RnuiIconButton, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import type { ProductListingPageUrlParamsT } from '../../../types/ProductListingDefs';
import { ModelLoadingView } from '../../common/ModelLoadingView';
import { FiltersButton } from './filters/FiltersButton';
import { ProductListingGrid } from './product-summary/ProductListingGrid';

export const ProductListingPageContent: FC<TestableComponentT> = () => {
  const { productsPerPage } = useDashboard();
  const { t, langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductListingPageUrlParamsT>();
  const { pageNumStr, category, availability, sort } = searchParams;
  const { setParams } = useSetSearchParams<ProductListingPageUrlParamsT>();
  const pageNum = pageNumStr === undefined ? 0 : parseInt(pageNumStr);
  const { isLoading, isError, appErrCode, data } = useProductsPageModel({
    langCode: langCode,
    pageNum,
    productsPerPage: productsPerPage,
    category,
    availability,
    sort: sort || DEFAULT_SORT_OPTION,
  });
  const genericStyles = useGenericStyles();
  const iconButtonStyle = {
    marginStart: isIos() ? -6 : 0, // fix icon margin on ios
  }

  const handlePressNext = (): void => {
    const newPageNum = pageNum + 1;

    setParams({
      pageNumStr: newPageNum.toString(),
      category,
      availability,
      sort,
    });
  }

  const handlePressPrev = (): void => {
    const newPageNum = pageNum - 1;

    setParams({
      pageNumStr: newPageNum.toString(),
      category,
      availability,
      sort,
    });
  };

  const handleClearFilters = () => {
    setParams({
      pageNumStr: undefined,
      category: undefined,
      availability: undefined,
      sort: undefined,
    });
  };

  const isFilterChange = (): boolean => {
    return category !== undefined || availability !== undefined || (sort !== undefined && sort !== DEFAULT_SORT_OPTION);
  }

  const handleApplyFilters = (
    category: ProductCategoryT | undefined,
    availability: AvailabilityOptionT | undefined,
    sort: SortT | undefined,
  ): void => {
    const newPageNum = 0; // we must reset the page number when filters are changed

    setParams({
      pageNumStr: newPageNum.toString(),
      category,
      availability,
      sort,
    });
  }

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
          <FiltersButton testID='FiltersButtonTid' onApply={handleApplyFilters} />

          {isFilterChange() &&
            <RnuiIconButton
              testID='ClearFilterButtonTid'
              size='xs'
              onPress={handleClearFilters}
              icon='filter-variant-remove'
              style={iconButtonStyle}
            />
          }

          <View style={genericStyles.flex1} />
          <RnuiButton
            testID='PrevButtonTid'
            size='xs'
            disabled={pageNum === 0}
            onPress={handlePressPrev}
          >
            {t('app:previous')}
          </RnuiButton>
          <RnuiButton
            testID='NextButtonTid'
            size='xs'
            disabled={data.isLastPage}
            onPress={handlePressNext}
          >
            {t('app:next')}
          </RnuiButton>
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
