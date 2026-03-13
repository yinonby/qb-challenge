
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { DEFAULT_SORT_OPTION, type AvailabilityOptionT, type ProductCategoryT, type SortT } from '@qb/models';
import { useSearchParams } from '@qb/platform-ui';
import { RnuiButton, RnuiGrid, RnuiGridItem, RnuiText, type TestableComponentT } from '@qb/rnui';
import { default as React, useState, type FC } from 'react';
import { View } from 'react-native';
import type { ProductListingPageUrlParamsT } from '../../../../types/UrlDefs';
import { AvailabilitySelect } from './AvailabilitySelect';
import { CategorySelect } from './CategorySelect';
import { SortSelect } from './SortSelect';

type FiltersViewPropsT = TestableComponentT & {
  onApply: (
    category: ProductCategoryT | undefined,
    availability: AvailabilityOptionT | undefined,
    sort: SortT | undefined,
  ) => void,
}

export const FiltersView: FC<FiltersViewPropsT> = (props) => {
  const { onApply } = props;
  const { category, availability, sort } = useSearchParams<ProductListingPageUrlParamsT>();
  const { t } = useAppLocalization();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryT | undefined>(category);
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityOptionT | undefined>(availability);
  const sortParam = sort || DEFAULT_SORT_OPTION;
  const [selectedSort, setSelectedSort] = useState<SortT>(sortParam);
  const genericStyles = useGenericStyles();
  const spacing = 8;
  const marginCompensation = spacing / 2;

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
    onApply(selectedCategory, selectedAvailability, selectedSort);
  }

  const isChanged = (): boolean => {
    return category !== selectedCategory || availability !== selectedAvailability || sortParam !== selectedSort;
  }

  return (
    <View style={{ margin: marginCompensation }}>
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
          <AvailabilitySelect
            testID='AvailabilitySelectTid'
            value={selectedAvailability}
            onChange={handleAvailabilityChange}
          />
        </RnuiGridItem>
      </RnuiGrid>

      <View style={genericStyles.flexRowReverse}>
        <RnuiButton testID='ApplyButtonTid'
          size='xs'
          disabled={!isChanged()}
          onPress={handleApply}
        >{t('app:apply')}</RnuiButton>
      </View>
    </View>
  );
};
