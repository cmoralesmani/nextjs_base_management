import React from "react";
import styles from "styles/Loader.module.scss";

export function Loader({ show }) {
  if (!show) return null;

  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
