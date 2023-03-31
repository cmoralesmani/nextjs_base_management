// src/components/menu-sidebar/SidebarFooter.jsx

import Link from "next/link";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "src/hooks/auth";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";
import stylesButton from "styles/Button.module.scss";

export const SidebarFooter = ({ collapsed }) => {
  const { auth } = useAuth();

  return (
    <div className={stylesMenuSidebar.sidebarFooterWrapper}>
      {collapsed ? (
        <Link href="/logout">
          <a className={stylesButton.buttonDark}>
            <FaSignOutAlt />
          </a>
        </Link>
      ) : (
        <div className={stylesMenuSidebar.sidebarFooter}>
          <div>
            {!!auth && (
              <Link href="/logout">
                <a className={stylesButton.buttonLight}>
                  <FaSignOutAlt /> <span>Cerrar sesión</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
