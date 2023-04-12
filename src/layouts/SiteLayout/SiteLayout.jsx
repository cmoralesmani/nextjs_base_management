// src/layouts/SiteLayout/SiteLayout.jsx

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";

import MenuSidebar from "src/components/menu-sidebar/MenuSidebar";
import { useAuthCheck } from "src/hooks/auth";
import { useShowMenuSidebar } from "src/hooks/menu-sidebar";
import { useUserAuth } from "src/hooks/user";
import { setUserState } from "src/redux/slices/user-slice";

import Footer from "./Footer";
import HeadSEO from "./HeadSEO";

import styles from "styles/layouts/SiteLayout.module.scss";

export function SiteLayout({ children }) {
  const { user } = useUserAuth();
  const { showMenuSidebar } = useShowMenuSidebar();
  const dispatch = useDispatch();

  useAuthCheck();

  useEffect(() => {
    if (!!user) {
      dispatch(setUserState(user));
    }
  }, [dispatch, user]);

  return (
    <>
      <HeadSEO />
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
