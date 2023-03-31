// src/components/menu-sidebar/SidebarContent.jsx

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserSlash,
  FaUsers,
  FaUserPlus,
  FaIdCard,
  FaCubes,
  FaBox,
} from "react-icons/fa";
import { Menu, SubMenu, MenuItem } from "react-pro-sidebar";

import { useHasPermissionStatus } from "src/hooks/auth";
import { useTheme } from "src/hooks/themes";

import stylesMenuSidebar from "styles/MenuSidebar.module.scss";

export const SidebarContent = () => {
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
  const { menuItemStyles } = useTheme();
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
          <MenuItem key={im.key} icon={im.icon} active={!!im.active}>
            <Link href={im.href}>{im.label}</Link>
          </MenuItem>
        ))
    );
  };
  return (
    <div className={stylesMenuSidebar.sidebarContent}>
      <Menu menuItemStyles={menuItemStyles}>
        {!!itemsMenu.length && <RenderItemsMenu itemsMenu={itemsMenu} />}
      </Menu>
    </div>
  );
};
