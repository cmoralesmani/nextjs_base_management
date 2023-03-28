import Link from "next/link";
import React from "react";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NickProfile } from "src/components/profile";

import { useAuth } from "src/hooks/auth";

import styles from "styles/layouts/SiteLayout.module.css";

export default function Header() {
  const { auth } = useAuth();

  return (
    <nav className={styles.header}>
      <div>
        <Link href="/">
          <FaHome />
        </Link>
      </div>
      <ul>
        <li>
          <NickProfile />
        </li>
        <li>
          {!auth ? (
            <Link href="/login">
              <FaSignInAlt /> <span>Login</span>
            </Link>
          ) : (
            <Link href="/logout">
              <FaSignOutAlt /> <span>Logout</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
