/**
 * Extension Message Types
 *
 * This file defines all message types used for communication between
 * the different parts of the extension.
 *
 * Overall Communication Architecture:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                         │
 * │   ┌──────────────┐     PAGE_VISITED      ┌──────────────────┐           │
 * │   │              │ ───────────────────►  │                  │           │
 * │   │   Content    │                       │    Background    │           │
 * │   │   Script     │                       │    Script        │           │
 * │   │              │                       │                  │           │
 * │   └──────────────┘                       └──────────────────┘           │
 * │          ▲                                        ▲                     │
 * │          │ GET_PAGE_INFO                          │ GET_VISIT_COUNT     │
 * │          │ PAGE_INFO_RESPONSE                     │ VISIT_COUNT_RESPONSE│
 * │          │                                        │                     │
 * │          │         ┌──────────────┐               │                     │
 * │          └─────────│              │───────────────┘                     │
 * │                    │    Popup     │                                     │
 * │                    │              │                                     │
 * │                    └──────────────┘                                     │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Message Flow:
 * 1. Content Script → Background: PAGE_VISITED (on page load)
 * 2. Popup → Content Script: GET_PAGE_INFO / PAGE_INFO_RESPONSE
 * 3. Popup → Background: GET_VISIT_COUNT / VISIT_COUNT_RESPONSE
 */

// Page info collected by content script
export interface PageInfo {
  url: string;
  title: string;
  wordCount: number;
  linkCount: number;
  imageCount: number;
  timestamp: number;
}

// Messages
export interface GetPageInfoMessage {
  type: 'GET_PAGE_INFO';
}

export interface PageInfoResponseMessage {
  type: 'PAGE_INFO_RESPONSE';
  data: PageInfo;
}

export interface PageVisitedMessage {
  type: 'PAGE_VISITED';
  data: PageInfo;
}

export interface GetVisitCountMessage {
  type: 'GET_VISIT_COUNT';
}

export interface VisitCountResponseMessage {
  type: 'VISIT_COUNT_RESPONSE';
  count: number;
}

export type ExtensionMessage =
  | GetPageInfoMessage
  | PageInfoResponseMessage
  | PageVisitedMessage
  | GetVisitCountMessage
  | VisitCountResponseMessage;
