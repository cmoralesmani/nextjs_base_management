import { Provider } from 'react-redux'

import { ToastCustom } from 'src/components/miscellaneous'
import { SiteLayout } from 'src/layouts'
import { wrapper } from 'src/redux/store'

import 'styles/App.scss'

function MyApp ({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps)
  const { _pageProps } = props

  return (
    <>
      <Provider store={store}>
        <SiteLayout>
          <Component {..._pageProps} />
        </SiteLayout>
      </Provider>
      <ToastCustom />
    </>
  )
}

export default MyApp
