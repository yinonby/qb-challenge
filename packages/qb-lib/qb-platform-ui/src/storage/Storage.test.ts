
import * as PlatformUtils from '../platform/PlatformUtils';
import type { StorageAdapter } from '../types/StorageTypes';
import { useStorage } from './Storage';

const mock_getStorageItem = jest.fn();
const mock_setStorageItem = jest.fn();
const mock_removeItem = jest.fn();
const mock_AsyncStorage = {
  getItem: mock_getStorageItem,
  setItem: mock_setStorageItem,
  removeItem: mock_removeItem,
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: mock_AsyncStorage,
}));

describe('useStorage', () => {
  const isWebSpy = jest.spyOn(PlatformUtils, "isWeb");
  let storageMap: Map<string, string> = new Map<string, string>();

  mock_getStorageItem.mockImplementation((key: string) => storageMap.get(key) === undefined ? null : storageMap.get(key));
  mock_setStorageItem.mockImplementation((key: string, value: string) => { storageMap.set(key, value); });
  mock_removeItem.mockImplementation((key: string) => { storageMap.delete(key); });

  beforeEach(() => {
    storageMap = new Map<string, string>();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('web platform', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).localStorage = {
      getItem: mock_getStorageItem,
      setItem: mock_setStorageItem,
      removeItem: mock_removeItem,
    };

    beforeEach(() => {
      isWebSpy.mockReturnValue(true);
    });

    it('uses localStorage on web', async () => {
      const storage: StorageAdapter = useStorage();

      await storage.setStorageItem('key', 'value');
      expect(mock_setStorageItem).toHaveBeenCalledTimes(1);

      const result = await storage.getStorageItem('key');
      expect(mock_getStorageItem).toHaveBeenCalledTimes(1);
      expect(result).toBe('value');

      await storage.removeStorageItem('key');
      expect(mock_removeItem).toHaveBeenCalledTimes(1);
      const result2 = await storage.getStorageItem('key');
      expect(result2).toBe(null);
    });

    it('returns null on getStorageItem during SSR', async () => {
      const originalWindow = global.window;
      // @ts-expect-error temp delete non-optional to simulate this case
      delete global.window;

      const storage = useStorage();

      await storage.setStorageItem('key', 'value');
      expect(mock_setStorageItem).not.toHaveBeenCalled();

      const result = await storage.getStorageItem('key');
      expect(mock_getStorageItem).not.toHaveBeenCalled();
      expect(result).toBeNull();

      await storage.removeStorageItem('key');
      expect(mock_removeItem).not.toHaveBeenCalled();

      global.window = originalWindow;
    });
  });

  describe('native platform', () => {
    beforeEach(() => {
      isWebSpy.mockReturnValue(false);
      storageMap = new Map<string, string>();
    });

    it('uses AsyncStorage on native', async () => {
      isWebSpy.mockReturnValue(false);

      const storage = useStorage();

      await storage.getStorageItem('KEY1');
      expect(mock_getStorageItem).toHaveBeenCalledWith('KEY1');

      await storage.setStorageItem('KEY1', 'VAL1');
      expect(mock_setStorageItem).toHaveBeenCalledWith('KEY1', 'VAL1');

      await storage.removeStorageItem('KEY1');
      expect(mock_removeItem).toHaveBeenCalledWith('KEY1');
    });
  });
});
