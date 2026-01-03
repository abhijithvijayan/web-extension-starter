/**
 * Popup Component
 *
 * This is the main UI that appears when the user clicks the extension icon.
 * It communicates with both the content script and background script.
 *
 * Communication Flow:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                            POPUP                                    │
 * │                                                                     │
 * │  On mount:                                                          │
 * │                                                                     │
 * │  1. Popup ──GET_PAGE_INFO──► Content Script (via browser.tabs)      │
 * │     Popup ◄──PAGE_INFO_RESPONSE── Content Script                    │
 * │     → Displays word count, link count, image count                  │
 * │                                                                     │
 * │  2. Popup ──GET_VISIT_COUNT──► Background Script (via runtime)      │
 * │     Popup ◄──VISIT_COUNT_RESPONSE── Background Script               │
 * │     → Displays total pages tracked                                  │
 * │                                                                     │
 * │  3. Popup ──► browser.storage.local                                 │
 * │     → Reads username for greeting                                   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Note: browser.tabs.sendMessage() sends to content script in specific tab
 *       browser.runtime.sendMessage() sends to background script
 */

import {useEffect, useState} from 'react';
import type {FC} from 'react';
import browser, {Tabs} from 'webextension-polyfill';
import {getStorage} from '../utils/storage';
import {
  PageInfo,
  PageInfoResponseMessage,
  VisitCountResponseMessage,
} from '../types/messages';
import {TabInfo} from './components/TabInfo/TabInfo';
import {FooterActions} from './components/FooterActions/FooterActions';
import styles from './Popup.module.scss';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}

interface TabData {
  title: string;
  url: string;
  favIconUrl?: string;
}

const Popup: FC = () => {
  const [tabInfo, setTabInfo] = useState<TabData | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [visitCount, setVisitCount] = useState<number>(0);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Get current tab info
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      const tab = tabs[0];
      if (tab) {
        setTabInfo({
          title: tab.title || 'Unknown',
          url: tab.url || 'Unknown',
          favIconUrl: tab.favIconUrl,
        });

        // Request page info from content script
        if (tab.id) {
          browser.tabs
            .sendMessage(tab.id, {type: 'GET_PAGE_INFO'})
            .then((response: unknown) => {
              const res = response as PageInfoResponseMessage;
              if (res?.data) {
                setPageInfo(res.data);
              }
            })
            .catch(() => {
              // Content script might not be injected on this page
            });
        }
      }
    });

    // Get visit count from background script
    browser.runtime
      .sendMessage({type: 'GET_VISIT_COUNT'})
      .then((response: unknown) => {
        const res = response as VisitCountResponseMessage;
        if (res?.count !== undefined) {
          setVisitCount(res.count);
        }
      })
      .catch(() => {
        // Background script might not be ready
      });

    // Get username from storage
    getStorage(['username']).then(({username: storedUsername}) => {
      setUsername(storedUsername);
    });
  }, []);

  const handleReloadTab = async (): Promise<void> => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tab = tabs[0];
    if (tab?.id) {
      await browser.tabs.reload(tab.id);
    }
  };

  return (
    <section className={styles.popup}>
      <header className={styles.header}>
        <h1 className={styles.title}>Web Extension Starter</h1>
        {username && <p className={styles.greeting}>Hello, {username}!</p>}
      </header>

      {tabInfo && (
        <div className={styles.tabCard}>
          <TabInfo
            title={tabInfo.title}
            url={tabInfo.url}
            favIconUrl={tabInfo.favIconUrl}
            onReload={handleReloadTab}
          />
        </div>
      )}

      {/* Page Stats from Content Script */}
      {pageInfo && (
        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Page Stats</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{pageInfo.wordCount}</span>
              <span className={styles.statLabel}>Words</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{pageInfo.linkCount}</span>
              <span className={styles.statLabel}>Links</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{pageInfo.imageCount}</span>
              <span className={styles.statLabel}>Images</span>
            </div>
          </div>
        </div>
      )}

      {/* Visit Count from Background Script */}
      <div className={styles.visitCard}>
        <span className={styles.visitLabel}>Pages tracked:</span>
        <span className={styles.visitCount}>{visitCount}</span>
      </div>

      <FooterActions
        onSettings={(): Promise<Tabs.Tab> =>
          openWebPage('/Options/options.html')
        }
        onGitHub={(): Promise<Tabs.Tab> =>
          openWebPage(
            'https://github.com/abhijithvijayan/web-extension-starter'
          )
        }
        onSupport={(): Promise<Tabs.Tab> =>
          openWebPage('https://www.buymeacoffee.com/abhijithvijayan')
        }
      />
    </section>
  );
};

export default Popup;
