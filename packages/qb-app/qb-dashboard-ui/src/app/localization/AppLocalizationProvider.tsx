
import { useClientLogger } from '@qb-dashboard-ui/logger/ClientLogger';
import { DEFAULT_QB_LANG_CODE, qbLangCodes, type AppTranslationKeyT, type QbLangCodeT } from '@qb/models';
import { usePlatformUiLocalization, useStorage } from '@qb/platform-ui';
import type { TestableComponentT } from '@qb/rnui';
import type { TOptions } from 'i18next';
import React, { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { AppErrorPage } from '../error-handling/AppErrorPage';

export const langCodeStorageKey = 'langCodeKey';

export interface AppLocalizationContextT {
  langCode: QbLangCodeT;
  onLangCodeChange: (newLangCode: QbLangCodeT) => Promise<void>;
  t: (tKey: AppTranslationKeyT, options?: TOptions) => string;
}

const AppLocalizationContext = createContext<AppLocalizationContextT | undefined>(undefined);

export const AppLocalizationProvider: React.FC<PropsWithChildren<TestableComponentT>> = (props) => {
  const { children } = props;
  const { t: _t, i18n } = useTranslation();
  const { getDeviceLangCodeStr } = usePlatformUiLocalization();
  const { getStorageItem, setStorageItem } = useStorage();
  const deviceLangCodeStr = getDeviceLangCodeStr();
  const initialLangCode: QbLangCodeT = deviceLangCodeStr === null ? DEFAULT_QB_LANG_CODE :
    (qbLangCodes.includes(deviceLangCodeStr as QbLangCodeT) ? deviceLangCodeStr as QbLangCodeT : DEFAULT_QB_LANG_CODE);
  const [isInitialized, setIsInitialized] = useState(false);
  const [langCode, setLangCode] = useState(initialLangCode);
  const logger = useClientLogger();
  const [isError, setIsError] = useState(false);

  const t = (tKey: AppTranslationKeyT, options?: TOptions): string => {
    return _t(tKey, options);
  }

  const handleLangCodeChange = async (newLangCode: QbLangCodeT): Promise<void> => {
    const curLangCode = langCode

    setLangCode(newLangCode); // optimistic update

    try {
      await i18n.changeLanguage(newLangCode);
    } catch (error: unknown) {
      logger.error('Unexpected error when updating language, reverting', error);
      setLangCode(curLangCode);
      return;
    }

    try {
      await setStorageItem(langCodeStorageKey, newLangCode);
    } catch (error: unknown) {
      logger.error('Unexpected error when updating language, cannot recover', error);
      setIsError(true);
    }
  }

  const value: AppLocalizationContextT = {
    langCode: langCode,
    onLangCodeChange: handleLangCodeChange,
    t: t,
  }

  useEffect(() => {
    if (!isInitialized) {
      (async (): Promise<void> => {
        const storedLangCode: string | null = await getStorageItem(langCodeStorageKey);
        if (storedLangCode !== null) {
          setLangCode(storedLangCode as QbLangCodeT);
          await i18n.changeLanguage(storedLangCode);
        }
        setIsInitialized(true);
      })();
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return null;
  }

  if (isError) {
    return <AppErrorPage testID='AppErrorPageTid' />;
  }

  return (
    <AppLocalizationContext.Provider value={value}>
      {children}
    </AppLocalizationContext.Provider>
  );
};

export const useAppLocalization = (): AppLocalizationContextT =>
  useContext(AppLocalizationContext) as AppLocalizationContextT;

