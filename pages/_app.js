// pages/_app.js

import { Provider } from "react-redux";

import { ToastCustom } from "src/components/miscellaneous/toast";
import { SiteLayout } from "src/layouts";
import { wrapper } from "src/redux/store";

import "../styles/App.scss";

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <SiteLayout>
        <Component {...props} />
        <ToastCustom />
      </SiteLayout>
    </Provider>
  );
}

export default MyApp;
