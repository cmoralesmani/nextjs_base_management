// app/components/templates/MenuSidebar/MenuSidebar.jsx

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaUserPlus,
  FaIdCard,
  FaBox,
  FaUserSlash,
  FaCubes,
} from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SubMenu,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { hasPermission } from "@app/helpers/utils";
import { useHasPermissionStatus } from "@app/hooks";
import { userService } from "@app/services";
import { CardUser } from "./CardUser";

import styles from "../../../../styles/MenuSidebar.module.scss";

export { MenuSidebar };

// https://reactjsexample.com/customizable-and-responsive-react-sidebar-library-with-dropdown-menus/
function MenuSidebar({
  toggled,
  handleToggleSidebar,
  collapsed,
  handleCollapsedChange,
}) {
  const [user, setUser] = useState(null);
  const permissions = useHasPermissionStatus([
    "CUEUS-LISTA",
    "CUEUS-CREAR",
    "PERFI-LISTA",
    "PARAM-LISTA",
  ]);
  const hasPermissionRegisterUser = hasPermission(permissions, "CUEUS-LISTA");
  const hasPermissionListUsers = hasPermission(permissions, "CUEUS-LISTA");
  const hasPermissionListProfiles = hasPermission(permissions, "PERFI-LISTA");
  const hasPermissionListParameters = hasPermission(permissions, "PARAM-LISTA");

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // Solo se muestra el Sidebar si esta logeado
  if (!user) return null;

  return (
    <ProSidebar
      collapsed={collapsed}
      breakPoint="md"
      toggled={toggled}
      onToggle={handleToggleSidebar}
      style={{ zIndex: 1021 }}
    >
      <SidebarHeader className={styles.header}>
        <h2>NextJS</h2>
        <CardUser user={user} />
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <Form.Switch
                height={16}
                width={30}
                type="switch"
                id="colapse-sidebar"
                label={collapsed ? "" : "Colapsar"}
                checked={collapsed}
                onChange={handleCollapsedChange}
              />
            </Col>
          </Row>
        </Container>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaHome />}>
            <NextLink href="/">
              <a>Inicio</a>
            </NextLink>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          {(hasPermissionListUsers ||
            hasPermissionListProfiles ||
            hasPermissionRegisterUser) && (
            <SubMenu icon={<FaUserSlash />} title="Accesibilidad">
              {hasPermissionListUsers && (
                <MenuItem icon={<FaUsers />}>
                  <NextLink href="/accounts/">
                    <a>Usuarios</a>
                  </NextLink>
                </MenuItem>
              )}
              {hasPermissionRegisterUser && (
                <MenuItem icon={<FaUserPlus />}>
                  <NextLink href="/accounts/register">
                    <a>Nuevo usuario</a>
                  </NextLink>
                </MenuItem>
              )}
              {hasPermissionListProfiles && (
                <MenuItem icon={<FaIdCard />}>
                  <NextLink href="/profiles/">
                    <a>Perfiles</a>
                  </NextLink>
                </MenuItem>
              )}
            </SubMenu>
          )}
          {hasPermissionListParameters && (
            <SubMenu icon={<FaBox />} title="Mantenimiento">
              {hasPermissionListParameters && (
                <MenuItem icon={<FaCubes />}>
                  <NextLink href="/settings/parameters/">
                    <a>Parametros</a>
                  </NextLink>
                </MenuItem>
              )}
            </SubMenu>
          )}
        </Menu>
      </SidebarContent>
      <SidebarFooter className={styles.footer}>
        <div className={`sidebar-btn-wrapper ${styles.wrapButton}`}>
          <a className="sidebar-btn" href="#" onClick={logout}>
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}
