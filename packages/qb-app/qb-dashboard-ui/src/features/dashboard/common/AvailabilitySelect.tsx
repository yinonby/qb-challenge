
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { type AvailabilityOptionT } from '@qb/models';
import { RnuiRadioButtonGroup, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC, type ReactNode } from 'react';

const _availabilitySelectOptions = ['all', 'inStock', 'outOfStock'] as const;
export type AvailabilitySelectOptionT = typeof _availabilitySelectOptions[number];
export const availabilitySelectOptions: AvailabilitySelectOptionT[] = [..._availabilitySelectOptions];

type AvailabilitySelectPropsT = TestableComponentT & {
  value: AvailabilityOptionT | undefined,
  onChange: (newValue: AvailabilityOptionT | undefined) => void,
}

export const AvailabilitySelect: FC<AvailabilitySelectPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();
  const options: AvailabilitySelectOptionT[] = availabilitySelectOptions;

  const handleChange = (newOption: AvailabilitySelectOptionT): void => {
    if (newOption === 'all') {
      onChange(undefined);
    } else if (newOption === 'inStock') {
      onChange({ // min 1 product in stock
        minStock: 1,
        maxStock: undefined,
      });
    } else {
      onChange({ // no products in stock
        minStock: undefined,
        maxStock: 0,
      });
    }
  }

  const renderOption = (option: AvailabilitySelectOptionT): ReactNode => {
    if (option === 'all') {
      return <RnuiText>{t('app:all')}</RnuiText>;
    } else if (option === 'inStock') {
      return <RnuiText>{t('app:inStock')}</RnuiText>;
    } else {
      return <RnuiText>{t('app:outOfStock')}</RnuiText>;
    }
  }

  return (
    <RnuiRadioButtonGroup<AvailabilitySelectOptionT>
      testID='RnuiRadioButtonGroupTid'
      optionKeys={options}
      selectedOptionKey={value === undefined ? 'all' : value.minStock === 1 ? 'inStock' : 'outOfStock'}
      onChange={handleChange}
      renderOption={renderOption}
    />
  );
};
