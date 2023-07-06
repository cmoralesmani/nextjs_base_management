import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux'

import MenuSidebar from 'src/components/menu-sidebar/MenuSidebar'
import { setUserState } from 'src/redux/slices/user-slice'
import { useAuthCheck } from 'src/hooks/auth'
import { useUserAuth } from 'src/hooks/user'
import { useShowMenuSidebar } from 'src/hooks/menu-sidebar'

import HeadSEO from './HeadSEO'
import Header from './Header'
import Footer from './Footer'

import styles from 'styles/SiteLayout.module.scss'

export function SiteLayout ({ children }) {
  const { user } = useUserAuth()
  const { showMenuSidebar } = useShowMenuSidebar()
  const dispatch = useDispatch()

  useAuthCheck()

  useEffect(() => {
    if (user) {
      dispatch(setUserState(user))
    }
  }, [dispatch, user])

  return (
    <>
      <HeadSEO />
      <Container>
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
      </Container>
    </>
  )
}
