
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { AvailabilityRangeSelect } from '@qb-dashboard-ui/features/dashboard/common/AvailabilityRangeSelect';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT, type ProductCategoryT, type SortT } from '@qb/models';
import { useSearchParams, useSetSearchParams } from '@qb/platform-ui';
import { RnuiButton, RnuiGrid, RnuiGridItem, RnuiText, useRnuiSnackbar, type TestableComponentT } from '@qb/rnui';
import { default as React, useState, type FC } from 'react';
import { ScrollView, View } from 'react-native';
import { buildAvailabilityOption, type ProductListingPageUrlParamsT } from '../../../../../types/UrlDefs';
import { CategorySelect } from '../../../common/CategorySelect';
import { SortSelect } from '../../../common/SortSelect';

type FiltersViewPropsT = TestableComponentT & {
  onApply?: () => void,
}

export const FiltersView: FC<FiltersViewPropsT> = (props) => {
  const { onApply } = props;
  const { category, availabilityMinStr, availabilityMaxStr, sort } = useSearchParams<ProductListingPageUrlParamsT>();
  const { t } = useAppLocalization();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryT | undefined>(category);
  const availability: AvailabilityOptionT | undefined = buildAvailabilityOption(availabilityMinStr, availabilityMaxStr);
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityOptionT | undefined>(availability);
  const sortParam = sort || DEFAULT_SORT_OPTION;
  const [selectedSort, setSelectedSort] = useState<SortT>(sortParam);
  const genericStyles = useGenericStyles();
  const spacing = 8;
  const marginCompensation = spacing / 2;
  const { setParams } = useSetSearchParams<ProductListingPageUrlParamsT>();
  const { onShowSnackbar } = useRnuiSnackbar();

  const handleCategoryChange = (newValue: ProductCategoryT | undefined): void => {
    setSelectedCategory(newValue);
  }

  const handleAvailabilityChange = (newValue: AvailabilityOptionT | undefined): void => {
    setSelectedAvailability(newValue);
  }

  const handleSortChange = (newValue: SortT): void => {
    setSelectedSort(newValue);
  }

  const handleApply = (): void => {
    if (selectedAvailability?.minStock !== undefined && selectedAvailability?.maxStock !== undefined) {
      if (selectedAvailability.minStock > selectedAvailability.maxStock) {
        onShowSnackbar({
          message: t('appClientError:invalidRange'),
          level: 'warn',
          withCloseButton: true,
        });
        return;
      }
    }

    const newPageNum = 0; // we must reset the page number when filters are changed

    setParams({
      pageNumStr: newPageNum.toString(),
      category: selectedCategory,
      availabilityMinStr: selectedAvailability?.minStock?.toString(),
      availabilityMaxStr: selectedAvailability?.maxStock?.toString(),
      sort: selectedSort,
    });

    if (onApply) {
      onApply();
    }
  }

  const isChanged = (): boolean => {
    return category !== selectedCategory || availability !== selectedAvailability || sortParam !== selectedSort;
  }

  return (
    <View style={[{ margin: marginCompensation }, genericStyles.flex1]}>
      <ScrollView>
        <RnuiGrid spacing={spacing}>
          <RnuiGridItem xs={12} sm={12} md={4} lg={4} xl={4}>
            <RnuiText variant='titleSmall'>{t('app:sort')}</RnuiText>
            <SortSelect testID='SortSelectTid' value={selectedSort} onChange={handleSortChange} />
          </RnuiGridItem>

          <RnuiGridItem xs={12} sm={12} md={4} lg={4} xl={4}>
            <RnuiText variant='titleSmall'>{t('app:category')}</RnuiText>
            <CategorySelect testID='CategorySelectTid' value={selectedCategory} onChange={handleCategoryChange} />
          </RnuiGridItem>

          <RnuiGridItem xs={12} sm={12} md={4} lg={4} xl={4}>
            <RnuiText variant='titleSmall'>{t('app:availability')}</RnuiText>
            <AvailabilityRangeSelect
              testID='AvailabilityRangeSelectTid'
              value={selectedAvailability}
              onChange={handleAvailabilityChange}
            />
          </RnuiGridItem>
        </RnuiGrid>
      </ScrollView>

      <View style={genericStyles.flex1}/>

      <View style={genericStyles.flexRowReverse}>
        <RnuiButton
          testID='ApplyButtonTid'
          size='xs'
          disabled={!isChanged()}
          onPress={handleApply}
        >{t('app:apply')}</RnuiButton>
      </View>
    </View>
  );
};
