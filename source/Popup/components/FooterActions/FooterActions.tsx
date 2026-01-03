import type {FC} from 'react';
import {Button} from '../../../components/Button/Button';
import {SettingsIcon} from '../../../components/icons/SettingsIcon';
import {GitHubIcon} from '../../../components/icons/GitHubIcon';
import {HeartIcon} from '../../../components/icons/HeartIcon';
import styles from './FooterActions.module.scss';

interface FooterActionsProps {
  onSettings: () => void;
  onGitHub: () => void;
  onSupport: () => void;
}

export const FooterActions: FC<FooterActionsProps> = ({
  onSettings,
  onGitHub,
  onSupport,
}) => (
  <div className={styles.footer}>
    <Button
      variant="settings"
      size="small"
      className={styles.button}
      onClick={onSettings}
    >
      <SettingsIcon />
      <span>Settings</span>
    </Button>
    <Button
      variant="github"
      size="small"
      className={styles.button}
      onClick={onGitHub}
    >
      <GitHubIcon />
      <span>GitHub</span>
    </Button>
    <Button
      variant="support"
      size="small"
      className={styles.button}
      onClick={onSupport}
    >
      <HeartIcon />
      <span>Support</span>
    </Button>
  </div>
);
