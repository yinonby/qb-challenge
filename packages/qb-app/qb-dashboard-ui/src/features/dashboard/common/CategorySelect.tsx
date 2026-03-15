
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { productCategories, productCategoryToTranslationKeyMap, type ProductCategoryT } from '@qb/models';
import { RnuiRadioButtonGroup, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC, type ReactNode } from 'react';

type CategorySelectOptionT = ProductCategoryT | 'all';

type CategorySelectPropsT = TestableComponentT & {
  value: ProductCategoryT | undefined,
  onChange: (newValue: ProductCategoryT | undefined) => void,
}

export const CategorySelect: FC<CategorySelectPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();
  const options: CategorySelectOptionT[] = ['all', ...productCategories];

  const handleChange = (newOption: CategorySelectOptionT): void => {
    if (newOption === 'all') {
      onChange(undefined);
    } else {
      onChange(newOption);
    }
  }

  const renderOption = (option: CategorySelectOptionT): ReactNode => {
    if (option === 'all') {
      return <RnuiText>{t('app:all')}</RnuiText>;
    }
    const categoryTranslationKey = productCategoryToTranslationKeyMap[option];
    return <RnuiText>{t(categoryTranslationKey)}</RnuiText>;
  }

  return (
    <RnuiRadioButtonGroup<CategorySelectOptionT>
      testID='RnuiRadioButtonGroupTid'
      optionKeys={options}
      selectedOptionKey={value || 'all'}
      onChange={handleChange}
      renderOption={renderOption}
    />
  );
};
