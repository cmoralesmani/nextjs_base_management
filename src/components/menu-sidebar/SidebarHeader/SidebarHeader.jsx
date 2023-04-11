// src/components/menu-sidebar/SidebarHeader.jsx

import React from "react";

import { CardUser } from "./CardUser";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";

export const SidebarHeader = ({ collapsed }) => {
  return (
    <div
      className={`${stylesMenuSidebar.sidebarSectionWrapper} ${stylesMenuSidebar.sidebarSectionHeaderWrapper}`}
    >
      <h2>NextJS</h2>
      <CardUser collapsed={collapsed} />
    </div>
  );
};
