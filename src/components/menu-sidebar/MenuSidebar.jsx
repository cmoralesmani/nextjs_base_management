// src/components/menu-sidebar/MenuSidebar.jsx

import React, { useEffect, useState } from "react";

import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import NextLink from "next/link";
import {
  // FaChevronLeft,
  // FaChevronRight,
  FaClone,
  // FaMap,
  FaTachometerAlt,
  FaLayerGroup,
  FaHome,
  FaUserSlash,
  FaUsers,
  FaUserPlus,
  FaIdCard,
  FaCubes,
  FaBox,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Container, Form, Row, Col } from "react-bootstrap";

import { CardUser } from "./CardUser";

import { useTheme } from "src/hooks/themes";

import styles from "styles/MenuSidebar.module.scss";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarContent } from "./SidebarContent";

export default function MenuSidebar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { theme, menuItemStyles } = useTheme();

  const handleClick = () => {
    collapseSidebar();
  };

  return (
    // <ProSidebar
    //   collapsed={collapsed}
    //   breakPoint="md"
    //   toggled={toggled}
    //   onToggle={handleToggleSidebar}
    //   style={{ zIndex: 1021 }}
    // >
    //   <SidebarHeader className={styles.header}>
    //     <h2>NextJS</h2>
    //     <CardUser user={user} />
    //     <Container>
    //       <Row className="justify-content-center">
    //         <Col md="auto">
    //           <Form.Switch
    //             height={16}
    //             width={30}
    //             type="switch"
    //             id="colapse-sidebar"
    //             label={collapsed ? "" : "Colapsar"}
    //             checked={collapsed}
    //             onChange={handleCollapsedChange}
    //           />
    //         </Col>
    //       </Row>
    //     </Container>
    //   </SidebarHeader>

    // </ProSidebar>
    <div className={styles.sidebar}>
      <button className={styles.sidebarToogleButton} onClick={handleClick}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <Sidebar
        className={styles.sidebarMenu}
        backgroundColor={theme.sidebar.backgroundColor}
        rootStyles={{
          color: theme.sidebar.color,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* <SidebarHeader style={{ marginBottom: "24px", marginTop: "16px" }} /> */}
          <SidebarContent />
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  );
}
