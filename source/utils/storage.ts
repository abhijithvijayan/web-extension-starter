import browser from 'webextension-polyfill';
import {StorageSchema, defaultStorage} from '../types/storage';

export async function getStorage<K extends keyof StorageSchema>(
  keys: K[]
): Promise<Pick<StorageSchema, K>> {
  const result = await browser.storage.local.get(keys);

  const output = {} as Pick<StorageSchema, K>;
  for (const key of keys) {
    output[key] = (result[key] as StorageSchema[K]) ?? defaultStorage[key];
  }

  return output;
}

export async function setStorage<K extends keyof StorageSchema>(
  items: Pick<StorageSchema, K>
): Promise<void> {
  await browser.storage.local.set(items);
}

export async function getAllStorage(): Promise<StorageSchema> {
  const result = await browser.storage.local.get(null);

  return {
    ...defaultStorage,
    ...result,
  };
}
