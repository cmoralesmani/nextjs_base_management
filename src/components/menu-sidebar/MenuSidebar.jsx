import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import Link from "next/link";
import * as icons from "react-icons/fa";

import styles from "styles/MenuSidebar.module.scss";
import { useHasPermissionStatus } from "src/hooks/auth";
import { useTheme } from "src/hooks/themes";

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
  const hasPermissionSeePermissions = useHasPermissionStatus({
    codenamePermission: "see_permissions",
  });

  const [itemsMenu, setItemsMenu] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setItemsMenu([
      {
        key: "home",
        label: "Inicio",
        href: "/",
        icon: <icons.FaHome />,
        hasPermission: true,
        active: router.asPath == "/",
        children: [],
      },
      {
        key: "accessibility",
        label: "Accesibilidad",
        hasPermission:
          hasPermissionSeeUsers ||
          hasPermissionCreateUser ||
          hasPermissionSeeProfiles ||
          hasPermissionSeePermissions,
        active: router.asPath.includes("/accessibility"),
        icon: <icons.FaUserSlash />,
        children: [
          {
            key: "users",
            label: "Usuarios",
            href: "/accessibility/users/list",
            icon: <icons.FaUsers />,
            hasPermission: hasPermissionSeeUsers,
            active:
              router.asPath.includes("/accessibility/users") &&
              router.asPath != "/accessibility/users/create",
            children: [],
          },
          {
            key: "add_user",
            label: "Agregar usuario",
            href: "/accessibility/users/create",
            icon: <icons.FaUserPlus />,
            hasPermission: hasPermissionCreateUser,
            active: router.asPath.includes("/accessibility/users/create"),
            children: [],
          },
          {
            key: "profiles",
            label: "Perfiles",
            href: "/accessibility/profiles/list",
            icon: <icons.FaIdCard />,
            hasPermission: hasPermissionSeeProfiles,
            active: router.asPath.includes("/accessibility/profiles"),
            children: [],
          },
          {
            key: "permissions",
            label: "Permisos",
            href: "/accessibility/permissions/list",
            icon: <icons.FaRegHandshake />,
            hasPermission: hasPermissionSeePermissions,
            active: router.asPath.includes("/accessibility/permissions"),
            children: [],
          },
        ],
      },
      {
        key: "maintenance",
        label: "Mantenimiento",
        hasPermission: hasPermissionSeeParameters,
        active: router.asPath.includes("/maintenance"),
        icon: <icons.FaBox />,
        children: [
          {
            key: "parameters",
            label: "Parametros",
            href: "/maintenance/parameters/list",
            icon: <icons.FaCubes />,
            hasPermission: hasPermissionSeeParameters,
            active: router.asPath.includes("/maintenance/parameters"),
            children: [],
          },
        ],
      },
    ]);
  }, [
    router.asPath,
    hasPermissionCreateUser,
    hasPermissionSeeParameters,
    hasPermissionSeeProfiles,
    hasPermissionSeeUsers,
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
            component={im.href && <Link href={im.href} />}
            active={im.active}
          >
            {" "}
            {im.label}
          </MenuItem>
        ))
    );
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.toogleSidebar} onClick={handleClick}>
        {collapsed ? <icons.FaChevronRight /> : <icons.FaChevronLeft />}
      </button>
      <Sidebar
        className={styles.sidebarMenu}
        backgroundColor={theme.sidebar.backgroundColor}
        rootStyles={{
          color: theme.sidebar.color,
        }}
      >
        <Menu menuItemStyles={menuItemStyles}>
          {!!itemsMenu.length && <RenderItemsMenu itemsMenu={itemsMenu} />}
        </Menu>
      </Sidebar>
    </div>
  );
}
