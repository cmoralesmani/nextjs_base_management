// src/components/menu-sidebar/SidebarHeader.jsx

import React from "react";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";
import { CardUser } from "./CardUser";

export const SidebarHeader = () => {
  return (
    <div className={stylesMenuSidebar.sidebarHeaderWrapper}>
      <div>
        <h2>NextJS</h2>
        <CardUser />
      </div>
    </div>
  );
};
