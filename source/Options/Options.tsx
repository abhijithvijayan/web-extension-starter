import {useEffect, useState} from 'react';
import type {FC} from 'react';
import {getStorage, setStorage} from '../utils/storage';
import {Button} from '../components/Button/Button';
import {Input} from '../components/Input/Input';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {GitHubIcon} from '../components/icons/GitHubIcon';
import styles from './Options.module.scss';

const Options: FC = () => {
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
    <div className={styles.options}>
      <header className={styles.header}>
        <h1>Extension Settings</h1>
        <p>Configure your extension preferences</p>
      </header>

      <form onSubmit={handleSave} className={styles.form}>
        <div className={styles.section}>
          <Input
            label="Your Name"
            id="username"
            name="username"
            placeholder="Enter your name"
            spellCheck={false}
            autoComplete="off"
            value={username}
            onChange={(e): void => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <Checkbox
            id="logging"
            name="logging"
            label="Show the features enabled on each page in the console"
            checked={enableLogging}
            onChange={(e): void => setEnableLogging(e.target.checked)}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary" size="large">
            Save Settings
          </Button>
          {saved && <span className={styles.status}>Settings saved</span>}
        </div>
      </form>

      <footer className={styles.footer}>
        <a
          href="https://github.com/abhijithvijayan/web-extension-starter"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <GitHubIcon size={18} />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default Options;
