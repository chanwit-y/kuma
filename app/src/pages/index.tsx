import { invoke } from '@tauri-apps/api/tauri'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    invoke('greet', { name: 'World' })
      .then(console.log)
      .catch(console.error)
  }, []);

  return (
    <>
      <button onClick={() => {
        invoke('go_mod_init')
          .then(console.log)
          .catch(console.error)
      }}>create project</button>
    </>
  )
}
