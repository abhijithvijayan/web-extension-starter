/**
 * Content Script
 *
 * This script is injected into every web page that matches the patterns
 * defined in manifest.json's content_scripts section.
 *
 * Communication Flow:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                         CONTENT SCRIPT                              │
 * │                                                                     │
 * │  1. Page loads → Collects page stats → Sends PAGE_VISITED to       │
 * │     background script                                               │
 * │                                                                     │
 * │  2. Popup requests GET_PAGE_INFO → Content script responds with    │
 * │     PAGE_INFO_RESPONSE containing current page stats               │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Message Types:
 * - PAGE_VISITED (outgoing to background): Notify that a page was loaded
 * - GET_PAGE_INFO (incoming from popup): Request for current page stats
 * - PAGE_INFO_RESPONSE (outgoing to popup): Response with page stats
 */

import browser from 'webextension-polyfill';
import {
  ExtensionMessage,
  PageInfo,
  PageInfoResponseMessage,
} from '../types/messages';
import {getStorage} from '../utils/storage';

// Collect page information (word count, links, images)
function getPageInfo(): PageInfo {
  const bodyText = document.body?.innerText || '';
  const wordCount = bodyText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const linkCount = document.querySelectorAll('a').length;
  const imageCount = document.querySelectorAll('img').length;

  return {
    url: window.location.href,
    title: document.title,
    wordCount,
    linkCount,
    imageCount,
    timestamp: Date.now(),
  };
}

// Listen for messages from popup or background
browser.runtime.onMessage.addListener(
  (message: unknown): Promise<PageInfoResponseMessage> | undefined => {
    const msg = message as ExtensionMessage;

    if (msg.type === 'GET_PAGE_INFO') {
      return Promise.resolve({
        type: 'PAGE_INFO_RESPONSE',
        data: getPageInfo(),
      });
    }

    return undefined;
  }
);

// Notify background script when page loads
function notifyPageVisit(): void {
  const pageInfo = getPageInfo();

  browser.runtime
    .sendMessage({
      type: 'PAGE_VISITED',
      data: pageInfo,
    })
    .catch(() => {
      // Background script might not be ready yet, ignore error
    });
}

// Wait for page to fully load before collecting info
if (document.readyState === 'complete') {
  notifyPageVisit();
} else {
  window.addEventListener('load', notifyPageVisit);
}

// Log when content script loads (if logging is enabled)
getStorage(['enableLogging']).then(({enableLogging}) => {
  if (enableLogging) {
    console.log(
      '[Web Extension Starter] Content script loaded on:',
      window.location.href
    );
  }
});
