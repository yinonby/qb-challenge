
import { isWeb } from '../platform/PlatformUtils';
import type { StorageAdapter } from '../types/StorageTypes';

export const useStorage = (): StorageAdapter => {
  if (isWeb()) {
    return {
      async getStorageItem(key) {
        if (typeof window === 'undefined') return null;
        return window.localStorage.getItem(key);
      },

      async setStorageItem(key, value) {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, value);
      },

      async removeStorageItem(key) {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
      },
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const asyncStorage = require('@react-native-async-storage/async-storage').default;

    return {
      async getStorageItem(key) {
        return await asyncStorage.getItem(key);
      },

      async setStorageItem(key, value) {
        return await asyncStorage.setItem(key, value);
      },

      async removeStorageItem(key) {
        return await asyncStorage.removeItem(key);
      },
    };
  }
}
