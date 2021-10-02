import Navbar from '@/components/general/navbar/Main'
import React from 'react'
import Footer from './Footer'

const DefaultWrapper = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  )
}

export default DefaultWrapper
