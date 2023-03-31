// src/hooks/menu-sidebar/useShowMenuSidebar.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { utilitiesMenuSidebar } from "src/utilities";

const { showMenuSidebarCheckUrl } = utilitiesMenuSidebar;

export function useShowMenuSidebar() {
  const [showMenuSidebar, setMenuShowSidebar] = useState(true);
  const router = useRouter();

  useEffect(() => {
    showMenuSidebarCheck(router.asPath);

    // Se se subscriben a los eventos cuando inicia y se completa el cambio de rutas
    router.events.on("routeChangeComplete", showMenuSidebarCheck);

    // // Se quita la subscripcion de los eventos antes puestos
    return () => {
      router.events.off("routeChangeComplete", showMenuSidebarCheck);
    };
  }, []);

  const showMenuSidebarCheck = (url) => {
    const urlValid = showMenuSidebarCheckUrl(url);
    setMenuShowSidebar(urlValid);
  };

  return { showMenuSidebar };
}
