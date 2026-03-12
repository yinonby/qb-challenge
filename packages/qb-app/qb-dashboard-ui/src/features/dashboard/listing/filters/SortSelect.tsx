
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { sortOptionToTranslationKeyMap, sortOptions, type SortT } from '@qb/models';
import { RnuiRadioButtonGroup, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC, type ReactNode } from 'react';

type SortSelectOptionT = SortT;

type SortSelectPropsT = TestableComponentT & {
  value: SortT,
  onChange: (newValue: SortT) => void,
}

export const SortSelect: FC<SortSelectPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();
  const options: SortSelectOptionT[] = sortOptions;

  const handleChange = (newOption: SortSelectOptionT): void => {
    onChange(newOption);
  }

  const renderOption = (option: SortSelectOptionT): ReactNode => {
    const sortTranslationKey = sortOptionToTranslationKeyMap[option];
    return <RnuiText>{t(sortTranslationKey)}</RnuiText>;
  }

  return (
    <RnuiRadioButtonGroup<SortSelectOptionT>
      testID='RnuiRadioButtonGroupTid'
      optionKeys={options}
      selectedOptionKey={value}
      onChange={handleChange}
      renderOption={renderOption}
    />
  );
};
