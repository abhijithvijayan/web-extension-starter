import * as React from 'react';
import {useEffect, useState} from 'react';
import browser, {Tabs} from 'webextension-polyfill';
import {getStorage} from '../utils/storage';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}

interface TabInfo {
  title: string;
  url: string;
  favIconUrl?: string;
}

const Popup: React.FC = () => {
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null);
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
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const tab = tabs[0];
    if (tab?.id) {
      await browser.tabs.reload(tab.id);
    }
  };

  const getInitial = (title: string): string => {
    return title.charAt(0).toUpperCase();
  };

  return (
    <section className="popup">
      <header className="popup__header">
        <h1 className="popup__title">Web Extension Starter</h1>
        {username && <p className="popup__greeting">Hello, {username}!</p>}
      </header>

      {tabInfo && (
        <div className="popup__card">
          <div className="popup__card-header">
            <span className="popup__card-title">Current Tab</span>
          </div>
          <div className="popup__tab-content">
            {tabInfo.favIconUrl ? (
              <img src={tabInfo.favIconUrl} alt="" className="popup__favicon" />
            ) : (
              <div className="popup__favicon-placeholder">{getInitial(tabInfo.title)}</div>
            )}
            <div className="popup__tab-details">
              <p className="popup__tab-title">{tabInfo.title}</p>
              <p className="popup__tab-url">{tabInfo.url}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReloadTab}
            className="popup__btn popup__btn--secondary"
          >
            Reload Tab
          </button>
        </div>
      )}

      <div className="popup__footer">
        <button
          type="button"
          className="popup__footer-btn popup__footer-btn--settings"
          onClick={(): Promise<Tabs.Tab> => openWebPage('/Options/options.html')}
        >
          Settings
        </button>
        <button
          type="button"
          className="popup__footer-btn popup__footer-btn--github"
          onClick={(): Promise<Tabs.Tab> =>
            openWebPage('https://github.com/abhijithvijayan/web-extension-starter')
          }
        >
          GitHub
        </button>
        <button
          type="button"
          className="popup__footer-btn popup__footer-btn--support"
          onClick={(): Promise<Tabs.Tab> =>
            openWebPage('https://www.buymeacoffee.com/abhijithvijayan')
          }
        >
          Support
        </button>
      </div>
    </section>
  );
};

export default Popup;
