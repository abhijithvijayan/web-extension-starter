import { browser } from "webextension-polyfill-ts";

export default class Settings {
    static async get(key: string): Promise<any> {
        let storage = await browser.storage.local.get(key);

        return storage[key] ?? null;
    }

    static async set(key: string, value: any) {
        await browser.storage.local.set({ [key]: value });
    }
}
