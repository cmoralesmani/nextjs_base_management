// src/components/menu-sidebar/RenderItemsMenu.jsx

import Link from "next/link";
import { memo } from "react";
import { SubMenu, MenuItem } from "react-pro-sidebar";

export const RenderItemsMenu = ({ itemsMenu }) => {
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
          active={!!im.active}
          component={im.href && <Link href={im.href} />}
        >
          {im.label}
        </MenuItem>
      ))
  );
};

export const MemoizedRenderItemsMenu = memo(RenderItemsMenu);
