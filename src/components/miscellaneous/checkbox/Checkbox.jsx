import styles from "styles/Checkbox.module.css";

export function Checkbox({ text, checked, onChange }) {
  return (
    <label className={styles.container}>
      {text}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span></span>
    </label>
  );
}
