import Image from "next/image";
import React from "react";

import styles from "styles/layouts/SiteLayout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.thedataage.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hecho por
        <span className={styles.logo}>
          <Image
            src="/the-data-age-logo.png"
            alt="The Data Age Logo"
            width={52}
            height={16}
          />
        </span>
      </a>
    </footer>
  );
}
