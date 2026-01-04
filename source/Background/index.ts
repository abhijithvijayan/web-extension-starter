/**
 * Background Script (Service Worker in Chrome MV3)
 *
 * This script runs in the background and acts as a central hub for
 * communication between different parts of the extension.
 *
 * Communication Flow:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                       BACKGROUND SCRIPT                             │
 * │                                                                     │
 * │  Content Script ──PAGE_VISITED──► Background                        │
 * │    (page loaded)                   │                                │
 * │                                    ▼                                │
 * │                            Increment visitCount                     │
 * │                            in browser.storage                       │
 * │                                                                     │
 * │  Popup ──GET_VISIT_COUNT──► Background                              │
 * │                               │                                     │
 * │                               ▼                                     │
 * │                         Read visitCount                             │
 * │                         from storage                                │
 * │                               │                                     │
 * │  Popup ◄──VISIT_COUNT_RESPONSE──┘                                   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Message Types:
 * - PAGE_VISITED (incoming from content): A page was visited
 * - GET_VISIT_COUNT (incoming from popup): Request for total visit count
 * - VISIT_COUNT_RESPONSE (outgoing to popup): Response with visit count
 */

import browser from 'webextension-polyfill';
import {ExtensionMessage, VisitCountResponseMessage} from '../types/messages';
import {getStorage, setStorage} from '../utils/storage';

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed');
});

// Listen for messages from popup or content scripts
browser.runtime.onMessage.addListener(
  (message: unknown): Promise<VisitCountResponseMessage> | undefined => {
    const msg = message as ExtensionMessage;

    // Content script notifies us when a page is visited
    if (msg.type === 'PAGE_VISITED') {
      console.log('Page visited:', msg.data.title, '-', msg.data.url);
      console.log(
        `  Words: ${msg.data.wordCount}, Links: ${msg.data.linkCount}, Images: ${msg.data.imageCount}`
      );

      // Increment visit count
      getStorage(['visitCount']).then(({visitCount}) => {
        setStorage({visitCount: visitCount + 1});
      });

      return undefined;
    }

    // Popup requests the visit count
    if (msg.type === 'GET_VISIT_COUNT') {
      return getStorage(['visitCount']).then(({visitCount}) => {
        return {
          type: 'VISIT_COUNT_RESPONSE',
          count: visitCount,
        };
      });
    }

    return undefined;
  }
);
