// import '@/styles/globals.css'
import { TransitionsModal } from '@/components'
import ModalProvider from '@/components/context/Modal'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ModalProvider Modal={TransitionsModal}>
    <Component {...pageProps} />
  </ModalProvider>
}
