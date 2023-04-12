// src/components/menu-sidebar/SidebarFooter.jsx

import Link from "next/link";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "src/hooks/auth";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";
import stylesButton from "styles/Button.module.scss";

export const SidebarFooter = ({ collapsed }) => {
  const { auth } = useAuth();

  if (!auth) return;

  return (
    <div
      className={`${stylesMenuSidebar.sidebarSectionWrapper} ${stylesMenuSidebar.sidebarSectionFooterWrapper}`}
    >
      <Link
        href="/logout"
        className={
          !!collapsed
            ? `${stylesButton.buttonLight} ${stylesButton.round}`
            : `${stylesButton.buttonLight} ${stylesButton.semiRound}`
        }
      >
        <FaSignOutAlt /> <span>Cerrar sesión</span>
      </Link>
    </div>
  );
};
