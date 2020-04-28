import 'unicorn.log';
import {browser} from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener((): void => {
  console.unicorn('extension installed');
});
