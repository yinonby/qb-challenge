
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { availabilityOptions, type AvailabilityOptionT } from '@qb/models';
import { RnuiRadioButtonGroup, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC, type ReactNode } from 'react';

type AvailabilitySelectOptionT = AvailabilityOptionT | 'all';

type AvailabilitySelectPropsT = TestableComponentT & {
  value: AvailabilityOptionT | undefined,
  onChange: (newValue: AvailabilityOptionT | undefined) => void,
}

export const AvailabilitySelect: FC<AvailabilitySelectPropsT> = (props) => {
  const { value, onChange } = props;
  const { t } = useAppLocalization();
  const options: AvailabilitySelectOptionT[] = ['all', ...availabilityOptions];

  const handleChange = (newOption: AvailabilitySelectOptionT): void => {
    if (newOption === 'all') {
      onChange(undefined);
    } else {
      onChange(newOption);
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
      selectedOptionKey={value ?? 'all'}
      onChange={handleChange}
      renderOption={renderOption}
    />
  );
};
