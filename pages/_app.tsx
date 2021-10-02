/* eslint-disable @next/next/inline-script-id */
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme.config'
import Script from 'next/script'
import '@/styles/globals.css'
import { GOOGLE_ANALYTICS_ID } from '@/config/analytics.config'
import AuthProvider from '@/store/providers/AuthProvider'


function MyApp({ Component, pageProps }) {

  return (
    <>
      {/* ANALYTICS */}
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
      <Script strategy="lazyOnload">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GOOGLE_ANALYTICS_ID}');
      `}
      </Script>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    
    </>
  )
}

export default MyApp
