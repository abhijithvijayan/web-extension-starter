export interface StorageSchema {
  username: string;
  enableLogging: boolean;
  visitCount: number;
}

export const defaultStorage: StorageSchema = {
  username: '',
  enableLogging: false,
  visitCount: 0,
};
