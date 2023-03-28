import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HeadSEO from "./HeadSEO";
import { useAuthCheck } from "src/hooks/auth";
import { setUserState } from "src/redux/slices/user-slice";
import { useUserAuth } from "src/hooks/user";
import { useShowMenuSidebar } from "src/hooks/menu-sidebar";
import Header from "./Header";
import { ProSidebarProvider } from "react-pro-sidebar";
import MenuSidebar from "src/components/menu-sidebar/MenuSidebar";
import Footer from "./Footer";

import styles from "styles/layouts/SiteLayout.module.css";

export function SiteLayout({ children }) {
  const { user } = useUserAuth();
  const { showMenuSidebar } = useShowMenuSidebar();
  const dispatch = useDispatch();

  useAuthCheck();

  useEffect(() => {
    if (!!user) {
      dispatch(setUserState(user));
    }
  }, [user]);

  return (
    <>
      <HeadSEO />
      <Header />
      <main className={styles.main}>
        {showMenuSidebar && (
          <ProSidebarProvider>
            <MenuSidebar />
          </ProSidebarProvider>
        )}
        <div className={styles.content}>
          <div className={styles.mainContent}>{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
