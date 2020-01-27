import { browser } from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener((): void => {
    console.log('extension installed');
});
