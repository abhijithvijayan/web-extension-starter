import type {FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({label, id, className, ...props}) => (
  <div className={styles.wrapper}>
    {label && (
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    )}
    <input
      id={id}
      className={`${styles.input} ${className || ''}`.trim()}
      {...props}
    />
  </div>
);
