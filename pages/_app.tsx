import '../styles/globals.css'
import Layout from '../components/layout/layout'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '../context/context'

export default function App({ Component, pageProps }: AppProps) {
  return <GlobalContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </GlobalContextProvider>
}
