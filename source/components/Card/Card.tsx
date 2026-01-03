import type {FC, ReactNode} from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  size?: 'default' | 'large';
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({
  title,
  size = 'default',
  children,
  className,
}) => {
  const classNames = [styles.card, size === 'large' && styles.large, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
};
