import React from 'react';
import browser from 'webextension-polyfill';

import './styles.scss';

function openWebPage(url) {
  return browser.tabs.create({url});
}

const Popup = () => {
  return (
    <section id="popup">
      <h2>WEB-EXTENSION-STARTER</h2>
      <button
        id="options__button"
        type="button"
        onClick={() => {
          return openWebPage('options.html');
        }}
      >
        Options Page
      </button>
      <div className="links__holder">
        <ul>
          <li>
            <button
              type="button"
              onClick={() => {
                return openWebPage(
                  'https://github.com/abhijithvijayan/web-extension-starter'
                );
              }}
            >
              GitHub
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                return openWebPage(
                  'https://www.buymeacoffee.com/abhijithvijayan'
                );
              }}
            >
              Buy Me A Coffee
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Popup;
