import React from 'react'
import NavBar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Titillium_Web } from 'next/font/google'

const titilliumWeb = Titillium_Web({
  weight: '400',
  subsets: ['latin'],
})


export default function Layout(props) {
  return (
    <>
      <NavBar />
      <main className={titilliumWeb.className}>
          {props.children}
      </main>
      <Footer />
    </>
  )
}