import { menuClasses } from "react-pro-sidebar";

import { themes } from "src/utilities/themes/types.d";

/**
 * Obtiene el tema utilizado
 */
export function useTheme(data) {
  const theme = themes["dark"];

  const menuItemStyles = {
    icon: {
      color: theme.menu.icon,
      [`&.${menuClasses.active}`]: {
        backgroundColor: theme.menu.active.backgroundColor,
        color: theme.menu.active.color,
      },
      [`&.${menuClasses.disabled}`]: {
        color: theme.menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: theme.menu.hover.backgroundColor,
        color: theme.menu.hover.color,
      },
    },
    SubMenuExpandIcon: {
      color: "var(--gray)",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? theme.menu.menuContent : "transparent",
    }),
    button: {
      [`&.${menuClasses.active}`]: {
        backgroundColor: theme.menu.active.backgroundColor,
        color: theme.menu.active.color,
        fontWeight: 600,
      },
      [`&.${menuClasses.disabled}`]: {
        color: theme.menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: theme.menu.hover.backgroundColor,
        color: theme.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return { theme, menuItemStyles };
}
