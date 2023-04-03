import styles from "styles/Label.module.css";

export function Label({
  text = "",
  title = "",
  icon,
  backgroundColor = "var(--gray-100)",
  color = "var(--black)",
}) {
  return (
    (!!icon || !!text) && (
      <div
        className={styles.label}
        style={{ backgroundColor: backgroundColor, color: color }}
        title={title}
      >
        {!!icon && icon} {!!text && <span>{text}</span>}
      </div>
    )
  );
}
