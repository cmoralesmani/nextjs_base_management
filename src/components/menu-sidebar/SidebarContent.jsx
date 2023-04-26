// src/components/menu-sidebar/SidebarContent.jsx

import { useRouter } from "next/router";

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
import { Menu } from "react-pro-sidebar";

import { useHasPermissionStatus } from "src/hooks/auth";
import { useTheme } from "src/hooks/themes";

import { MemoizedRenderItemsMenu } from "./RenderItemsMenu";

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
    console.log(">>> router.asPath", router.asPath);
    setItemsMenu([
      {
        key: "home",
        label: "Inicio",
        href: "/",
        icon: <FaHome />,
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
          hasPermissionSeeProfiles,
        active: router.asPath.includes("/accessibility/"),
        icon: <FaUserSlash />,
        children: [
          {
            key: "users",
            label: "Usuarios",
            href: "/accessibility/accounts",
            icon: <FaUsers />,
            hasPermission: hasPermissionSeeUsers,
            children: [],
            active: router.asPath == "/accessibility/accounts",
          },
          {
            key: "new_user",
            label: "Nuevo usuario",
            href: "/accessibility/accounts/create",
            icon: <FaUserPlus />,
            hasPermission: hasPermissionCreateUser,
            children: [],
            active: router.asPath == "/accessibility/accounts/create",
          },
          {
            key: "profiles",
            label: "Perfiles",
            href: "/accessibility/profiles/",
            icon: <FaIdCard />,
            hasPermission: hasPermissionSeeProfiles,
            children: [],
            active: router.asPath == "/accessibility/profiles",
          },
        ],
      },
      {
        key: "maintenance",
        label: "Mantenimiento",
        hasPermission: hasPermissionSeeParameters,
        active: router.asPath.includes("/maintenance/"),
        icon: <FaBox />,
        children: [
          {
            key: "parameters",
            label: "Parametros",
            href: "/maintenance/parameters",
            icon: <FaCubes />,
            hasPermission: hasPermissionSeeParameters,
            children: [],
            active: router.asPath == "/maintenance/parameters",
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

  return (
    <div className={stylesMenuSidebar.sidebarContent}>
      <Menu menuItemStyles={menuItemStyles}>
        {!!itemsMenu.length && (
          <MemoizedRenderItemsMenu itemsMenu={itemsMenu} />
        )}
      </Menu>
    </div>
  );
};
