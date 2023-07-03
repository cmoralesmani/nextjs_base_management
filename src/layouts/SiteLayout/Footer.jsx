import Image from "next/image";
import React from "react";

import styles from "styles/SiteLayout.module.scss";

import logo from "public/assets/images/logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Hecho por
      <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        © 2023 hecho por - Desarrollador
        <span className={styles.logo}>
          <Image src={logo} alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
}
