
import { render } from '@testing-library/react-native';
import type { Router } from 'expo-router';
import * as ExpoRouter from 'expo-router';
import { usePlatformUiNavigation, useSearchParams, useSetSearchParams, type PlatformUiNavigationT } from './PlatformUiNavigationProvider';

describe('PlatformUiNavigationProvider', () => {
  const spy_useRouter = jest.spyOn(ExpoRouter, 'useRouter');

  const mock_navigate = jest.fn();
  const mock_replace = jest.fn();
  const mock_setParams = jest.fn();
  spy_useRouter.mockReturnValue({
    navigate: mock_navigate,
    replace: mock_replace,
    setParams: mock_setParams,
  } as unknown as Router);

  type SearchParamsT = { name: string };
  const spy_useGlobalSearchParams = jest.spyOn(ExpoRouter, 'useGlobalSearchParams');
  const mock_searchParams: SearchParamsT = { name: 'MOCK' };
  spy_useGlobalSearchParams.mockReturnValue(mock_searchParams);

  describe('usePlatformUiNavigation', () => {
    it('returns the exact config object', () => {
      let contextValue: PlatformUiNavigationT | undefined;

      const TestConsumer: React.FC = () => {
        contextValue = usePlatformUiNavigation();
        return null;
      };

      render(<TestConsumer />);

      expect(contextValue).toBeTruthy();

      contextValue?.navigate('');
      expect(mock_navigate).toHaveBeenCalled();

      contextValue?.navigateReplace('');
      expect(mock_replace).toHaveBeenCalled();
    });
  });

  describe('useSearchParams', () => {
    it('returns the exact config object', () => {
      let contextValue: SearchParamsT | undefined;

      const TestConsumer: React.FC = () => {
        contextValue = useSearchParams<SearchParamsT>();
        return null;
      };

      render(<TestConsumer />);

      expect(contextValue).toEqual(mock_searchParams);
    });
  });

  describe('useSetSearchParams', () => {
    it('returns the exact config object', () => {
      let contextValue: { setParams: (params: Partial<SearchParamsT>) => void } | undefined;

      const TestConsumer: React.FC = () => {
        contextValue = useSetSearchParams<SearchParamsT>();
        return null;
      };

      render(<TestConsumer />);

      contextValue?.setParams({ name: 'MOCK2' });

      expect(mock_setParams).toHaveBeenCalledWith({ name: 'MOCK2' });
    });
  });
});
