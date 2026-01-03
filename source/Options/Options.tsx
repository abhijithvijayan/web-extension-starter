import * as React from 'react';
import {useEffect, useState} from 'react';
import {getStorage, setStorage} from '../utils/storage';

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
    </div>
  );
};

export default Options;
