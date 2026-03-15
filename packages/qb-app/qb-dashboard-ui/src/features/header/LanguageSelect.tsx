
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { qbLangCodes, type QbLangCodeT } from '@qb/models';
import { RnuiRadioButtonGroup, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC, type ReactNode } from 'react';

type LanguageSelectOptionT = QbLangCodeT;

export const LanguageSelect: FC<TestableComponentT> = () => {
  const { langCode, onLangCodeChange } = useAppLocalization();
  const options: LanguageSelectOptionT[] = qbLangCodes;

  const handleChange = async (newOption: LanguageSelectOptionT): Promise<void> => {
    await onLangCodeChange(newOption);
  }

  const renderOption = (option: LanguageSelectOptionT): ReactNode => {
    if (option === 'en') {
      return <RnuiText>{'English'}</RnuiText>;
    } else if (option === 'fr') {
      return <RnuiText>{'Française'}</RnuiText>;
    } else {
      return null;
    }
  }

  return (
    <RnuiRadioButtonGroup<LanguageSelectOptionT>
      testID='RnuiRadioButtonGroupTid'
      optionKeys={options}
      selectedOptionKey={langCode}
      onChange={handleChange}
      renderOption={renderOption}
    />
  );
};
