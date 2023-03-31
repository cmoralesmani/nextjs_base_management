// src/utilities/menu-sidebar/show-menu-sidebar-check-url.js

import { PATHS_TO_IGNORE_SHOW_MENU_SIDEBAR } from "./types.d";

export function showMenuSidebarCheckUrl(url) {
  const path = url.split("?")[0];

  if (PATHS_TO_IGNORE_SHOW_MENU_SIDEBAR.includes(path)) {
    return false;
  } else {
    return true;
  }
}
