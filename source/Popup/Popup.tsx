import {useEffect, useState} from 'react';
import type {FC} from 'react';
import browser, {Tabs} from 'webextension-polyfill';
import {getStorage} from '../utils/storage';
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
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      const tab = tabs[0];
      if (tab) {
        setTabInfo({
          title: tab.title || 'Unknown',
          url: tab.url || 'Unknown',
          favIconUrl: tab.favIconUrl,
        });
      }
    });

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
