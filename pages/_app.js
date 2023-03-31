// pages/_app.js

import { Provider } from "react-redux";
import { SiteLayout } from "src/layouts";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Container from "react-bootstrap/Container";

// import { ToastTP } from "src/components/elements";
// import { MenuSidebar, TitleSite } from "src/components/templates";
// import { userService } from "src/services";
import { wrapper } from "src/redux/store";

import "../styles/App.scss";

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const { _pageProps } = props;

  return (
    <Provider store={store}>
      <SiteLayout>
        <Component {..._pageProps} />
      </SiteLayout>
    </Provider>
  );
  /*
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // El estado showMainLayout se usa para mostrar el Sidebar y el Title
  const [showMainLayout, setShowMainLayout] = useState(true);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return functi,on
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];

    setShowMainLayout(path != "/login");

    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleCollapsedChange = (event) => {
    setCollapsed(event.target.checked);
  };
*/
  // return (
  //   <>
  //     <Head>
  //       <title>Sitio con NextJS</title>
  //       <meta charSet="utf-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       {/* bootstrap css */}
  //       <link
  //         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
  //         rel="stylesheet"
  //       />
  //       <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  //     </Head>

  //     <div className={`app ${toggled ? "toggled" : ""}`}>
  //       {showMainLayout && (
  //         <>
  //           <MenuSidebar
  //             toggled={toggled}
  //             handleToggleSidebar={handleToggleSidebar}
  //             collapsed={collapsed}
  //             handleCollapsedChange={handleCollapsedChange}
  //           />
  //         </>
  //       )}
  //       <main>
  //         <Container>
  //           {showMainLayout && (
  //             <>
  //               <TitleSite handleToggleSidebar={handleToggleSidebar} />
  //             </>
  //           )}
  //           <ToastTP />
  //           {authorized && (
  //             <>
  //               <Component {...pageProps} />
  //             </>
  //           )}
  //         </Container>
  //         <footer>
  //           <small>
  //             © 2021 hecho por -{" "}
  //             <a
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               href="https://nextjs.org"
  //             >
  //               Desarrollador NextJS
  //             </a>
  //           </small>
  //           <br />
  //         </footer>
  //       </main>
  //     </div>
  //   </>
  // );
}

export default MyApp;
