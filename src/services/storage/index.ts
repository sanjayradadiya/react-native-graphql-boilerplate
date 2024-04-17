import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const Storage = {
  setItem: (key: string, value: string | number | boolean) => {
    try {
      storage.set(`${key}`, `${value}`);
    } catch (error) {
      console.error('Error setting user preferences:', error);
    }
  },
  getItem: (key: string, type?: 'string' | 'number' | 'boolean') => {
    try {
      switch (type) {
        case 'string':
          return storage.getString(key);
        case 'number':
          return storage.getNumber(key);
        case 'boolean':
          return storage.getBoolean(key);

        default:
          return storage.getString(key);
      }
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null; // Or handle the error according to your application's logic
    }
  },
  removeItem: (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },

  clearAll: () => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
