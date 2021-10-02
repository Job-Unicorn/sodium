import SEO from '@/components/general/SEO'
import Hero from '@/components/landing/Hero'
import PreFooter from '@/components/landing/PreFooter'
import GridWrapper from '@/layouts/GridWrapper'
import Features from '@/components/landing/Features'
import { getLayout } from '@/components/general/getLayout'


function Home() {
  return (
    <>

      <SEO title={'The Best Job Search Tool on the Web.'}/>

      

      {/* <Sidekick /> */}

      <GridWrapper columns={3}>
        <Hero />
        <Features />
        <PreFooter />
      </GridWrapper>

     

    </>
  )
}

const Page = getLayout(Home, 'LANDING_PAGE')

export default Page