import * as React from "react";
import type { FC, InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  ...props
}) => {
  const handleWrapperClick = (e: React.MouseEvent<HTMLLabelElement>): void => {
    if ((e.target as HTMLElement).tagName !== "INPUT") {
      const input = e.currentTarget.querySelector("input");
      if (input) {
        input.click();
      }
    }
  };

  return (
    <label htmlFor={id} className={styles.wrapper} onClick={handleWrapperClick}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={styles.text}>{label}</span>
    </label>
  );
};
