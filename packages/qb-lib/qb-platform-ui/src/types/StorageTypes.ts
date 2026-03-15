
export interface StorageAdapter {
  getStorageItem(key: string): Promise<string | null>;
  setStorageItem(key: string, value: string): Promise<void>;
  removeStorageItem(key: string): Promise<void>;
};
