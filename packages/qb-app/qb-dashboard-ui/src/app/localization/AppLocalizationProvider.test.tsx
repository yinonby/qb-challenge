
import { jest } from '@jest/globals';
import * as ClientLogger from '@qb-dashboard-ui/logger/ClientLogger';
import { DEFAULT_QB_LANG_CODE, type AppTranslationKeyT, type QbLangCodeT } from '@qb/models';
import { __puiMocks } from '@qb/platform-ui';
import type { LoggerAdapter } from '@qb/utils';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { AppLocalizationProvider, langCodeStorageKey, useAppLocalization } from './AppLocalizationProvider';

// mocks

jest.unmock("./AppLocalizationProvider");

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('../error-handling/AppErrorPage', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    AppErrorPage: View,
  };
});

// tests

describe('AppLocalizationProvider', () => {
  const {
    mock_getStorageItem,
    mock_setStorageItem,
    mock_getDeviceLangCodeStr,
  } = __puiMocks;

  const spy_useClientLogger = jest.spyOn(ClientLogger, 'useClientLogger');
  spy_useClientLogger.mockReturnValue({
    error: jest.fn(),
  } as unknown as LoggerAdapter);

  // setup useTranslation mocks
  const mock_useTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;
  const mock_t = jest.fn((key: string) => `translated:${key}`);
  const mock_changeLanguage = jest.fn<() => Promise<void>>();

  mock_useTranslation.mockReturnValue({
    t: mock_t,
    i18n: {
      changeLanguage: mock_changeLanguage,
    },
  } as unknown as ReturnType<typeof useTranslation>);

  beforeEach(() => {
    jest.clearAllMocks();

    mock_setStorageItem.mockReset();
  });

  test('calls useTranslation and provides t that proxies to react-i18next t', async () => {
    const TestConsumer: React.FC = () => {
      const { t } = useAppLocalization();
      return <Text testID="out">{t('testKey' as AppTranslationKeyT)}</Text>;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    await waitFor(() => {
      expect(getByTestId('out').props.children).toBe('translated:testKey');
    });

    expect(mock_useTranslation).toHaveBeenCalled();
    expect(mock_t).toHaveBeenCalledWith('testKey', undefined);
  });

  test('initialized with default languageCode, no device language', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue(null);
    mock_getStorageItem.mockResolvedValue(null);

    let langCode!: QbLangCodeT;

    const TestConsumer: React.FC = () => {
      ({ langCode } = useAppLocalization());
      return <View testID='out'/>;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    await waitFor(() => {
      getByTestId('out');
    });

    expect(mock_getStorageItem).toHaveBeenCalled();
    expect(langCode).toEqual(DEFAULT_QB_LANG_CODE);
  });

  test('initialized with default languageCode, device language not supported', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('MOCK_DEVICE_LANG_NOT_SUPPORTED');
    mock_getStorageItem.mockResolvedValue(null);

    let langCode!: QbLangCodeT;

    const TestConsumer: React.FC = () => {
      ({ langCode } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    await waitFor(() => {
      getByTestId('out');
    });

    expect(mock_getStorageItem).toHaveBeenCalled();
    expect(langCode).toEqual(DEFAULT_QB_LANG_CODE);
  });

  test('initialized with device languageCode', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('en');
    mock_getStorageItem.mockResolvedValue(null);

    let langCode!: QbLangCodeT;

    const TestConsumer: React.FC = () => {
      ({ langCode } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    await waitFor(() => {
      getByTestId('out');
    });

    expect(mock_getStorageItem).toHaveBeenCalled();
    expect(langCode).toEqual('en');
  });

  test('initialized with stored langCode', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('en');
    mock_getStorageItem.mockResolvedValue('MOCK_STORED_LNG');

    let langCode!: QbLangCodeT;

    const TestConsumer: React.FC = () => {
      ({ langCode } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    await waitFor(() => {
      getByTestId('out');
    });

    // verify stored language is set
    expect(mock_getStorageItem).toHaveBeenCalled();
    expect(mock_changeLanguage).toHaveBeenCalledWith('MOCK_STORED_LNG');
    expect(langCode).toEqual('MOCK_STORED_LNG');
  });

  test('provides onLangCodeChange and handles language change', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('en');
    mock_getStorageItem.mockResolvedValue(null);

    let langCode!: QbLangCodeT;
    let onLangCodeChange!: (langCode: QbLangCodeT) => Promise<void>;

    const TestConsumer: React.FC = () => {
      ({ langCode, onLangCodeChange } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    // verify device language is set
    await waitFor(() => {
      getByTestId('out');
    });
    expect(langCode).toEqual('en');

    // change language
    await act(async () => {
      await onLangCodeChange('MOCKED_LNG' as QbLangCodeT);
    });

    // verify language was changed
    await waitFor(() => {
      expect(langCode).toEqual('MOCKED_LNG');
    });
    expect(mock_setStorageItem).toHaveBeenCalledWith(langCodeStorageKey, 'MOCKED_LNG');
    expect(mock_changeLanguage).toHaveBeenCalledWith('MOCKED_LNG');
  });

  test('provides onLangCodeChange and handles i18n failure', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('en');
    mock_getStorageItem.mockResolvedValue(null);
    mock_changeLanguage.mockRejectedValue('ERROR');
    mock_setStorageItem.mockRejectedValue('ERROR');

    let langCode!: QbLangCodeT;
    let onLangCodeChange!: (langCode: QbLangCodeT) => Promise<void>;

    const TestConsumer: React.FC = () => {
      ({ langCode, onLangCodeChange } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    // verify device language is set
    await waitFor(() => {
      getByTestId('out');
    });
    expect(langCode).toEqual('en');

    // change language
    act(() => {
      onLangCodeChange('MOCKED_LNG' as QbLangCodeT);
    });

    // verify language was changed
    await waitFor(() => {
      expect(langCode).toEqual('MOCKED_LNG');
    });

    // wait for changeLanguage to be called
    await waitFor(() => {
      expect(mock_changeLanguage).toHaveBeenCalledWith('MOCKED_LNG')
    });

    // wait for revert
    await waitFor(() => {
      expect(langCode).toEqual('en');
    });
    expect(mock_setStorageItem).not.toHaveBeenCalled();
  });

  test('provides onLangCodeChange and handles storage failure', async () => {
    // setup mocks
    mock_getDeviceLangCodeStr.mockReturnValue('en');
    mock_getStorageItem.mockResolvedValue(null);
    mock_changeLanguage.mockImplementation(async () => {});
    mock_setStorageItem.mockRejectedValue('ERROR');

    let langCode!: QbLangCodeT;
    let onLangCodeChange!: (langCode: QbLangCodeT) => Promise<void>;

    const TestConsumer: React.FC = () => {
      ({ langCode, onLangCodeChange } = useAppLocalization());
      return <View testID='out' />;
    };

    const { getByTestId, findByTestId } = render(
      <AppLocalizationProvider>
        <TestConsumer />
      </AppLocalizationProvider>
    );

    // verify device language is set
    await waitFor(() => {
      getByTestId('out');
    });
    expect(langCode).toEqual('en');

    // change language
    act(() => {
      onLangCodeChange('MOCKED_LNG' as QbLangCodeT);
    });

    // verify language was changed
    await waitFor(() => {
      expect(langCode).toEqual('MOCKED_LNG');
    });

    // wait for changeLanguage to be called
    await waitFor(() => {
      expect(mock_changeLanguage).toHaveBeenCalledWith('MOCKED_LNG')
    });

    // wait for changeLanguage to be called
    await waitFor(() => {
      expect(mock_setStorageItem).toHaveBeenCalledWith(langCodeStorageKey, 'MOCKED_LNG')
    });

    // wait for error page
    await findByTestId('AppErrorPageTid');
  });
});
