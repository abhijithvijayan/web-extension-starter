import * as React from 'react';
import {useEffect, useState} from 'react';
import {getStorage, setStorage} from '../utils/storage';

const GitHubIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Options: React.FC = () => {
  const [username, setUsername] = useState('');
  const [enableLogging, setEnableLogging] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getStorage(['username', 'enableLogging']).then((result) => {
      setUsername(result.username);
      setEnableLogging(result.enableLogging);
    });
  }, []);

  const handleSave = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await setStorage({username, enableLogging});
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="options">
      <header className="options__header">
        <h1>Extension Settings</h1>
        <p>Configure your extension preferences</p>
      </header>

      <form onSubmit={handleSave} className="options__card">
        <div className="options__section">
          <label htmlFor="username" className="options__label">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="options__input"
            placeholder="Enter your name"
            spellCheck="false"
            autoComplete="off"
            value={username}
            onChange={(e): void => setUsername(e.target.value)}
          />
        </div>

        <div className="options__section">
          <label
            htmlFor="logging"
            className="options__checkbox-wrapper"
            onClick={(e): void => {
              if ((e.target as HTMLElement).tagName !== 'INPUT') {
                setEnableLogging(!enableLogging);
              }
            }}
          >
            <input
              type="checkbox"
              name="logging"
              id="logging"
              className="options__checkbox"
              checked={enableLogging}
              onChange={(e): void => setEnableLogging(e.target.checked)}
            />
            <span className="options__checkbox-text">
              Show the features enabled on each page in the console
            </span>
          </label>
        </div>

        <div className="options__actions">
          <button type="submit" className="options__button options__button--primary">
            Save Settings
          </button>
          {saved && <span className="options__status">Settings saved</span>}
        </div>
      </form>

      <footer className="options__footer">
        <a
          href="https://github.com/abhijithvijayan/web-extension-starter"
          target="_blank"
          rel="noopener noreferrer"
          className="options__github-link"
        >
          <GitHubIcon />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default Options;
