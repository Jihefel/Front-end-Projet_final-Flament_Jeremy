import SignUpForm from '@/components/SignUpForm'
import React from 'react'
import { Container } from "react-bootstrap"

export default function Inscription() {
  return (
    <>
    <Container>
    <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              S&apos;inscrire
            </h2>
          </div>
        <SignUpForm />    
    </Container>
    </>
  )
}
