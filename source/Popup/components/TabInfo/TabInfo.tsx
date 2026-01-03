import type {FC} from 'react';
import {Card} from '../../../components/Card/Card';
import {Button} from '../../../components/Button/Button';
import styles from './TabInfo.module.scss';

interface TabInfoProps {
  title: string;
  url: string;
  favIconUrl?: string;
  onReload: () => void;
}

export const TabInfo: FC<TabInfoProps> = ({
  title,
  url,
  favIconUrl,
  onReload,
}) => {
  const getInitial = (text: string): string => text.charAt(0).toUpperCase();

  return (
    <Card title="Current Tab">
      <div className={styles.content}>
        {favIconUrl ? (
          <img src={favIconUrl} alt="" className={styles.favicon} />
        ) : (
          <div className={styles.faviconPlaceholder}>{getInitial(title)}</div>
        )}
        <div className={styles.details}>
          <p className={styles.title}>{title}</p>
          <p className={styles.url}>{url}</p>
        </div>
      </div>
      <Button variant="secondary" fullWidth onClick={onReload}>
        Reload Tab
      </Button>
    </Card>
  );
};
