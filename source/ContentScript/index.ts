import browser from 'webextension-polyfill';
import {ExtensionMessage, PongMessage} from '../types/messages';
import {getStorage} from '../utils/storage';

// Listen for messages from popup or background
browser.runtime.onMessage.addListener(
  (message: unknown): Promise<PongMessage> | undefined => {
    const msg = message as ExtensionMessage;

    if (msg.type === 'PING') {
      return Promise.resolve({
        type: 'PONG',
        timestamp: Date.now(),
      });
    }

    return undefined;
  }
);

// Log when content script loads (if logging is enabled)
getStorage(['enableLogging']).then(({enableLogging}) => {
  if (enableLogging) {
    console.log('[Web Extension Starter] Content script loaded on:', window.location.href);
  }
});
