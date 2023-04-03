// src/components/menu-sidebar/MenuSidebar.jsx

import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Sidebar, useProSidebar } from "react-pro-sidebar";

import { useTheme } from "src/hooks/themes";

import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";

export default function MenuSidebar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { theme } = useTheme();

  const handleClick = () => {
    collapseSidebar();
  };

  return (
    <div className={stylesMenuSidebar.sidebarWrapper}>
      <button
        className={stylesMenuSidebar.sidebarToogleButton}
        onClick={handleClick}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <Sidebar
        className={stylesMenuSidebar.sidebar}
        backgroundColor={theme.sidebar.backgroundColor}
        rootStyles={{
          color: theme.sidebar.color,
        }}
      >
        <div>
          <SidebarHeader />
          <SidebarContent />
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  );
}
