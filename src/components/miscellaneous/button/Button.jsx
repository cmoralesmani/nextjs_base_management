import styles from "styles/Button.module.css";

export function Button({
  text = "",
  icon,
  onClick,
  disable = false,
  textDisabled = "",
}) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disable}>
      {icon}
      {!!text && <span>{text}</span>}
      {!!textDisabled && !!disable && <span>{text}</span>}
    </button>
  );
}
