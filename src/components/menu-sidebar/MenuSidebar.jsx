// src/components/menu-sidebar/MenuSidebar.jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { useHasPermissionStatus } from "src/hooks/auth";
import { useTheme } from "src/hooks/themes";

import styles from "styles/MenuSidebar.module.scss";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";

export default function MenuSidebar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { theme, menuItemStyles } = useTheme();
  const hasPermissionSeeUsers = useHasPermissionStatus({
    codenamePermission: "see_users",
  });
  const hasPermissionCreateUser = useHasPermissionStatus({
    codenamePermission: "create_user",
  });
  const hasPermissionSeeProfiles = useHasPermissionStatus({
    codenamePermission: "see_profiles",
  });
  const hasPermissionSeeParameters = useHasPermissionStatus({
    codenamePermission: "see_parameters",
  });
  const [itemsMenu, setItemsMenu] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setItemsMenu([
      {
        key: "home",
        label: "Inicio",
        href: "/",
        icon: <FaHome />,
        hasPermission: true,
        active: router.asPath.includes("/"),
        children: [],
      },
      {
        key: "accessibility",
        label: "Accesibilidad",
        hasPermission:
          hasPermissionSeeUsers ||
          hasPermissionCreateUser ||
          hasPermissionSeeProfiles,
        active: router.asPath.includes("/"),
        icon: <FaUserSlash />,
        children: [
          {
            key: "users",
            label: "Usuarios",
            href: "/accounts/",
            icon: <FaUsers />,
            hasPermission: hasPermissionSeeUsers,
            children: [],
            active: router.asPath.includes("/accounts/"),
          },
          {
            key: "new_user",
            label: "Nuevo usuario",
            href: "/accounts/register/",
            icon: <FaUserPlus />,
            hasPermission: hasPermissionCreateUser,
            children: [],
            active: router.asPath.includes("/accounts/register"),
          },
          {
            key: "profiles",
            label: "Perfiles",
            href: "/profiles/",
            icon: <FaIdCard />,
            hasPermission: hasPermissionSeeProfiles,
            children: [],
            active: router.asPath.includes("/profiles/"),
          },
        ],
      },
      {
        key: "maintenance",
        label: "Mantenimiento",
        hasPermission: hasPermissionSeeParameters,
        active: router.asPath.includes("/"),
        icon: <FaBox />,
        children: [
          {
            key: "parameters",
            label: "Parametros",
            href: "/settings/parameters/",
            icon: <FaCubes />,
            hasPermission: hasPermissionSeeParameters,
            children: [],
            active: router.asPath.includes("/settings/parameters/"),
          },
        ],
      },
    ]);
  }, [
    hasPermissionSeeUsers,
    hasPermissionCreateUser,
    hasPermissionSeeProfiles,
    hasPermissionSeeParameters,
    router.asPath,
  ]);

  const handleClick = () => {
    collapseSidebar();
  };

  const RenderItemsMenu = ({ itemsMenu }) => {
    return itemsMenu.map(
      (im) =>
        im.hasPermission &&
        (!!im.children.length ? (
          <SubMenu
            key={im.key}
            label={im.label}
            defaultOpen={im.active}
            active={im.active}
          >
            <RenderItemsMenu itemsMenu={im.children} />
          </SubMenu>
        ) : (
          <MenuItem
            key={im.key}
            icon={im.icon}
            // href={im.href}
            // component={<NextLink href={im.href}>{im.label}</NextLink>}
            active={!!im.active}
          >
            <NextLink href={im.href}>{im.label}</NextLink>
          </MenuItem>
        ))
    );
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

    //   <SidebarFooter className={styles.footer}>
    //     <div className={`sidebar-btn-wrapper ${styles.wrapButton}`}>
    //       <a className="sidebar-btn" href="#" onClick={logout}>
    //         <FaSignOutAlt />
    //         <span>Cerrar sesión</span>
    //       </a>
    //     </div>
    //   </SidebarFooter>
    // </ProSidebar>
    <div className={styles.sidebar}>
      <button className={styles.toogleSidebar} onClick={handleClick}>
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
          <SidebarHeader style={{ marginBottom: "24px", marginTop: "16px" }} />
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              {!!itemsMenu.length && <RenderItemsMenu itemsMenu={itemsMenu} />}
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  );
}
