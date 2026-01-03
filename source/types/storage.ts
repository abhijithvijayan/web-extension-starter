export interface StorageSchema {
  username: string;
  enableLogging: boolean;
}

export const defaultStorage: StorageSchema = {
  username: '',
  enableLogging: false,
};
