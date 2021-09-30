import React from 'react'
import SEO from '@/components/general/SEO'
import Talent from '@/components/talent/Talent'
import GridWrapper from '@/layouts/GridWrapper'
import { getLayout } from '@/components/general/getLayout'

const talent = () => {
  return (
    <>

      <SEO title="Find the best talent" />

      <GridWrapper columns={3}>

        <Talent />
        <Talent />
        <Talent />

      </GridWrapper>

    </>
  )
}

const Page = getLayout(talent, "DOES_NOT_NEED_AUTHENTICATION")

export default Page