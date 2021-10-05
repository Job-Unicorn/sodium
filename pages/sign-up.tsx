import SignUpForm from '@/components/forms/SignUpForm'
import { getLayout } from '@/components/general/getLayout'
import SEO from '@/components/general/SEO'
import GridWrapper from '@/layouts/GridWrapper'
import React from 'react'

const SignUpPage = () => {
  return (
    <>
    
      <SEO title={'Create your account today.'} />

      <GridWrapper columns={3}>

        <SignUpForm />

      </GridWrapper>

    </>
  )
}

const Page = getLayout(SignUpPage, 'DOES_NOT_NEED_AUTHENTICATION')

export default Page