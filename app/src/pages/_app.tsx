// import '@/styles/globals.css'
import { type AppType } from "next/app";
import { TransitionsModal } from '@/components'
import ModalProvider from '@/components/context/Modal'
import { api } from '@/util/api'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
// import '../styles.css'
// import '../styles/reactflow.css'

 const  App: AppType = ({ Component, pageProps }: AppProps) => {
  return <ModalProvider Modal={TransitionsModal}>
    <Component {...pageProps} />
  </ModalProvider>
}

export default api.withTRPC(App);
