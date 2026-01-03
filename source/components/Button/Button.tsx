import type {FC, ReactNode, ButtonHTMLAttributes} from 'react';
import styles from './Button.module.scss';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'settings'
  | 'github'
  | 'support';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
};
