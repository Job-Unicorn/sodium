import { getLayout } from '@/components/general/getLayout'
import React from 'react'
import ChatBody from '@/components/chat/ChatBody'
import SEO from '@/components/general/SEO'
import GridWrapper from '@/layouts/GridWrapper'

const Company = () => {
  return (
    <>

      <SEO title="Messages | Company Name" />

      <GridWrapper columns={3} >

        <ChatBody />

      </GridWrapper>
    </>
  )
}

const Page = getLayout(Company, 'NEEDS_AUTHENTICATION')

export default Page
