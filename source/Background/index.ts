import browser from 'webextension-polyfill';
import {ExtensionMessage} from '../types/messages';

browser.runtime.onInstalled.addListener((): void => {
  console.log('extension installed');
});

// Listen for messages from popup or content scripts
browser.runtime.onMessage.addListener((message: unknown): void => {
  const msg = message as ExtensionMessage;
  console.log('Background received message:', msg.type);
});
