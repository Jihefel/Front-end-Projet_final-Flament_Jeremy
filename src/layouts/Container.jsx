import React from 'react'
import NavBar from '@/components/common/Navbar';
import { Container } from "react-bootstrap"
import { Titillium_Web } from 'next/font/google'

const titillium = Titillium_Web({
  weight: '400',
  subsets: ['latin'],
})


export default function Layout(props) {
  return (
    <>
      <NavBar />
      <main className={titillium.className}>
        <Container>
          {props.children}
        </Container>
      </main>
    </>
  )
}