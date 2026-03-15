
import { useAppErrorHandling } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { useDashboard } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductController } from '@qb-dashboard-ui/domains/product/controller/ProductController';
import { type ProductsPageModelDataT } from '@qb-dashboard-ui/domains/product/model/ProductsPageModel';
import type { UpdateProductStockInfoT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { buildAvailabilityOption, type ProductInventoryPageUrlParamsT } from '@qb-dashboard-ui/types/UrlDefs';
import { productSummariesToCsv, type AvailabilityOptionT } from '@qb/models';
import { exportTextFileAsync, isWeb, usePlatformUiDeviceLocale, useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiAppContent, RnuiButton, RnuiIconButton, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { PaginationControl } from '../../../common/PaginationControl';
import { ClearFilterButton } from '../../common/ClearFilterButton';
import { useInventoryUpdate } from '../context/InventoryUpdateProvider';
import { ProductInventoryTable } from './ProductInventoryTable';
import { FiltersButton } from './filters/FiltersButton';

type InventoryViewPropsT = TestableComponentT & {
  data: ProductsPageModelDataT,
}

export const InventoryView: FC<InventoryViewPropsT> = (props) => {
  const { data } = props;
  const { productsPerPage } = useDashboard();
  const { t } = useAppLocalization();
  const searchParams = useSearchParams<ProductInventoryPageUrlParamsT>();
  const { setParams } = useSetSearchParams<ProductInventoryPageUrlParamsT>();
  const { pageNumStr, category, availabilityMinStr, availabilityMaxStr, sort } = searchParams;
  const pageNum = pageNumStr === undefined ? 0 : parseInt(pageNumStr);
  const availability: AvailabilityOptionT | undefined = buildAvailabilityOption(availabilityMinStr, availabilityMaxStr);
  const { isAnyStockUpdated, clearAllStockUpdates, getAllStockUpdates } = useInventoryUpdate();
  const genericStyles = useGenericStyles();
  const { onUpdateProductBatch } = useProductController();
  const { onUnknownError, onAppError } = useAppErrorHandling();
  const { langTag, timeZone } = usePlatformUiDeviceLocale();

  const handleUpdateAll = async (): Promise<void> => {
    const stockEdits = getAllStockUpdates();
    const updateProductStockInfos: UpdateProductStockInfoT[] = stockEdits.map(e => ({
      productId: e.productId,
      newStock: e.newStock,
      reason: e.reason,
    }));

    try {
      const response = await onUpdateProductBatch(updateProductStockInfos);
      if (response.errors.length) {
        onAppError('appClientError:someProductsNotUpdated');
      }
    } catch (error: unknown) {
      onUnknownError(error);
    }
    clearAllStockUpdates(); // clear stock edits no matter what
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

  const handleApplyFilters = (): void => {
    clearAllStockUpdates();
  };

  const handleClearFilters = (): void => {
    clearAllStockUpdates();
  };

  const handleExportToCsv = async (): Promise<void> => {
    const csvStr = productSummariesToCsv(data.productSummaries, langTag, timeZone);
    await exportTextFileAsync('data.csv', csvStr);
  }

  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      <RnuiText variant='titleMedium'>{t('app:inventoryManagementDesc')}</RnuiText>

      <View style={genericStyles.flexRow}>
        <FiltersButton testID='FiltersButtonTid' onApply={handleApplyFilters} />

        <ClearFilterButton testID='ClearFilterButtonTid' onClear={handleClearFilters}/>

        {isWeb() &&
          <RnuiIconButton testID='ExportToCsvButton' icon='file' size='xs' onPress={handleExportToCsv} />
        }

        <View style={genericStyles.flex1} />

        <RnuiButton
          testID='ApplyButtonTid'
          size='xs'
          disabled={!isAnyStockUpdated()}
          onPress={handleUpdateAll}
        >
          {t('app:applyAll')}
        </RnuiButton>

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

      <ProductInventoryTable
        testID='ProductInventoryTableTid'
        productSummaries={data.productSummaries}
        imageSize={32}
      />
    </RnuiAppContent>
  );
};
