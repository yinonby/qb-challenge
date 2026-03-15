
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductsPageModel } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import { ModelLoadingView } from '@qb-dashboard-ui/features/common/ModelLoadingView';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { type ProductInventoryPageUrlParamsT, buildAvailabilityOption } from '@qb-dashboard-ui/types/UrlDefs';
import { type AvailabilityOptionT, DEFAULT_SORT_OPTION } from '@qb/models';
import { useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, RnuiButton, RnuiText } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { PaginationControl } from '../../../common/PaginationControl';
import { useInventoryUpdate } from '../context/InventoryUpdateProvider';
import { ProductInventoryTable } from './ProductInventoryTable';

export const ProductInventoryPageContent: FC = () => {
  const { productsPerPage } = useDashboard();
  const { t, langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductInventoryPageUrlParamsT>();
  const { setParams } = useSetSearchParams<ProductInventoryPageUrlParamsT>();
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
  const { isAnyStockUpdated } = useInventoryUpdate();
  const genericStyles = useGenericStyles();

  const handleApply = (): void => {
  }

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
      <RnuiText variant='titleMedium'>{t('app:inventoryManagementDesc')}</RnuiText>

      <View style={genericStyles.flexRowReverse}>
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

        <RnuiButton testID='ApplyButtonTid'
          size='xs'
          disabled={!isAnyStockUpdated()}
          onPress={handleApply}
        >
          {t('app:apply')}
        </RnuiButton>
      </View>

      <ProductInventoryTable
        testID='ProductInventoryTableTid'
        productSummaries={data.productSummaries}
        imageSize={32}
      />
    </RnuiAppContent>
  );
};
